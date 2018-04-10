<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
</head>
<body>
	<?php
error_reporting(E_ALL);

date_default_timezone_set('Asia/Saigon');

require_once 'main_helper.php';

/** PHPExcel */
require_once 'Classes/PHPExcel.php';

// Include ezSQL core
include_once "ez_sql_core.php";

// Include ezSQL database specific component
include_once "ez_sql_mysql.php";

// Initialise database object and establish a connection
// at the same time - db_user / db_password / db_name / db_host
$db = new ezSQL_mysql('root','123456','tv_around_the_world','localhost');


$file = 'tv_around_the_world_trac_nghiem.xlsx';


$objPHPExcel = PHPExcel_IOFactory::load($file);
$sheet_list = $objPHPExcel->getAllSheets();//pr($sheet_list,1);
foreach($sheet_list as $sheet){
	$objWorksheet = $sheet;

	//$objWorksheet = $objPHPExcel->getActiveSheet();
	$dataquest = array();
	echo '<table border=1>' . "\n";
	$row_count = 0;
	foreach ($objWorksheet->getRowIterator() as $row) { // LOOP ROW
		echo '<tr>' . "\n";
		$cellIterator = $row->getCellIterator();
		$cellIterator->setIterateOnlyExistingCells(true); 
	  
		$array_data = array();
		$cell_count = 0;
		foreach ($cellIterator as $cell) { // LOOP CELL
			$column_name = $cell->getColumn();
			$cell_value = $cell->getValue();//pr($cell_value,1);
			if('A' == $column_name){
				$array_data['id'] = $cell_value;
			} else if('B' == $column_name){
				$array_data['title'] = $cell_value;
			} else if('C' == $column_name || 'D' == $column_name || 'E' == $column_name || 'F' == $column_name){
				$array_data['answer'][] = $cell_value;
			} 
			echo '<td>'. $cell_value . '</td>';
			$cell_count ++;
		}
		//pr('$cell_count:'.$cell_count,1);

		/*$i=0;
		$db->query("INSERT INTO cli_question (`title`,`created`) VALUES ('".$array_data['title']."','".date('Y-m-d H:i:s')."')");
		foreach($array_data['answer'] as $answer){
			if($i==0){
				$right_answer = 1;
			}else{
				$right_answer = 0;
			}
			
			$db->query("INSERT INTO cli_answer (`title`,`question_id`,`right_answer`) VALUES ('".$answer."','".$array_data['id']."','".$right_answer."')");
			$i++;
		}*/
		
		echo '</tr>' . "\n";
		
		$row_count++;
	}
	//pr('$row_count:'.$row_count,1);
}
echo '</table>' . "\n";

?>
</body>
</html>