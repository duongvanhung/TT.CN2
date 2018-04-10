<?php 
header('Content-Type: application/json');

$result = array();

if( empty($_POST ['url']) ) {
  $result ['status'] = 0;
  $result ['message'] = 'URL is empty';
  $result ['data'] = NULL;
  echo json_encode($result); exit;
}

if( empty($_POST ['provider']) ) {
  $result ['status'] = 0;
  $result ['message'] = 'Provider is empty';
  $result ['data'] = NULL;
  echo json_encode($result); exit;
}

$url = urldecode($_POST ['url']);
$provider = strtolower(trim($_POST ['provider']));

switch ($provider) {
  case 'youtube':
    $endpoint = 'http://www.youtube.com/oembed?format=json&url=';
    break;
  case 'vimeo':
    $endpoint = 'https://vimeo.com/api/oembed.json?url=';
    break;
  case 'soundcloud':
    $endpoint = 'https://soundcloud.com/oembed?format=json&url=';
    break;
  case 'mixcloud':
    $endpoint = 'https://www.mixcloud.com/oembed/?format=json&url=';
    break;
  case 'hearthis':
    $pattern = '/hearthis.at/';
    $replace = 'api-v2.hearthis.at';
    $endpoint = preg_replace($pattern, $replace, $url);
    $url = '';
    break;
  default:
    $endpoint = FALSE;
    break;
}

if( empty($endpoint) ) {
  $result ['status'] = 0;
  $result ['message'] = 'Provider is invalid';
  $result ['data'] = NULL;
  echo json_encode($result); exit;
}

$final_url = $endpoint . $url;
$oembed_data = @file_get_contents($final_url);

if ( empty($oembed_data) ) {
  $result ['status'] = 0;
  $result ['message'] = 'Oembed data is empty';
  $result ['data'] = NULL;
  echo json_encode($result); exit;
}

$data = json_decode($oembed_data, TRUE);
if ( ! empty($data ['html']) ) {
  $data ['html'] = urldecode($data ['html']);
}
if($provider == 'hearthis') {
  $data = generate_hearthis_html($data);
}

$result ['status'] = 1;
$result ['message'] = 'Get Oembed data successfully';
$result ['data'] = $data;
echo json_encode($result); exit;

function generate_hearthis_html($data) {
  $id          = ( ! empty($data ['id']) ) ? $data ['id'] : '';
  $track_url   = ( ! empty($data ['permalink_url']) ) ? $data ['permalink_url'] : '';
  $track_name  = ( ! empty($data ['title']) ) ? $data ['title'] : '';
  $artist_url  = ( ! empty($data ['user']['permalink_url']) ) ? $data ['user']['permalink_url'] : '';
  $artist_name = ( ! empty($data ['user']['username']) ) ? $data ['user']['username'] : '';
  $src = 'https://hearthis.at/embed/' . $id . '/transparent_black/?hcolor=&color=&style=2&block_size=2&block_space=1&background=1&waveform=0&cover=0&autoplay=0&css=';
  $html = '<iframe scrolling="no" width="100%" height="150" frameborder="0" id="hearthis_at_track_' . $id . '" src="' . $src . '" allowtransparency><p>';
  $html .= 'Listen to <a href="' . $track_url . '" target="_blank">' . $track_name. '</a>';
  $html .= '<span>by</span><a href="' . $artist_url. '" target="_blank" >' . $artist_name. '</a>';
  $html .= '<span>on</span> <a href="https://hearthis.at/" target="_blank">hearthis.at</a>';
  $html .= '</p></iframe>';
  $data ['html'] = urldecode($html);
  return $data;  
}

?>