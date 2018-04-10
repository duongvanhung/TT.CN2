<?php
function rrmdir($dir){
	if(is_dir($dir)){
		$objects = scandir($dir);
		foreach($objects as $object){
			if($object != "." && $object != ".."){
				if(filetype($dir."/".$object) == "dir"){
					rrmdir($dir."/".$object); 
				}else{
					@unlink($dir."/".$object);
				}
			}else{
				@unlink($dir."/".$object);
			}
		}
		reset($objects);
		rmdir($dir);
	}
}
rrmdir(__DIR__.'/assets/uploads/export/'.date('Y').'/'.date('m').'/'.(date('d')-1));
?>