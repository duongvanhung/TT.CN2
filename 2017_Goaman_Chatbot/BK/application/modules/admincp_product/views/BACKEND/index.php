<input type="hidden" value="<?php ($this->session->userdata('start'))? print $this->session->userdata('start') : print 0 ?>" id="start" />
<input type="hidden" value="<?=$default_func?>" id="func_sort" />
<input type="hidden" value="<?=$default_sort?>" id="type_sort" />
<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
<div class="modal fade" id="portlet-alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
				<h4 class="modal-title">Alert !!!</h4>
			</div>
			<div class="modal-body">
				Are you sure delete item selected?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn blue" onclick="deleteAll()">Delete</button>
				<button type="button" class="btn default" data-dismiss="modal">Close</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->


<!-- BEGIN PAGE HEADER-->
<h3 class="page-title"><?=$module_name?></h3>
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li><i class="fa fa-home"></i><a href="<?=PATH_URL_ADMIN?>">Home</a><i class="fa fa-angle-right"></i></li>
		<li><?=$module_name?></li>
	</ul>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE NOTIFICATION-->
<div class="form-body notification notification-index" style="display:none">
	<div class="alert alert-success" style="display:none">
		<strong>Success!</strong> The page has been saved.
	</div>
	
	<div class="alert alert-danger" style="display:none">
		<strong>Error!</strong> <span id="txt_error"></span>
	</div>
</div>
<!-- END PAGE NOTIFICATION-->
<!-- BEGIN PAGE CONTENT-->
<div class="row">
	<div class="col-md-12">
		<!-- BEGIN EXAMPLE TABLE PORTLET-->
		<div class="portlet box grey-cascade">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-globe"></i>Managed Table
				</div>
				<div class="tools">
					<a href="javascript:;" onclick="searchContent(0)" class="reload"></a>
				</div>
			</div>

			<div class="portlet-action">
				<div class="table-toolbar" style="margin-bottom:0">
					<div class="row" style="margin-bottom:15px">
						<div class="col-md-6">
							<div class="btn-group">
								<a href="<?=PATH_URL_ADMIN.$module.'/update/'?>"><button class="btn btn-margin green"><i class="fa fa-edit"></i> Add New</button></a>
								<a href="#portlet-alert" data-toggle="modal" class="pull-right"><button class="btn btn-margin red" data-toggle="modal" href="#basic"><i class="fa fa-trash"></i> Delete</button></a>
								<button class="btn btn-margin default pull-right" onclick="hideStatusAll()"><i class="fa fa-close"></i> Blocked</button>
								<button class="btn btn-margin blue pull-right" onclick="showStatusAll()"><i class="fa fa-check"></i> Approved</button>
							</div>
						</div>

						<!-- <div class="col-md-4">
							<div class="btn-group" style="width: 150px;">
								<?php
								if(!empty($user_type_list)){
								?>
									<select id="filter1" class="form-control input-medium" style="width: 150px;" onchange="searchContent(0)">
										<option>All</option>
								<?php
									foreach($user_type_list as $user_type){
								?>
										<option value="<?php echo $user_type->id?>">
											<?php echo $user_type->type?>
										</option>
								<?php
									}
								?>
									</select>
								<?php
								}
								?>
							</div>
						</div> -->

						<div class="col-md-6">
							<div class="btn-group pull-right">
								<button class="btn dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i>
								</button>
								<ul class="dropdown-menu pull-right">
									<li>
										<a href="#">Export to Excel</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-2 col-sm-12">
							<div class="dataTables_length"><label style="margin-bottom:0;">
								<select id="per_page" class="form-control input-xsmall input-inline" onchange="searchContent(0,this.value)">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select> records</label>
							</div>
						</div>

						<div class="col-md-10 col-sm-12">
							<div class="dataTables_filter">
								<button onclick="searchContent(0)" class="btn btn-margin yellow" style="float:right;margin-right:0 !important;margin-left:10px"><i class="fa fa-search"></i> Search</button>
								<div style="float:right;" class="input-group input-large date-picker input-daterange" data-date-format="yyyy/mm/dd">
									<input onkeypress="return enterSearch(event)" id="caledar_from" type="text" class="form-control" name="from">
									<span class="input-group-addon">to</span>
									<input onkeypress="return enterSearch(event)" id="caledar_to" type="text" class="form-control" name="to" style="width:100px">
								</div>
								<label style="margin-bottom:0;margin-left:10px">Choose date:&nbsp;</label>
								<label style="margin-bottom:0;">My search: <input onkeypress="return enterSearch(event)" id="search_content" placeholder="type here..." type="search" class="form-control input-medium input-inline" placeholder="" ></label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="portlet-body" style="padding-top:5px;padding-bottom:9px;"></div>
		</div>
		<!-- END EXAMPLE TABLE PORTLET-->
	</div>
</div>
<!-- END PAGE CONTENT-->