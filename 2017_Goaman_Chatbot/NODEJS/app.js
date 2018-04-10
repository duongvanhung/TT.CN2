/*
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */
'use strict';

const 
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),  
  request = require('request'),
  datejs = require('datejs');

var app = express();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));

/*
 * Be sure to setup your config values before running this code. You can 
 * set them using environment variables or modifying the config file in /config.
 *
 */

// App Secret can be retrieved from the App Dashboard
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? 
  process.env.MESSENGER_APP_SECRET :
  config.get('appSecret');

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken');

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');

// URL where the app is running (include protocol). Used to point to scripts and 
// assets located at this address. 
const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {sessionId: sessionId, fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {sessionId: sessionId, fbid: fbid, payment: 0, payload: {}};
  }
  return sessions[sessionId];
};

const updateSession = (sessionData) => {
  var sessionId = sessionData.sessionId;
  var fbid = sessionData.fbid;
  if (sessions[sessionId].fbid === fbid) {
    sessions[sessionId] = sessionData;//eval(sessionData);
  }
}

const getSessionDataBySessionId = (sessionId) => {
  return (sessions.hasOwnProperty(sessionId)) ? sessions[sessionId] : false;
}

const getSessionDataByUserId = (fbid) => {
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      return sessions[k];
    }
  });
  return false;
}

const destroySession = (sessionId) => {

}

/*
 * Send data after request to server using the Send API.
 * 'messageText', 'quickReplyValue'
 */
function sendMessageDataToServer(recipientId, inputMessageData, inputSessionData) {
  var url = 'http://app.webdigital.vn/demo/goaman/chat';

  var data = {
    'uid': recipientId,
    'messageData': inputMessageData,
    'sessionData': inputSessionData,
  };

  getData(url, data, function(error, data){
    if(error) {
      return console.error(error);
    }
    console.log('#RESPONSE_DATA: ', data);


    data = JSON.parse(data);
    if(data.status === 1) {
      var messageData = data.messageData;
      var sessionData = data.sessionData;
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: messageData
      };
      console.log('#SESSION_DATA',sessionData);
      //do update session
      updateSession(sessionData);
      callSendAPI(messageData);
    }
  });
}
/*
 * Use your own validation token. Check that the token used in the Webhook 
 * setup is the same token used here.
 *
 */
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});


/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

/*
 * This path is used for account linking. The account linking call-to-action
 * (sendAccountLinking) is pointed to this URL. 
 * 
 */
app.get('/authorize', function(req, res) {
  var accountLinkingToken = req.query.account_linking_token;
  var redirectURI = req.query.redirect_uri;

  // Authorization Code should be generated per user by the developer. This will 
  // be passed to the Account Linking callback.
  var authCode = "1234567890";

  // Redirect users to this URI on successful login
  var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

  res.render('authorize', {
    accountLinkingToken: accountLinkingToken,
    redirectURI: redirectURI,
    redirectURISuccess: redirectURISuccess
  });
});

/*
 * Verify that the callback came from Facebook. Using the App Secret from 
 * the App Dashboard, we can verify the signature that is sent with each 
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an 
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to 
 * Messenger" plugin, it is the 'data-ref' field. Read more at 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the 
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger' 
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam, 
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  sendTextMessage(senderID, "Authentication successful");
}

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 * 
 */


//var num_question = 29;
var stage_arr = {}; // Dictionary
var question_id_arr = {}; // Dictionary
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  //var stage_arr = {}; // Dictionary
  if(!stage_arr.hasOwnProperty(senderID)){
        stage_arr[senderID] = 0;
  }
  if(!question_id_arr.hasOwnProperty(senderID)){
        question_id_arr[senderID] = 0;
  }
  
  stage_arr[senderID] = stage_arr[senderID] + 1;
  
  //sendTextMessage(senderID, "senderID = " + senderID + " - stage = " + stage_arr[senderID] + " - stage_arr length = " + Object.keys(stage_arr).length);
  //return;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  console.log('messageText = ' + messageText);
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;
  var quickReplyValue = '';

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and ap p %d with metadata %s", 
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with p ayload %s",
      messageId, quickReplyPayload);
    quickReplyValue = quickReplyPayload;
      //num_question++;
      //stage_arr[senderID] = stage_arr[senderID] + 1;

      //sendTextMessage(senderID,'senderID = ' + senderID + ' - num_question = ' + num_question);
      //return;
      //receivedMessage(event);
      //stage_arr[senderID] = stage_arr[senderID] + 1;
  }

  const sessionData = findOrCreateSession(senderID);
  var sessionId = sessionData.sessionId;
  var messageData ={
    'messageText': messageText,
    'quickReplyValue': quickReplyValue
  };
  if(messageText == 'session') {
    sendTextMessage(senderID, JSON.stringify(sessions[sessionId]));
    return;
  }
  if(messageText.indexOf("checkout")) {
	  sessionData.payment = 1;
  }
  console.log('#SESSION DATA ', sessionData);
  //Send data to SERVER
  sendMessageDataToServer(senderID, messageData, sessionData);

// (false && messageText !='get data' && stage_arr[senderID] < 50)
if (true) {
	switch (messageText) {
		case 'subscribe':
			doSubscribeUser(senderID);
			break;
		case 'Start':
			question_id_arr[senderID] = 1;
			// stage_arr[senderID] = 0;
			sendGetData(senderID);
			break;
		default:
			// console.log("Question id number " + question_id_arr[senderID]);
			// if(question_id_arr[senderID] == 0) {
			//   console.log("ai_height");
			//   ai_height(senderID, messageText, question_id_arr, stage_decreased); //Call AI 
			// }
			// return;
			var question_id_current = question_id_arr[senderID];
			doMessageText(senderID,messageText,question_id_current); // Anwser previous question
			sendGetData(senderID); // Send next question
			break;
	}
} else {
    switch (stage_arr[senderID]) {
      case 1:
         Question1(senderID);
         break;
      case 2:
          Question2(senderID);
          break;
      case 3:
          Question3(senderID);
          break;
      case 4:
          Question4(senderID);
          break;
      case 5:
          Question5(senderID);
          break;
      case 6:
         Question6(senderID);
         break;
      case 7:
          Question7(senderID);
          break;
      case 8:
          Question8(senderID);
          break;
      case 9:
          Question9(senderID);
          break;
      case 10:
          Question10(senderID);
          break;
      case 11:
          Question11(senderID);
          break;
      case 12:
          Question12(senderID);
          break;
      case 13:
          Question13(senderID);
          break;
      case 14:
          Question14(senderID);
          break;
      case 15:
          Question15(senderID);
          break;
      case 16:
          Question16(senderID);
          break;
      case 17:
          Question17(senderID);
          break;
      case 18:
          Question18(senderID);
          break;
      case 19:
          Question19(senderID);
          break;
      case 20:
          Question20(senderID);
          break;
      case 21:
          Question21(senderID);
          break;
      case 22:
          Question22(senderID);
          break;
      case 23:
          Question23(senderID);
          break;
      case 24:
          Question24(senderID);
          break;
      case 25:
          Question25(senderID);
          break;
      case 26:
          Question26(senderID);
          break;
      case 27:
         Question27(senderID);
         break;
      case 28:
          Question28(senderID);
          break;
      case 29:
         Question29(senderID);
         break;
      case 30:
          Question30(senderID);
          break;
      case 31:
          Question31(senderID);
          break;
      case 32:
          Question32(senderID);
          break;
      case 33:
          Question33(senderID);
          break;
      case 34:
          Question34(senderID);
          break;
      case 35:
          Question35(senderID);
          break;
      case 36:
          Question36(senderID);
          break;
      case 37:
          Question37(senderID);
          break;
      case 38:
          Question38(senderID);
          break;
      case 39:
          Question39(senderID);
          break;
      case 40:
          Question40(senderID);
          break;
      case 41:
          Question41(senderID);
          break;
      case 42:
          Question42(senderID);
          break;
      case 43:
          Question43(senderID);
          break;
      case 44:
          Question44(senderID);
          break;
      case 45:
          Question45(senderID);
          break;
      case 46:
          Question46(senderID);
          break;
      case 47:
          Question47(senderID);
          break;
      case 48:
          Question48(senderID);
          break;
      case 49:
          Question49(senderID);
          break;
      case 50:
         Question50(senderID);
         break;
      case 51:
          Question51(senderID);
          break;
      case 52:
          Question52(senderID);
          break;
      case 53:
          Question53(senderID);
          break;
      case 54:
          Question54(senderID);
          break;
      case 55:
          Question55(senderID);
          break;
      case 56:
          Question56(senderID);
          break;
      case 57:
          Question57(senderID);
          break;
      case 58:
          Question58(senderID);
          break;
      case 59:
          Question59(senderID);
          break;
      case 60:
          Question60(senderID);
          break;
      case 61:
          Question61(senderID);
          break;
      case 62:
          Question62(senderID);
          break;
      //default:
      //   //sendTextMessage(senderID, Question14(senderID));
       //  sendTextMessage(senderID,'Hello');
      //   break;
    }
  }
}

//Getting question_id[userID] and decrease it by 1. Called when answer doesn't meet condition to move on.
function stage_decreased(ref, senderID) {
  ref[senderID] = ref[senderID] -1 ;
  return;
}

// Check the return value equal to 1: OK || equal to -1: The answer is wrong, minus stage variable to 1 and exit.
function ai_birthday(senderID, message) {
  var numb = message.match(/\d/g);
  if(!numb || message.length <=5) {
    sendTextMessage(senderID, "Please enter a valid date");
    return -1;
  }
  var dateparse = Date.parse(message);
  // sendTextMessage(senderID, dateparse);
  // console.log(dateparse);
  var year = dateparse.getFullYear();
  // console.log(year);
  if(year>=2017 || year <= 1950) {
    sendTextMessage(senderID, "Please enter a valid date");
    return -1;
  }
  var dateStr = dateparse.toLocaleString();
  // sendTextMessage(senderID, dateStr);
  doMessageText(senderID,dateStr,4);
  return 1;
}

// Check the return value equal to 1: OK || equal to -1: The answer is wrong, minus stage variable to 1 and exit.
function ai_height(senderID, messageText, ref, callback) {
  messageText = messageText.replace("I'm","I am");
  var options = { method: 'GET',
    url: 'https://api.wit.ai/message',
    qs:
      { v: '20170307',
        q: messageText },
    headers:
      { 'cache-control': 'no-cache',
        authorization: 'Bearer JGJXJXJ3EE4RL5GRXHLDICO23V3RRWXV'
      }
  };
  request(options, function(error, response, body){
    if(error) throw error;
    // console.log(body);
    var mess = JSON.parse(body);
    console.log(mess);
    var key = mess.entities.number;
    if (!key) {
      sendTextMessage(senderID, "Please enter a valid value");
      callback(ref, senderID);
      return;
    }
    console.log(key);
    var keyValue = key[0].value;
    if (key.length == 2) {
      var keyInch = key[1].value;
      console.log(keyInch);
    }
    else {
      // console.log("No inch provided")
      var keyInch = 0;
    }
    var unit = mess.entities.height;
    console.log(unit);
            // console.log(unit);
    if(!unit){
      sendTextMessage(senderID, "Please enter a valid value");
      callback(ref, senderID);
      return;
    }
    var unitValue = unit[0].value;
    var trueValue = convert(keyValue, keyInch, unitValue);
    if (trueValue === -1) {
      sendTextMessage(senderID, "Your input cannot be recognized, please re-enter");
      callback(ref, senderID);
      return;
    }
    else {
      doMessageText(senderID,trueValue,6);
      Question7(senderID);
    }
  });
}

function ai_weight(senderID, messageText, ref, callback) {
  messageText = messageText.replace("I'm","I am");
  var options = { method: 'GET',
    url: 'https://api.wit.ai/message',
    qs:
      { v: '20170307',
        q: messageText },
    headers:
      { 'cache-control': 'no-cache',
        authorization: 'Bearer JGJXJXJ3EE4RL5GRXHLDICO23V3RRWXV'
      }
  };
  request(options, function(error, response, body){
    if(error) throw error;
    // console.log(body);
    var mess = JSON.parse(body);
    console.log(mess);
    var key = mess.entities.number;
    if (!key) {
      sendTextMessage(senderID, "Please enter a valid value");
      callback(ref, senderID);
      return;
    }
    console.log(key);
    var keyValue = key[0].value;
    if (key.length == 2) {
      var keyInch = key[1].value;
      console.log(keyInch);
    }
    else {
      var keyInch = 0;
    }
    var unit = mess.entities.weight;
    if(!unit){
      sendTextMessage(senderID, "Please enter a valid value");
      callback(ref, senderID);
      return;
    }
    var unitValue = unit[0].value;
    var trueValue = convert(keyValue, keyInch, unitValue);
    if (trueValue === -1) {
      sendTextMessage(senderID, "Your input cannot be recognized, please re-enter");
      callback(ref, senderID);
      return;
    }
    else {
      doMessageText(senderID,trueValue,7);
      Question8(senderID);
      return;
    }
  });
}

function convert(value, inch, unit) {
  if (unit == "ft" || unit == "foot" || unit == "'" || unit == "foots" || unit == "feet") {
    return value*30.48 + inch*2.54;
  }
  else if (unit == "m") {
    if(inch >=10) {
      return value*100 + inch;
    }
    else {
      return value*100 + inch*10;
    }
  }
  else if (unit == 'lbs' || unit == 'lb' || unit == 'pound' || unit == 'pounds') {
    return value*0.45359237;
  }
  else if (unit == 'kg' || unit == 'cm'){
    return value;
  }
  else{
    return -1;
  }
}

function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s", 
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}


/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;
  console.log('receivedPostback - payload = ' + payload);

  if(!question_id_arr.hasOwnProperty(senderID)){
        question_id_arr[senderID] = 0;
  }
  
  stage_arr[senderID] = stage_arr[senderID] + 1;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  // sendTextMessage(senderID, "Postback called with value "+ payload);
  //do subscribe

  
  var messageText = 'payload='+payload;
  var question_id_current = question_id_arr[senderID];
	doMessageText(senderID,messageText,question_id_current); // Anwser previous question
var question_id_selected = payload;
	sendGetData(senderID, question_id_selected); // Send next question
  //doSubscribeUser(senderID);
 
  // sendPostPackToServer(senderID, timeOfPostback, question_id, ''); // TODO
}

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 * 
 */
function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);
}

/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 * 
 */
function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log("Received account link event with for user %d with status %s " +
    "and auth code %s ", senderID, status, authCode);
}

/*
 * Send an image using the Send API.
 *
 */
function sendImageMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL + "/assets/rift.png"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a Gif using the Send API.
 *
 */
function sendGifMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL + "/assets/instagram_logo.gif"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 *
 */
function sendAudioMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: SERVER_URL + "/assets/sample.mp3"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 *
 */
function sendVideoMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: SERVER_URL + "/assets/allofus480.mov"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 *
 */
function sendFileMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: SERVER_URL + "/assets/test.txt"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "This is test text",
          buttons:[{
            type: "web_url",
            url: "https://www.google.com",
            title: "Open Web URL 1"
          }, {
            type: "postback",
            title: "Option2",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
            // type: "web_url",
            // url: "https://www.google.com",
            // title: "Open Web URL 2"
          }, {
            // type: "phone_number",
            // title: "Call Ph one Number",
            // payload: "+16505551234"
            type: "postback",
            title: "Option 3",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: SERVER_URL + "/assets/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: SERVER_URL + "/assets/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Send a receipt message using the Send API.
 *
 */
function sendReceiptMessage(recipientId) {
  // Generate a random receipt ID as the API requires a unique ID
  var receiptId = "order" + Math.floor(Math.random()*1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: "Peter Chang",
          order_number: receiptId,
          currency: "USD",
          payment_method: "Visa 1234",        
          timestamp: "1428444852", 
          elements: [{
            title: "Oculus Rift",
            subtitle: "Includes: headset, sensor, remote",
            quantity: 1,
            price: 599.00,
            currency: "USD",
            image_url: SERVER_URL + "/assets/riftsq.png"
          }, {
            title: "Samsung Gear VR",
            subtitle: "Frost White",
            quantity: 1,
            price: 99.99,
            currency: "USD",
            image_url: SERVER_URL + "/assets/gearvrsq.png"
          }],
          address: {
            street_1: "1 Hacker Way",
            street_2: "",
            city: "Menlo Park",
            postal_code: "94025",
            state: "CA",
            country: "US"
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: "New Customer Discount",
            amount: -50
          }, {
            name: "$100 Off Coupon",
            amount: -100
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Action",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Comedy",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Drama",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

/*Question 1 */

function Question29(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Please select from the following list:",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Gym",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Tennis",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}


function Question30(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Please select your participation level:",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Professtional",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Amateur",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question31(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the next 12 months, do you have definite plans to travel or live overseas, or are you required to travel overseas on a regular basis for work?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question32(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Are you moving overseas to live?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question33(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Are you travelling overseas for holidays only?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question34(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Will you be visiting one or more of the following countries: Afghanistan, Africa (excluding South Africa and Namibia), Central America, Papua New Guinea, Pakistan, South America and the Middle East?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question35(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever had or received medical advice or treatment for any heart condition, including high blood pressure, high cholesterol, a heart murmur, chest pain or palpitations?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question36(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Please select which condition/s you have?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"High cholesterol",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Low cholesterol",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question37(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "When was your high cholesterol diagnosed?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"More than 3 months ago",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Less than 3 months ago",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question38(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Has your cholesterol been checked since being diagnosed?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question39(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "What type of treatment are you taking for your high cholesterol?",
          buttons:[{
            type: "postback",
            title: "Medication (oral)",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }, {
            type: "postback",
            title: "Option 2",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }, {
            type: "postback",
            title: "Option 3",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }]
        }
      }
    }
  }; 

  callSendAPI(messageData);
}

function Question40(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Has your cholesterol level been checked within the last 12 months?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question41(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Do you know your latest cholesterol reading?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question42(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What was your latest cholesterol reading?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question43(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Has any increase in your cholesterol medication dosage or change of medication been required or recommended in the last 6 months?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question44(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have any of your immediate family (mother, father, brother or sister) been diagnosed with any of the following before the age of 65:\n * Cancer\n * Heart disease\n * Heart attack\n * Polycystic kidney disease\n * Diabetes\n * Huntington's disease, multiple sclerosis, motor neurone disease, Parkinson's disease or any other hereditary disorder",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question45(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever had or received medical advice or treatment for any cancer, tumour, lump, skin cancer, cyst, polyp or growth?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question46(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever had or received medical advice or treatment for diabetes, raised blood sugar levels or hepatitis B or C?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question47(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever had or received medical advice or treatment for epilepsy or seizures, multiple sclerosis, paralysis, embolism, stroke, tremor, chronic headaches, chronic fatigue, or any symptoms of a brain, neurological or circulatory system condition?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question48(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever had or received medical advice or treatment for rheumatoid arthritis, psoriatic arthritis, fibromyalgia, osteoporosis or other bone disease?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function Question49(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you ever tested positive for HIV/AIDS or are you awaiting results of an HIV test?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

/*Cau Hoi cua Hung*/

function Question15(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: " • In the last 10 years have you received a claim payment or are you currently making a claim for Workers Compensation or other insurance payments for an accident, sickness or disability?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

  function Question16(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last 10 years, have any of your life insurance applications been declined or issued with a health loading or exclusion?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 function Question17(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
  text: "What industry do you work in?"
  }
};
  callSendAPI(messageData);
}

 function Question18(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What is your current Occupation?"
  }
   };

   callSendAPI(messageData);
 }

  function Question19(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Do you have more than one occupation?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

  function Question20(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What is your current annual income before tax?"
  }
   };

   callSendAPI(messageData);
 }

   function Question21(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What percentage of your work duties involves either manual work (e.g. using tools, operating machinery) or working outdoors?"
  }
   };

   callSendAPI(messageData);
 }

 function Question22(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Are you currently receiving any Government income support (not including family benefits)?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }  


  function Question23(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Which of the following best describes your current employment status?"
  }
   };

   callSendAPI(messageData);
 }

  function Question24(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Have you been in your current employment for 12 months or more?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }  

function Question25(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the next 12 months do you have plans to change your occupation, reduce your working hours or take more than 3 months off work?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 function Question26(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Are you currently off work or working on a restricted basis due to illness or injury?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }  


   function Question27(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What is the average number of hours that you work per week?"
  }
   };

   callSendAPI(messageData);
 }


  function Question28(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Do you play or intend to engage in any sport or recreational activities?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 ///**************50-----55**********

  function Question50(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years, have you engaged in any activity reasonably expected to increase the risk of exposure to the HIV/AIDS virus?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }


  function Question51(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years, have you had or received medical advice or treatment for any gall bladder, hernia, liver, bowel or stomach condition?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }



   function Question52(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years, have you had or received medical advice or treatment for asthma, sleep apnoea or any respiratory or lung condition?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 function Question53(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years have you had or received medical advice or treatment for depression, anxiety, panic attacks, stress, bipolar disorder, post-natal depression, post-traumatic stress disorder or other mental health condition?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }


 function Question54(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years, have you had or received medical advice or treatment for whiplash, sciatica, scoliosis, other back or neck pain, strain, surgery, injury or disorder?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 function Question55(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "In the last ten years, have you had or received medical advice or treatment for any joint, muscle, cartilage, tendon or bone pain, fracture, surgery, injury or disorder, osteoarthritis, or gout?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Yes",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },    
        {
          "content_type":"text",
          "title":"No",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        }
      ]
    }
  };

   callSendAPI(messageData);
 }

 /*Cau Hoi cua Phuong*/

 function Question1(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "To give you a quote and find out if we can offer you this product, you will need to provide the relevant "
          + "medical, lifestyle, occupation and income information we request. Are you happy and able to do this?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question2(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text:"If you do not tell us anything you are required to, and we would not have provided the insurance if you "
          +"had told us, we may reduce or refuse to pay a claim or we may cancel the policy.\nDo you agree?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question3(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "What's your gender?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Male",
              "payload":"MALE"
            },
            {
              "content_type":"text",
              "title":"Female",
              "payload":"FEMALE"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question4(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What is your date of birth?",
      metadata: " "
    }
  };
  callSendAPI(messageData);
}

function dottest(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "• Weather?\n • Is it snowing in New York?\n",
      metadata: " "
    }
  };
  callSendAPI(messageData);
}

function Question5(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Are you an Australian Citizen or permanent Australian Resident?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question6(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "How tall are you?",
      metadata: " "
    }
  };
  callSendAPI(messageData);
}

function Question7(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What is your weight?",
      metadata: " "
    }
  };
  callSendAPI(messageData);
}

function Question8(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Have you smoked tobacco (e.g. in a cigarette, cigar or pipe) or used e-cigarettes in the last 12 months?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question9(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Do you have any other Life Insurance, Total Permanent Disability Insurance (TPD), Recovery Insurance (also"
          + "known as Trauma or Critical Illness) or Income Protection that you will keep in addition to this application?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question10(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Is this with TAL?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question11(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Which type of insurance do you have?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Life Insurance",
              "payload":"LIFE"
            },
            {
              "content_type":"text",
              "title":"Total Permanant Disability (TPD) Insurance",
              "payload":"TPD"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question12(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Does your TPD cover exceed more than one million dollars ($1m)?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question13(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Does your Life cover exceed more than one million dollars ($1m)?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question14(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "In the last 10 years have you received a claim payment or are you currently making a claim for Workers "
          + "Compensation or other insurance payments for an accident, sickness or disability?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question56(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "In the last ten years, have you had or received medical advice or treatment for any blood disorder, thyroid"
          +" disorder, anaemia, or lupus?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question57(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "In the last ten years, have you had or received medical advice or treatment for any kidney, bladder, "
          +"urinary or prostate condition?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question58(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "How many standard units of alcohol do you drink in an average week?",
      metadata: " "
    }
  };
  callSendAPI(messageData);
}

function Question59(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "In the last ten years have you smoked or taken recreational drugs or any drug other than as medically"
          +" directed, or received counselling from a health professional for excess alcohol consumption?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question60(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Other than what you have already answered, in the last 5 years have you:\n• been admitted to hospital\n• "
          +"seen a doctor or other health professional for any other medical condition which has lasted more than 14 days,"
          +" or\n• been prescribed medication for more than 14 days?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question61(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Do you know the cause of this?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

function Question62(recipientId) {
  var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Other than what you have already answered:\n• do you have any other ongoing medical conditions\n• do you"
          +" intend seeking or have you been advised to seek medical advice or treatment for any current medical concern"
          +", or\n• are you awaiting the results of any medical tests or investigations?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Yes",
              "payload":"YES"
            },
            {
              "content_type":"text",
              "title":"No",
              "payload":"NO"
            }
          ]
        }
      };
  callSendAPI(messageData);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
function sendReadReceipt(recipientId) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Welcome. Link your account.",
          buttons:[{
            type: "account_link",
            url: SERVER_URL + "/authorize"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Send data after request to server using the Send API.
 *
 */
function sendGetData(senderID, question_id_selected) {
  var url = 'http://app.webdigital.vn/demo/goaman/home/chat';
  var question_id_selected = typeof(question_id_selected) != 'undefined' ? question_id_selected : 0;
  var send_data = {
    question_id_previous: question_id_arr[senderID],
    question_id_selected: question_id_selected,
	user_fb_id: senderID
  }
  console.log('send_data');
  console.log(send_data);
  getData(url, send_data, function(error, data){
    if(error) {
      return console.error(error);
    }
	var data_json = JSON.parse(data);
	console.log('data_json');
	console.log(data_json);
	console.log(data_json.question);

	if(data_json.command == 'restart'){
		question_id_arr[senderID] = 0;
		// stage_arr[senderID] = 0;
	} else {
		var question_id_current = data_json.question_id;
		question_id_arr[senderID] = question_id_current;
		console.log('sendGetData - question_id_current = ' + question_id_current);
	}
    var messageData = {
      recipient: {
        id: senderID
      },
      message: data_json.question
    };

    callSendAPI(messageData);
  });
}

function doSubscribeUser(recipientId, data) {
  var url = 'http://app.webdigital.vn/demo/goaman/chat/subscribe';
  var data = {
    "uid": recipientId,
  }
  getData(url, data, function(error, data){
    if(error) {
      return console.error(error);
    }
    console.log('data: ', data);
    var dataObj = JSON.parse(data);
    var msg = (dataObj.status === 1) ? 'Subscribe successfully' : 'Subscribe failed';
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: msg,
        metadata: "CHATBOT_SUBSCRIBE_VALUE"
      }
    };

    callSendAPI(messageData);
  });
}

function doMessageText(recipientId, messageText, question_id_current) {
 console.log('doMessageText - question_id_current = ' + question_id_current);
  var url = 'http://app.webdigital.vn/demo/goaman/chat/insertConversation';
  var data = {
    "uid": recipientId,
    "question_id": question_id_current,
    "messageText": messageText
  }
  getData(url, data, function(error, data){
    if(error) {
      return console.error(error);
    }
    console.log('data: ', data);
    var dataObj = JSON.parse(data);
    var msg = (dataObj.status === 1) ? 'save successfully' : 'save failed';
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: data,
        metadata: "CHATBOT_SUBSCRIBE_VALUE"
      }
    };

    //callSendAPI(messageData);
  });
}


function sendPostPackToServer(recipientId, timeOfPostback, question_id, payload) {
 console.log('sendPostPackToServer - question_id = ' + question_id);
  var url = 'http://app.webdigital.vn/demo/goaman/home/chat_get_question';
  var data = {
    "uid": recipientId,
    "question_id": question_id,
    "payload": payload,
    "timeOfPostback": timeOfPostback
  }
  getData(url, data, function(error, data){
    if(error) {
      return console.error(error);
    }
    console.log('data: ', data);
    var dataObj = JSON.parse(data);
    var msg = (dataObj.status === 1) ? 'send successfully' : 'send failed';
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: data,
        metadata: "CHATBOT_SUBSCRIBE_VALUE"
      }
    };

    //callSendAPI(messageData);
  });
}
/*
 * Do request data from server.
 *
 */
function getData(url, data, callback) {
  var header = {
    'Content-Type': 'application/json; charset=utf-8',
    'User-Agent': 'ChatBot'
  };
  var options = {
    uri: url,
    method: "POST",
    headers: header,
    json: data,
  };
  request(options, function (error, response, body) {
    if(error || response.statusCode != 200) {
      return callback('Has error');
    }
    callback(null, JSON.stringify(body));
  });
}

/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s", 
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });  
}

// Start server
// Webhooks must be available via SSL with a certificate signed by a valid 
// certificate authority.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
