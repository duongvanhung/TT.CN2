<?php
$is_permanent = builder_check_permanent();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<!-- <link rel="shortcut icon" href="<?=PATH_URL.'assets/images/'?>favicon.ico" type="image/x-icon"> -->
<!-- <link rel="icon" href="<?=PATH_URL.'assets/images/'?>favicon.ico" type="image/x-icon"> -->
<link rel="apple-touch-icon" sizes="57x57"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180"
	href="<?=PATH_URL.'assets/images/'?>apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"
	href="<?=PATH_URL.'assets/images/'?>android-icon-192x192.png">
<!-- <link rel="icon" type="image/png" sizes="32x32" href="<?=PATH_URL.'assets/images/'?>favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="<?=PATH_URL.'assets/images/'?>favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?=PATH_URL.'assets/images/'?>favicon-16x16.png"> -->
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage"
	content="<?=PATH_URL.'assets/images/'?>ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<title>PIX Chatbot</title>

<!-- Chatbot Template CSS -->
<link href="<?=get_resource_url('assets/libs/chatbot/style.css')?>"
	rel="stylesheet">
	
<!-- jquery CSS -->
<link href="<?=PATH_URL.'assets/libs/jquery/jquery-ui.min.css'?>"
	rel="stylesheet">
<!-- bootstrap CSS -->
<link href="<?=PATH_URL.'assets/libs/bootstrap/bootstrap.min.css'?>"
	rel="stylesheet">
<!-- font CSS -->
<link
	href="<?=PATH_URL.'assets/css/font-awesome.min.css" rel="stylesheet'?>">
<link href="<?=PATH_URL.'assets/css/fonts/fonts.css'?>" rel="stylesheet">
<!--carousel-->
<link href="<?=PATH_URL.'assets/libs/carousel/owl.carousel.css'?>"
	rel="stylesheet">
<link href="<?=PATH_URL.'assets/libs/carousel/owl.theme.css'?>"
	rel="stylesheet">
<!-- fancybox -->
<link type="text/css" rel="stylesheet"
	href="<?=PATH_URL.'assets/libs/fanxybox/source/jquery.fancybox.css?v=2.1.5'?>"
	media="screen" />
<link type="text/css" rel="stylesheet"
	href="<?=PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5'?>" />
<link type="text/css" rel="stylesheet"
	href="<?=PATH_URL.'assets/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7'?>" />
<!-- animate css -->
<link href="<?=PATH_URL.'assets/libs/animatecss/animate.css'?>"
	rel="stylesheet">
<!-- page builder css -->
<link href="<?=get_resource_url('assets/css/page-builder.css')?>"
	rel="stylesheet">

<!-- css edit text -->
<link href="<?=PATH_URL.'assets/css/edit-font.css'?>" rel="stylesheet">
<!-- style css -->
<link href="<?=PATH_URL.'assets/css/style.css'?>" rel="stylesheet">
<!-- block css -->
<link href="<?=PATH_URL.'assets/css/blocks/style.css'?>"
	rel="stylesheet">
</head>

<!-- The #page-top ID is part of the scrolling feature - the data-spy and data-target are part of the built-in Bootstrap scrollspy function -->
<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
	<header id="header-builder">
		<p class="header-builder-title">PIX Chatbot</p>
		<div class="group-bt">
		<?php
if ($is_permanent) {
    ?>
		<button type="button" class="btn btn-lg" id="btn-save-permanent"
				data-dialog="preview-modal">
				<i class="fa fa-arrow-circle-o-down"></i> Save Permanent
			</button>
		<?php
} else {
    ?>
		<button type="button" class="btn btn-lg" id="btn-save"
				data-dialog="form-modal">
				<i class="fa fa-save"></i> Save Change
			</button>
		<?php
}
?>
		<button type="button" class="btn btn-lg" id="btn-export"
				data-dialog="preview-modal" style="display: none">
				<i class="fa fa-arrow-circle-o-down"></i> Export
			</button>
			<button type="button" class="btn btn-lg" id="btn-preview"
				data-dialog="export-markup-modal" style="display: none">
				<i class="fa fa-eye" style="display: none"></i> Preview
			</button>
			<button type="button" class="btn btn-lg" id="btn-empty"
				data-dialog="page-section-modal">
				<i class="fa fa-trash"></i> Empty Page
			</button>
		</div>
	</header>

	<nav class="menu-container" id="nav-menu">
		<div class="menu-icon">
			<img class="img-responsive"
				src="<?=PATH_URL.'assets/images/menu-icon.png'?>" alt="" />
		</div>
		<div class="menu-title">Building Chatbot</div>
		<div class="menu-expand"></div>
		<ul>
			<!-- <li class="block-select"><a href="javascript:get_block('')" class="menu-item">All Template</a></li> -->
		<?=modules::run('home/get_category')?>

		<li><div class="menu-title menu-title-pages">Blocks</div></li>
			<li class="list_page active" id="page1"><a href="#"
				page-title="index" class="menu-item index-menu-item">block1</a>
				<button>
					<i class="fa fa-file-o"></i>
				</button></li>

			<li class="align-center">
				<button type="button" class="btn btn-lg btn-white2"
					id="btn-menu-add" data-dialog="">
					<i class="fa fa-plus-circle"></i> Add
				</button> <label type="button" class="btn btn-lg btn-white2"
				id="btn-menu-export-import" data-dialog=""><i
					class="fa fa-share-square-o"></i>Import</label>
				<div id="import-file-page"></div>
			</li>
		</ul>
	</nav>
	<main>
	<div class="head-list-page">
		<div class="head-list-nav">
			<button type="button" class="btn btn-lg" id="btn-close-preview"
				style="display: none; float: right; padding: 5px 5px; font-size: 11px">
				<i class="fa fa-times"></i> Close Preview
			</button>
		</div>
	</div>
	<div class="title-page-selected">Chatbot Flow</div>
	<div id="container" data-page="index" class="page-container"></div>
	</main>

	<!-- modal popup -->
	<div id="popup_modal">
		<!-- Modal -->
		<a data-toggle="modal" href="#modal-editor-title"
			style="display: none;"></a> <a data-toggle="modal"
			href="#modal-editor-link" style="display: none;"></a> <a
			data-toggle="modal" href="#modal-editor-image" style="display: none;"></a>
		<a data-toggle="modal" href="#modal-editor-content"
			style="display: none;"></a> <a data-toggle="modal"
			href="#modal-editor-bg" style="display: none;"></a> <a
			data-toggle="modal" href="#modal-editor-icon" style="display: none;"></a>
		<a data-toggle="modal" href="#modal-editor-button"
			style="display: none;"></a> <a data-toggle="modal"
			href="#modal-editor-menu" style="display: none;"></a>
		<div class="modal fade" id="modal-editor-title" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">Edit Title</h4>
					</div>
					<div class="modal-body">
						<!-- <h4>Title</h4> -->
						<!-- tooltip edit text -->
						<div class="tooltip-edit-font-text">
							<div class="text-align" data-tooltip="tooltip"
								data-placement="bottom" title="Align">
								<i class="fa fa-align-center" aria-hidden="true"></i>
							</div>
							<div class="text-select-font">
								<div class="btn-group">
									<button type="button" data-tooltip="tooltip"
										data-placement="bottom" title="Font" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">Select Font</button>
									<ul class="dropdown-menu">
										<li data-font="SourceSansPro-Regular">SourceSansPro</li>
										<li data-font="Arimo">Arimo</li>
										<li data-font="Dosis-Bold">Dosis</li>
										<li data-font="DroidSans">DroidSans</li>
										<li data-font="FjallaOne-Regular">FjallaOne</li>
										<li data-font="Lato-Black">Lato</li>
										<li data-font="LibreFranklin-Regular">LibreFranklin</li>
										<li data-font="Montserrat-Regular">Montserrat</li>
										<li data-font="Muli">Muli</li>
										<li data-font="NotoSans">NotoSans</li>
										<li data-font="OpenSans">OpenSans</li>
										<li data-font="Oswald-Regular">Oswald</li>
										<li data-font="PTSans-Regular">PTSans</li>
										<li data-font="Raleway-Regular">Raleway</li>
										<li data-font="Roboto-Black">Roboto</li>
										<li data-font="RobotoCondensed-Regular">RobotoCondensed</li>
										<li data-font="Roboto-Light">Roboto</li>
										<li data-font="TitilliumWeb-Regular">TitilliumWeb</li>
										<li data-font="Ubuntu">Ubuntu</li>
										<li data-font="Latha">Latha</li>
									</ul>
									<!--drop down lv 1-->
								</div>
								<!--button click dropdown-->
							</div>
							<div class="text-font-size" data-tooltip="tooltip"
								data-placement="bottom" title="Size">
								<input type="text" />
							</div>
							<div class="text-color" data-tooltip="tooltip"
								data-placement="bottom" title="Color">
								<input type="color" name="favcolor">
							</div>
						</div>
						<div class="modal-edit-input-title">
							<div class="content-edit-link-title">
								<p>Title</p>
								<input id="modal-edit-title" type="text" value="" />
							</div>
							<div class="content-edit-link-title">
								<p>Url</p>
								<input id="modal-edit-url-mini" type="text" value="" />
							</div>
						</div>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
					</div>
					<!-- end modal -->
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-link" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Edit Link</h4>
					</div>
					<div class="modal-body">
						<div class="content-edit-link">

							<div class="content-edit-link-url">
								<p>URL</p>
								<input id="modal-edit-url" type="text" value="" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-all" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 413px">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Edit Content</h4>
					</div>
					<div class="modal-body">
						<div class="tooltip-edit-font-text">
							<div class="text-align" data-tooltip="tooltip"
								data-placement="bottom" title="Align">
								<i class="fa fa-align-center" aria-hidden="true"></i>
							</div>
							<div class="text-select-font">
								<div class="btn-group">
									<button type="button" data-tooltip="tooltip"
										data-placement="bottom" title="Font" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">Select Font</button>
									<ul class="dropdown-menu">
										<li data-font="SourceSansPro-Regular">SourceSansPro</li>
										<li data-font="Arimo">Arimo</li>
										<li data-font="Dosis-Bold">Dosis</li>
										<li data-font="DroidSans">DroidSans</li>
										<li data-font="FjallaOne-Regular">FjallaOne</li>
										<li data-font="Lato-Black">Lato</li>
										<li data-font="LibreFranklin-Regular">LibreFranklin</li>
										<li data-font="Montserrat-Regular">Montserrat</li>
										<li data-font="Muli">Muli</li>
										<li data-font="NotoSans">NotoSans</li>
										<li data-font="OpenSans">OpenSans</li>
										<li data-font="Oswald-Regular">Oswald</li>
										<li data-font="PTSans-Regular">PTSans</li>
										<li data-font="Raleway-Regular">Raleway</li>
										<li data-font="Roboto-Black">Roboto</li>
										<li data-font="RobotoCondensed-Regular">RobotoCondensed</li>
										<li data-font="Roboto-Light">Roboto</li>
										<li data-font="TitilliumWeb-Regular">TitilliumWeb</li>
										<li data-font="Ubuntu">Ubuntu</li>
										<li data-font="Latha">Latha</li>
									</ul>
									<!--drop down lv 1-->
								</div>
								<!--button click dropdown-->
							</div>
							<div class="text-font-size" data-tooltip="tooltip"
								data-placement="bottom" title="Size">
								<input type="text" />
							</div>
							<div class="text-color" data-tooltip="tooltip"
								data-placement="bottom" title="Color">
								<input type="color" name="favcolor">
							</div>
						</div>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
					</div>
					<!-- end modal -->
				</div>
			</div>
		</div>
		<!-- <div class="modal fade" id="modal-editor-link-mini" role="dialog">
		<div class="modal-dialog modal-lg" style="width:650px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Edit Link</h4>
				</div>
				<div class="modal-body">
					<div class="content-edit-link">
						<div class="content-edit-link-title">
							<p>Title</p>
							<input id="modal-edit-text-mini" type="text" value="" />
						</div>
						<div class="content-edit-link-url">
							<p>URL</p>
							<input id="modal-edit-url-mini" type="text" value="" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default close_source" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i>Cancel</button>
					<button type="button" class="btn btn-primary save_source_mini"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
				</div>
			</div>
		</div>
	</div> -->
		<div class="modal fade" id="modal-editor-image" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">Edit Image</h4>
					</div>
					<div class="modal-body">
						<label for="modal-edit-chooseimage" class="custom-file-upload"> <i
							class="fa fa-cloud-upload"></i> Choose file
						</label>
						<div class="content-edit-link-title">
							<p>URL</p>
							<input id="modal-edit-urlimage" type="text" value="" />
						</div>
						<div class="content-edit-link-url"></div>
						<!-- <h4>URL</h4>
					<input id="modal-edit-urlimage" type="text" value="" /> -->
						<input type="file" id="modal-edit-chooseimage" value=""
							accept="image/*">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-content" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">Edit Content</h4>
					</div>
					<div class="modal-body">
						<!-- tooltip edit text -->
						<div class="tooltip-edit-font-text">
							<div class="text-align" data-tooltip="tooltip"
								data-placement="bottom" title="Align">
								<i class="fa fa-align-center" aria-hidden="true"></i>
							</div>
							<!-- <div class="text-link edit-link" data-tooltip="tooltip" data-placement="bottom" title="Link">
					        <i class="fa fa-link" aria-hidden="true"></i>
					    </div> -->
							<div class="text-select-font">
								<div class="btn-group">
									<button type="button" data-tooltip="tooltip"
										data-placement="bottom" title="Font" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">Select Font</button>
									<ul class="dropdown-menu">
										<li data-font="SourceSansPro-Regular">SourceSansPro</li>
										<li data-font="Arimo">Arimo</li>
										<li data-font="Dosis-Bold">Dosis</li>
										<li data-font="DroidSans">DroidSans</li>
										<li data-font="FjallaOne-Regular">FjallaOne</li>
										<li data-font="Lato-Black">Lato</li>
										<li data-font="LibreFranklin-Regular">LibreFranklin</li>
										<li data-font="Montserrat-Regular">Montserrat</li>
										<li data-font="Muli">Muli</li>
										<li data-font="NotoSans">NotoSans</li>
										<li data-font="OpenSans">OpenSans</li>
										<li data-font="Oswald-Regular">Oswald</li>
										<li data-font="PTSans-Regular">PTSans</li>
										<li data-font="Raleway-Regular">Raleway</li>
										<li data-font="Roboto-Black">Roboto</li>
										<li data-font="RobotoCondensed-Regular">RobotoCondensed</li>
										<li data-font="Roboto-Light">Roboto</li>
										<li data-font="TitilliumWeb-Regular">TitilliumWeb</li>
										<li data-font="Ubuntu">Ubuntu</li>
										<li data-font="Latha">Latha</li>
									</ul>
									<!--drop down lv 1-->
								</div>
								<!--button click dropdown-->
							</div>
							<div class="text-font-size" data-tooltip="tooltip"
								data-placement="bottom" title="Size">
								<input type="text" />
								<!-- <div class="btn-group">
					            <button type="button" data-tooltip="tooltip" data-placement="bottom" title="Size"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					                30px
					            </button>
					            <ul class="dropdown-menu">
					                <li>20px</li>
					                <li>15px</li>
					                <li>10px</li>
					            </ul>
					        </div> -->
							</div>
							<div class="text-color" data-tooltip="tooltip"
								data-placement="bottom" title="Color">
								<input type="color" name="favcolor">
							</div>
						</div>
						<div class="modal-edit-content">
							<textarea id="modal-edit-content"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade make-background" id="modal-editor-bg"
			role="dialog">
			<input type="hidden" id="bg_color" value="" /> <input type="hidden"
				id="bg_variance" value="0.38" /> <input type="hidden"
				id="bg_cell_size" value="50" />
			<div class="modal-dialog modal-lg" style="width: 1000px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">CHOOSE YOUR BACKGROUND THEME</h4>
					</div>
					<div class="modal-body">
						<div class="row bg-upload-file">
							<div class="col-xs-2">Upload your BG:</div>
							<div class="col-xs-10">
								<label for="modal-edit-choosebg" class="custom-file-upload"> <i
									class="fa fa-cloud-upload"></i> Choose file
								</label> <input type="file" id="modal-edit-choosebg" value=""
									accept="image/*" style="width: 200px," size="60">
							</div>
						</div>
						<div class="row bg-custom-background">
							<div class="col-xs-2">Pattern Color:</div>
							<div class="col-xs-10 custom-background">
								<p>Choose color</p>
								<div class="row choose-color">
									<div class="col-xs-1">
										<div class="radio-button active">
											<img src="assets/images/color_1.jpg" data-color="YlGnBu"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_2.jpg" data-color="YlOrRd"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_3.jpg" data-color="PuOr"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_4.jpg" data-color="PuRd"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_5.jpg" data-color="Purples"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_6.jpg" data-color="Blues"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_7.jpg" data-color="YlOrBr"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_8.jpg" data-color="Reds"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_9.jpg" data-color="GnBu"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_10.jpg" data-color="Oranges"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_11.jpg" data-color="PRGn"
												alt="color" />
										</div>
									</div>
									<div class="col-xs-1">
										<div class="radio-button">
											<img src="assets/images/color_12.jpg" data-color="Spectral"
												alt="color" />
										</div>
									</div>
								</div>
								<div class="row edit-canvas">
									<div class="col-xs-6 choose-color-left">
										Variance (The amount of randomness) <input type="range"
											id="myRange" min="0" max="1" step="0.01" value="0">
										<div id="canvas1"></div>
									</div>
									<div class="col-xs-6 choose-color-right">
										Cell Size (The granularity of the pattern) <input type="range"
											id="myRange1" min="40" max="200" step="10" value="40">
										<div id="canvas2"></div>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i>Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-icon" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 750px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">FONT AWESOME ICON</h4>
					</div>
					<div class="modal-body">
						<div class="filter">
							Select Option: <select id="chg_icons"><option value="">-- Choose
									icon --</option><?=modules::run('home/get_category_icon')?></select>
							and
							<div class="input-search-icons">
								<input type="text" id="search_icons"
									placeholder="Type to Search" />
								<button>
									<i class="fa fa-search" aria-hidden="true"></i>
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-7">
								<div class="row" id="list_icons"></div>
							</div>
							<div class="col-xs-5">
								<p class="icon-preview">
									<i class="fa" aria-hidden="true"></i> <span></span>
								</p>
								<div class="edit-size">
									Size Icon: <input type="text" />
								</div>
								<div class="preview">
									<span>Preview:</span><i class="fa " aria-hidden="true"></i>
								</div>
								<p class="helper">Scalable vector graphics means every icon
									looks awesome at any size.</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default remove_icon">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i>Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-button" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 750px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">Edit Button</h4>
					</div>
					<div class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i>Save
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-text" role="dialog">
			<div class="modal-dialog modal-lg" style="width: auto">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">EDIT BUTTON</h4>
					</div>
					<div class="modal-body">
						<!-- <h4>Title</h4> -->
						<!-- tool tip edit button -->
						<div class="tooltip-edit-button">
							<!-- <div class="edit-link" data-tooltip="tooltip" data-placement="bottom" title="Link">
					        <i class="fa fa-link" aria-hidden="true"></i>
					    </div> -->
							<div class="text-select-font">
								<div class="btn-group">
									<button type="button" data-tooltip="tooltip"
										data-placement="bottom" title="Font" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">Select Font</button>
									<ul class="dropdown-menu">
										<li data-font="SourceSansPro-Regular">SourceSansPro</li>
										<li data-font="Arimo">Arimo</li>
										<li data-font="Dosis-Bold">Dosis</li>
										<li data-font="DroidSans">DroidSans</li>
										<li data-font="FjallaOne-Regular">FjallaOne</li>
										<li data-font="Lato-Black">Lato</li>
										<li data-font="LibreFranklin-Regular">LibreFranklin</li>
										<li data-font="Montserrat-Regular">Montserrat</li>
										<li data-font="Muli">Muli</li>
										<li data-font="NotoSans">NotoSans</li>
										<li data-font="OpenSans">OpenSans</li>
										<li data-font="Oswald-Regular">Oswald</li>
										<li data-font="PTSans-Regular">PTSans</li>
										<li data-font="Raleway-Regular">Raleway</li>
										<li data-font="Roboto-Black">Roboto</li>
										<li data-font="RobotoCondensed-Regular">RobotoCondensed</li>
										<li data-font="Roboto-Light">Roboto</li>
										<li data-font="TitilliumWeb-Regular">TitilliumWeb</li>
										<li data-font="Ubuntu">Ubuntu</li>
										<li data-font="Latha">Latha</li>
									</ul>
									<!--drop down lv 1-->
								</div>
								<!--button click dropdown-->
							</div>
							<div class="text-font-size" data-tooltip="tooltip"
								data-placement="bottom" title="Size">
								<input type="text" />
								<!-- <div class="btn-group">
					            <button type="button" data-tooltip="tooltip" data-placement="bottom" title="Size"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					                30px
					            </button>
					            <ul class="dropdown-menu">
					                <li>20px</li>
					                <li>15px</li>
					                <li>10px</li>
					            </ul>
					        </div> -->
							</div>
							<div class="text-color" data-tooltip="tooltip"
								data-placement="bottom" title="Color">
								<input type="color" name="favcolor">
							</div>
							<div class="edit-icon" data-tooltip="tooltip"
								data-placement="bottom" title="Icon">
								<i class="fa fa-lightbulb-o" aria-hidden="true"></i>
							</div>
							<!-- <div class="edit-add-sub" data-tooltip="tooltip" data-placement="bottom" title="Add submenu">
					        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
					    </div>
					    <div class="edit-remove" data-tooltip="tooltip" data-placement="bottom" title="Remove">
					        <i class="fa fa-trash" aria-hidden="true"></i>
					    </div> -->

						</div>
						<div class="modal-edit-button">
							<input id="modal-edit-button" type="text" value="" />
						</div>
						<div class="card fix-card">
							<ul class="nav nav-tabs" role="tablist">
								<li role="presentation" class="active"><a href="#blocks-1" aria-controls="home" role="tab" data-toggle="tab" aria-expanded="true"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>&nbsp;Blocks</a></li>
								<li role="presentation" class=""><a href="#url" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false"><span class="glyphicon glyphicon-link" aria-hidden="true"></span>&nbsp;Url</a></li>
								<li role="presentation"><a href="#fone" aria-controls="messages" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>&nbsp;Phone call</a></li>
							</ul>

							<!-- Tab panes -->
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane active" id="blocks-1">
									<div class="ui-widget">
										<input type="text" class="form-control ui-autocomplete-input" id="tags" placeholder= "Select block..." autocomplete="off">
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="url">
									<input type="text" class="form-control" id="link">
								</div>
								<div role="tabpanel" class="tab-pane" id="fone">demo</div>
							</div>
						</div>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i>Save
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button" class="btn btn-default remove_source">
							<i class="fa fa-trash" aria-hidden="true"></i>Remove
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-menu" role="dialog">
			<div class="modal-dialog modal-lg" style="width: auto">
				<div class="modal-content">
					<div class="modal-body">
						<!-- tool tip edit menu -->
						<div class="tooltip-edit-menu">
							<div class="edit-link" data-tooltip="tooltip"
								data-placement="bottom" title="Link">
								<i class="fa fa-link" aria-hidden="true"></i>
							</div>
							<div class="edit-icon" data-tooltip="tooltip"
								data-placement="bottom" title="Icon">
								<i class="fa fa-lightbulb-o" aria-hidden="true"></i>
							</div>
							<div class="edit-add" data-tooltip="tooltip"
								data-placement="bottom" title="Add menu">
								<i class="fa fa-plus" aria-hidden="true"></i>
							</div>
							<div class="edit-add-sub" data-tooltip="tooltip"
								data-placement="bottom" title="Add submenu">
								<i class="fa fa-plus-square-o" aria-hidden="true"></i>
							</div>
							<div class="edit-right" data-tooltip="tooltip"
								data-placement="bottom" title="Move right">
								<i class="fa fa-arrow-right" aria-hidden="true"></i>
							</div>
							<div class="edit-remove" data-tooltip="tooltip"
								data-placement="bottom" title="Remove">
								<i class="fa fa-trash" aria-hidden="true"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-export" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">Export Template</h4>
					</div>
					<div class="modal-body">
						<div class="modal-body-export">
							<div class="export-item-input export-code">
								<p>Purchase code:</p>
								<input id="export_code" type="text" value=""
									placeholder='Click "Purchase" button below to get purchase code' />
								<div class="error-validate"></div>
							</div>
							<div class="export-item-input">
								<p>Title:</p>
								<input id="export_title" type="text" value="" />
							</div>
							<div class="export-item-input">
								<p>Description:</p>
								<input id="export_description" type="text" value="" />
							</div>
							<div class="export-item-input">
								<p>Keyword:</p>
								<div id="export_keyword" data-tags-input-name="tag" type="text"
									value=""></div>
								<!-- placeholder="Each Text is separated by a common
							<div  id="tagBox">preexisting-tag</div> -->
							</div>
							<button type="button" class="btn btn-primary btn-export-save"
								onclick="export_template()">
								<i class="fa fa-download" aria-hidden="true"></i>Export
							</button>
							<button type="button" class="btn btn-default btn-export-close"
								data-dismiss="modal">
								<i class="fa fa-times" aria-hidden="true"></i>Cancel
							</button>
							<a target="_blank"
								href="https://themeforest.net/item/cosmos-multi-purpose-app-landing-page-with-builder/19068486?s_rank=1"
								class="btn btn-primary btn-export-purchase"><i
								class="fa fa-floppy-o" aria-hidden="true"></i>Purchase</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-confirm-delete-page" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 400px">
				<div class="modal-content">
					<div class="modal-body">
						<p>Are you sure you want to delete this page ?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default "
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button"
							class="btn btn-primary confirm-delete-page-save">
							<i class="fa fa-trash" aria-hidden="true"></i>Delete
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-confirm-remove-item" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 400px">
				<div class="modal-content">
					<div class="modal-body">
						<p>Are you sure you want to remove this item ?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default "
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button"
							class="btn btn-primary confirm-remove-item-save">
							<i class="fa fa-trash" aria-hidden="true"></i>Delete
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-confirm-remove-icon" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 400px">
				<div class="modal-content">
					<div class="modal-body">
						<p>Are you sure you want to remove this icon ?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default "
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button"
							class="btn btn-primary confirm-remove-item-icon">
							<i class="fa fa-trash" aria-hidden="true"></i>Delete
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-confirm-delete-module" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 400px">
				<div class="modal-content">
					<div class="modal-body">
						<p>Are you sure you want to delete this module ?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default "
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>
						<button type="button"
							class="btn btn-primary confirm-delete-module-save">
							<i class="fa fa-trash" aria-hidden="true"></i>Delete
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-edit-fontstyle" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 250px">
				<div class="modal-content">
					<div class="modal-body">
						<p data-font="SourceSansPro-Regular">SourceSansPro</p>
						<p data-font="Arimo">Arimo</p>
						<p data-font="Dosis-Bold">Dosis</p>
						<p data-font="DroidSans">DroidSans</p>
						<p data-font="FjallaOne-Regular">FjallaOne</p>
						<p data-font="Lato-Black">Lato</p>
						<p data-font="LibreFranklin-Regular">LibreFranklin</p>
						<p data-font="Montserrat-Regular">Montserrat</p>
						<p data-font="Muli">Muli</p>
						<p data-font="NotoSans">NotoSans</p>
						<p data-font="OpenSans">OpenSans</p>
						<p data-font="Oswald-Regular">Oswald</p>
						<p data-font="PTSans-Regular">PTSans</p>
						<p data-font="Raleway-Regular">Raleway</p>
						<p data-font="Roboto-Black">Roboto</p>
						<p data-font="RobotoCondensed-Regular">RobotoCondensed</p>
						<p data-font="Roboto-Light">Roboto</p>
						<p data-font="TitilliumWeb-Regular">TitilliumWeb</p>
						<p data-font="Ubuntu">Ubuntu</p>
						<p data-font="Latha">Latha</p>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal-editor-menu-effect" role="dialog">
			<div class="modal-dialog modal-lg" style="width: 650px">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
						<h4 class="modal-title">menu</h4>
					</div>
					<div class="modal-body">
						<!-- <h4>Title</h4> -->
						<!-- tooltip edit text -->
						<div class="tooltip-edit-font-text">
							<div class="text-align" data-tooltip="tooltip"
								data-placement="bottom" title="Align">
								<i class="fa fa-align-center" aria-hidden="true"></i>
							</div>
							<!-- <div class="text-link edit-link" data-tooltip="tooltip" data-placement="bottom" title="Link">
					        <i class="fa fa-link" aria-hidden="true"></i>
					    </div> -->
							<div class="text-select-font">
								<div class="btn-group">
									<button type="button" data-tooltip="tooltip"
										data-placement="bottom" title="Font" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">Select Font</button>
									<ul class="dropdown-menu">
										<li data-font="SourceSansPro-Regular">SourceSansPro</li>
										<li data-font="Arimo">Arimo</li>
										<li data-font="Dosis-Bold">Dosis</li>
										<li data-font="DroidSans">DroidSans</li>
										<li data-font="FjallaOne-Regular">FjallaOne</li>
										<li data-font="Lato-Black">Lato</li>
										<li data-font="LibreFranklin-Regular">LibreFranklin</li>
										<li data-font="Montserrat-Regular">Montserrat</li>
										<li data-font="Muli">Muli</li>
										<li data-font="NotoSans">NotoSans</li>
										<li data-font="OpenSans">OpenSans</li>
										<li data-font="Oswald-Regular">Oswald</li>
										<li data-font="PTSans-Regular">PTSans</li>
										<li data-font="Raleway-Regular">Raleway</li>
										<li data-font="Roboto-Black">Roboto</li>
										<li data-font="RobotoCondensed-Regular">RobotoCondensed</li>
										<li data-font="Roboto-Light">Roboto</li>
										<li data-font="TitilliumWeb-Regular">TitilliumWeb</li>
										<li data-font="Ubuntu">Ubuntu</li>
										<li data-font="Latha">Latha</li>
									</ul>
									<!--drop down lv 1-->
								</div>
								<!--button click dropdown-->
							</div>
							<div class="text-font-size" data-tooltip="tooltip"
								data-placement="bottom" title="Size">
								<input type="text" />
								<!-- <div class="btn-group">
					            <button type="button" data-tooltip="tooltip" data-placement="bottom" title="Size"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					                30px
					            </button>
					            <ul class="dropdown-menu">
					                <li>20px</li>
					                <li>15px</li>
					                <li>10px</li>
					            </ul>
					        </div> -->
							</div>
							<div class="text-color" data-tooltip="tooltip"
								data-placement="bottom" title="Color">
								<input type="color" name="favcolor">
							</div>
							<div class="menu-option-ad">
								<i class="" aria-hidden="true"> menu </i>
							</div>
						</div>
						<div class="modal-edit-input-title">
							<input class="modal-edit-title" type="text" value="" />
						</div>
						<button type="button" class="btn btn-primary save_source">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
						</button>
						<button type="button" class="btn btn-default close_source"
							data-dismiss="modal">
							<i class="fa fa-times" aria-hidden="true"></i>Cancel
						</button>

					</div>
					<!-- end modal -->
				</div>
			</div>
		</div>

	</div>

	<!-- Modal option menu -->
	<div id="modal-option-change-menu" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-align: center;">Menu option</h4>
				</div>

				<div class="modal-body" style="height: 220px; overflow: visible;">

					<!-- struct chose option menu -->
					<div class="block-list-op-menu">
						<ul class="chose-item-menu-list">
							<li class="chose-menu" data-type-menu="type-menu-1">menu 1</li>
							<li data-type-menu="type-menu-2">menu 2</li>
							<li data-type-menu="type-menu-3">menu 3</li>
							<li data-type-menu="type-menu-4">menu 4</li>
							<li data-type-menu="type-menu-5">menu 5</li>
						</ul>

						<div class="list-item-menu type-menu-1-op"
							style="opacity: 1; z-index: 10;">
							<nav class="menu-head-page menu menu--viola">
								<ul class="menu-des menu__list">
									<li class="menu__item menu__item--current"><a href="#"
										class="menu__link">Home</a></li>
									<li class="menu__item"><a href="#" class="menu__link">feature</a></li>
									<li class="menu__item"><a href="#" class="menu__link">demo</a></li>
									<li class="menu__item"><a href="#" class="menu__link">subcribe</a></li>

									<li class="menu__item"><a href="#" class="menu__link">team</a></li>
									<li class="menu__item"><a href="#" class="menu__link">contact</a></li>
								</ul>
							</nav>
						</div>
						<!-- end list-item-menu -->
						<div class="list-item-menu type-menu-2-op navi-type-2">
							<nav class="menu-head-page">
								<ul class="menu-des">
									<li class="menu__item"><a href="#"
										class="menu__item--current effect-zoom">Home</a></li>
									<li class="menu__item"><a href="#" class="">feature</a></li>
									<li class="menu__item"><a href="#" class="">demo</a></li>
									<li class="menu__item"><a href="#" class="">subcribe</a></li>

									<li class="menu__item"><a href="#" class="">team</a></li>
									<li class="menu__item"><a href="#" class="">contact</a></li>
								</ul>
							</nav>
						</div>
						<!-- end list-item-menu -->
						<div class="list-item-menu clor-navi-1 type-menu-3-op navi-type-3">
							<nav class="menu-head-page">
								<ul class="menu-des">
									<li class=""><a href="#" class="">Home</a></li>
									<li class=""><a href="#" class="">feature</a></li>
									<li class=""><a href="#" class="">demo</a></li>


									<li class=""><a href="#" class="menu__item--current">team</a></li>
									<li class=""><a href="#" class="">contact</a></li>
									<li class="demo-buble"><i></i> <i></i> <i></i></li>
								</ul>
							</nav>
						</div>
						<!-- end list-item-menu -->
						<div class="list-item-menu">
							<nav class="menu-head-page menu menu--sebastian type-menu-4-op">
								<ul class="menu-des menu__list">
									<li class="menu__item menu__item--current"><a href="#"
										class="menu__link">Home</a></li>
									<li class="menu__item"><a href="#" class="menu__link">feature</a></li>
									<li class="menu__item"><a href="#" class="menu__link">demo</a></li>

									<li class="menu__item"><a href="#" class="menu__link">team</a></li>
									<li class="menu__item"><a href="#" class="menu__link">contact</a></li>
								</ul>
							</nav>
						</div>
						<!-- end list-item-menu -->
						<div class="list-item-menu">
							<nav class="menu-head-page type-menu-5-op clor-navi-5">
								<ul class="menu-des ">
									<li class="menu__item"><a href="#"
										class="menu__link menu__item--current">Home</a></li>
									<li class="menu__item"><a href="#" class="menu__link">feature</a></li>
									<li class="menu__item"><a href="#" class="menu__link">demo</a></li>

									<li class="menu__item"><a href="#" class="menu__link">team</a></li>
									<li class="menu__item"><a href="#" class="menu__link">contact</a></li>
								</ul>
							</nav>
						</div>
						<!-- end list-item-menu -->


						<span class="bnt-menu-cancal"><i class="fa fa-times"
							aria-hidden="true" data-dismiss="modal"></i> Close</span> <span
							class="bnt-menu-accept"><i class="fa fa-floppy-o"
							aria-hidden="true" data-dismiss="modal"></i> Save</span>
					</div>
					<!-- block-list-op-menu -->

				</div>
				<!-- end body -->

				<div class="modal-footer" style="padding: 0;">
					<button type="button" class="btn btn-default cls-md-menu"
						data-dismiss="modal" style="opacity: 0;">Close</button>
				</div>
			</div>

		</div>
	</div>
	<!-- end Modal option menu -->


	<button class="show-aler-drag" type="button" data-toggle="modal"
		data-target="#modal-alert-drag" style="display: none;"></button>
	<!-- Modal -->
	<div id="modal-alert-drag" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-align: center;">Please choose
						header firstly</h4>

				</div>

				<div class="modal-footer" style="text-align: center;">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						style="color: #fff; background-color: #343648;">Close</button>
				</div>
			</div>

		</div>
	</div>
	<div id="modal-alert-multi-header" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-align: center;">header already
						exist</h4>

				</div>

				<div class="modal-footer" style="text-align: center;">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						style="color: #fff; background-color: #343648;">Close</button>
				</div>
			</div>

		</div>
	</div>
	<div id="modal-alert-purchase" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-align: center;">Do you want to
						export it? Please purchase the templete first!</h4>
				</div>

				<div class="modal-footer" style="text-align: center;">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						style="margin-top: -4px; color: #fff; background-color: #343648;">Close</button>
					<a
						href="https://themeforest.net/item/cosmos-multi-purpose-app-landing-page-with-builder/19068486?s_rank=1"
						target="_blank"> Purchase </a>
				</div>
			</div>

		</div>
	</div>
	<div id="modal-alert-success" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-align: center;">duplicate has
						been success</h4>

				</div>

				<div class="modal-footer" style="text-align: center;">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						style="color: #fff; background-color: #343648;">Close</button>
				</div>
			</div>

		</div>
	</div>
	<!-- end modal alert -->
	<!-- modal edit image-link -->
	<div class="modal fade" id="modal-editor-image-link" role="dialog">
		<div class="modal-dialog modal-lg" style="width: 650px">
			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal"><img src="assets/images/button_close.png" alt="close"/></button> -->
					<h4 class="modal-title">Edit Image</h4>
				</div>
				<div class="modal-body">
					<label for="modal-edit-chooseimagelink" class="custom-file-upload">
						<i class="fa fa-cloud-upload"></i> Choose file
					</label>
					<div class="content-edit-image-link">
						<div class="content-edit-link-title">
							<p>URL</p>
							<input id="modal-edit-imagelink-url" type="text" value="" />
						</div>
						<div class="content-edit-link-url">
							<p>LINK</p>
							<input id="modal-edit-imagelink-link" type="text" value="" />
						</div>
					</div>
					<!-- <h4>URL</h4>
				<input id="modal-edit-urlimage" type="text" value="" /> -->
					<input type="file" id="modal-edit-chooseimagelink" value=""
						accept="image/*">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default remove_source">
						<i class="fa fa-trash" aria-hidden="true"></i>Remove
					</button>
					<button type="button" class="btn btn-default close_source"
						data-dismiss="modal">
						<i class="fa fa-times" aria-hidden="true"></i>Cancel
					</button>
					<button type="button" class="btn btn-primary save_source">
						<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- end edit image-link -->
	<!-- jQuery -->
	<input type="hidden" value="index" id="page_active" />
	<input type="hidden" value="index" id="all_page_list" />
	<script type="text/javascript">
var root = '<?=PATH_URL?>';
var is_permanent = false;
<?php
if ($is_permanent) {
    ?>
	is_permanent = true;
<?php
}
?>
var cookie_upload_url = '<?=PATH_URL.'home/save_permanent_cookie'?>';
var cookie_download_url = '<?=PATH_URL.'home/get_permanent_cookie'?>';
var file_image_upload_url = '<?=PATH_URL.'home/upload_file'?>';
</script>

	<!-- jquery js -->
	<script
		src="<?=get_resource_url('assets/libs/jquery/jquery-1.12.4.min.js')?>"></script>
	<script
		src="<?=get_resource_url('assets/libs/jquery/jquery-ui.min.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/blocks/wow.min.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/jquery.json.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/block.js')?>"></script>

	<script src="<?=get_resource_url('assets/js/dynamic-menu.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/modernizr.custom.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/jquery.easing.min.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/css3-animate-it.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/ace/ace.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/main.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/site.js')?>"></script>
	<!-- edit font JavaScript -->
	<script src="<?=get_resource_url('assets/js/edit-font.js')?>"></script>

	<script
		src="<?=get_resource_url('assets/js/jquery.uploadfile.min.js')?>"></script>
	<script src="<?=get_resource_url('assets/js/tagging.min.js')?>"></script>

	<!-- bootstrap js -->
	<script
		src="<?=get_resource_url('assets/libs/bootstrap/bootstrap.min.js')?>"></script>
	<!-- fancybox -->
	<script type="text/javascript"
		src="<?=get_resource_url('assets/libs/fanxybox/source/jquery.fancybox.js?v=2.1.5')?>"></script>
	<script type="text/javascript"
		src="<?=get_resource_url('assets/libs/fanxybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5')?>"></script>
	<script type="text/javascript"
		src="<?=get_resource_url('assets/libs/fanxybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7')?>"></script>
	<script type="text/javascript"
		src="<?=get_resource_url('assets/libs/fanxybox/source/helpers/jquery.fancybox-media.js?v=1.0.6')?>"></script>
	<!-- carousel js -->
	<!-- <script src="<?=get_resource_url('assets/libs/carousel/owl.carousel.min.js')?>"></script>-->
	<script
		src="<?=get_resource_url('assets/libs/carousel/owl.carousel.js')?>"></script>

	<!-- trianglify js -->
	<script
		src="<?=get_resource_url('assets/libs/trianglify/trianglify.min.js')?>"></script>
	<!-- main js -->
	<script src="<?=get_resource_url('assets/js/style.js')?>"></script>
	<!-- api google map -->
	<!-- <script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyD8ewqqgR-mGVqUdmZGjyO4pD7qLOjB_Wc" type="text/javascript"></script> -->

	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-86565629-2', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>