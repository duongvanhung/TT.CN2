	
	<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async='async'></script>
    <script>
        var OneSignal = window.OneSignal || [];
        
        OneSignal.push(function(){
            OneSignal.init({
                appId: "<?=ONESIGNAL_APP_ID?>",
                subdomainName: "<?=ONESIGNAL_SUBDOMAIN_NAME?>",
                safari_web_id: "<?=ONESIGNAL_SAFARI_WEB_ID?>",
                autoRegister: false, /* Set to true to automatically prompt visitors */
                httpPermissionRequest: {
                    enable: true
                }
            });
            OneSignal.getNotificationPermission(function(permission){

                if (permission === 'default') {
                    OneSignal.showHttpPermissionRequest();
                }
            });

            OneSignal.on('notificationDisplay', function (event) {
                // var html = JSON.parse(event);
                console.warn('OneSignal notification displayed:', event);
                document.getElementById("notify_content").innerHTML = event.content;
                //Todo
            });

            OneSignal.on('notificationDismiss', function (event) {
                console.warn('OneSignal notification dismissed:', event);
                //Todo
            });

            OneSignal.on('notificationPermissionChange', function(permissionChange) {
                if(permissionChange.to === 'granted') {
                    OneSignal.registerForPushNotifications({modalPrompt: false});
                }
            });

            OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                if (isEnabled)
                console.log("Push notifications are enabled!");
                else
                console.log("Push notifications are not enabled yet.");
            });

            // OneSignal.isPushNotificationsEnabled().then((isSubscribed) => {
            //     console.log('Subscribed status:', isSubscribed)
            // });
            
            OneSignal.getUserId().then(function(userId) {
                console.log("OneSignal User ID:", userId);
                document.getElementById("user_id").innerHTML = userId;
            });

        });
    </script>

<button id="btn_subscribed">Subscribed</button>
<button id="btn_subscribed">UnSubscribed</button>
<br/>
Player id: <strong><div id="user_id"></div></strong>
<br/>
Notify content: <div id="notify_content"></div>

