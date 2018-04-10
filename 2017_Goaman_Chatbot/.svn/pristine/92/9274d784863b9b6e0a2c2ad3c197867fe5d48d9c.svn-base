
<?php
$comment = modules::run('home/get_user_comment', $articles_id);
foreach ($comment as $result) {  
if($result->like == ''){
    $like = '';
} else{
    $array = explode("|", $result->like);
    $like = 0;
    for( $i = 0 ; $i < count($array) ; $i+=2){
        $like= $like + $array[$i];
    }

    if( $like == 0 ){
        $like = '';
    }

}

 ?>
    <li class="comment-detail">
      
       <!-- comment parent -->
        <div class="comment-detail-parent comment-detail-parent-<?php echo $result->id ?>">
            <div class="avatar hover-toggle-parent">                             
                <a class="comment-hover-img" href="#overview">
                    <img class="comment-detail-img" src="<?=get_resource_url($result->thumbnail)?>" width="60" height="60">
                </a>

                <div class="userPanel hover-toggle hidden">
                    <img class="flag" src="<?=get_resource_url('assets/images/uk.gif')?>">
                    <div>
                          <h3>
                            <a href="#overview-link"><?php //$item['username']?></a>
                        </h3>
                        <ul>
                            <li>
                                <span>RA since /</span>
                             <?php echo date('H:i:s d/m/Y', strtotime($result->created)) ?>
                            </li>
                            <li>
                                <span>Posts /</span>
                                327
                            </li>
                            <li class="nextat truncate">
                                <span>Next @ /</span>
                                <a href="/event.aspx?"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="comment-center">

                <div class="comment-author-date-reply">
                    <a href="#overview" class="author"><?php echo $result->username ?> &nbsp</a>
                    <span class="date"><?php echo date('H:i:s d/m/Y', strtotime($result->created)) ?> &nbsp</span>
                    
                     <?php if(isset($this->session->userdata['userData'])){ ?>

                    <a class="reply" data-ajax-load-comment-link="<?php echo PATH_URL ?><?php echo $this->lang->default_lang() ?>/ajax_comment_reply" data-comment-child-reply="<?php echo $articles_id ?>,<?php echo $result->id  ?>" href="#form-user-comment-reply-<?php echo $result->id ?>" >Reply </a>

                    <?php } ?>
                     
                </div>
                <div class="content">
                 <span><?php echo $result->comment ?></span>
                </div>
            </div>

            <div class="comment-like">
                <div class="control-like">
                    <div class="input-group">
                       <!--  <input type="text" name="sl" class="input-value" value="01"> -->
                       <span class="input-value"><?php echo $like ?></span>

                        <?php if(isset($this->session->userdata['userData'])){ ?>
                        <span class="input-group-btn">
                            <button type="button" class="button-minus" data-type="minus" data-field="sl">
                                <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                        </span>
                        
                        <span class="input-group-btn">
                            <button type="button" class="button-plus" data-type="plus" data-field="sl">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </span>
                        <?php } ?>
                    </div>
                </div>
            </div>


        </div>
         <!-- end comment parent -->
   

        <div class="clearfix"></div>

        <!-- div child comment -->
        <div class="div-ajax-load-reply div-ajax-load-reply-<?php echo $result->id ?>">
            <?php 
            $comment2 = modules::run('home/get_user_comment_child', $articles_id, $result->id );
            foreach ($comment2 as $result2) {  

            if($result2->like == ''){
                $like = '';
            } else{
                $array = explode("|", $result2->like);
                $like = 0;
                for( $i = 0 ; $i < count($array) ; $i+=2){
                    $like= $like + $array[$i];
                }

                if( $like == 0 ){
                    $like = '';
                }

            }

            ?>
    
            <!-- child comment -->
            <div class="clearfix"></div>
            <div class="comment-detail-child">
                <div class="avatar hover-toggle-parent">                             
                    <a class="comment-hover-img"  href="#overview">
                        <img class="comment-detail-img" src="<?=get_resource_url($result->thumbnail)?>" width="60" height="60">
                    </a>

                    <div class="userPanel hover-toggle hidden">
                        <img class="flag" src="<?=get_resource_url('assets/images/uk.gif')?>">
                        <div>
                              <h3>
                                <a href="#overview-link"><?php //$item['username']?></a>
                            </h3>
                            <ul>
                                <li>
                                    <span>RA since /</span>
                                 <?php echo date('H:i:s d/m/Y', strtotime($result2->created)) ?>
                                </li>
                                <li>
                                    <span>Posts /</span>
                                    327
                                </li>
                                <li class="nextat truncate">
                                    <span>Next @ /</span>
                                    <a href="/event.aspx?"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="comment-center">

                    <div class="comment-author-date-reply">
                        <a href="#overview" class="author"><?php echo $result2->username ?> &nbsp</a>
                        <span class="date"><?php echo date('H:i:s d/m/Y', strtotime($result2->created)) ?> &nbsp</span>
                        <?php if(isset($this->session->userdata['userData'])){ ?> 
                       <a class="reply" data-ajax-load-comment-link="<?php echo PATH_URL ?><?php echo $this->lang->default_lang() ?>/ajax_comment_reply" data-comment-child-reply="<?php echo $articles_id ?>,<?php echo $result->id  ?>" href="#form-user-comment-reply-<?php echo $result->id ?>" >Reply </a>
                       <?php } ?>
                    </div>
                    <div class="content">
                     <span><?php echo $result2->comment ?></span>
                    </div>
                </div>
                <div class="comment-like">
                    <div class="control-like">
                        <div class="input-group">
                            <!-- <input type="text" name="sl" class="input-value" value="01"> -->
                            <span class="input-value"><?php echo $like ?></span>
                             <?php if(isset($this->session->userdata['userData'])){ ?>
                            <span class="input-group-btn">
                                <button type="button" class="button-minus" data-type="minus" data-field="sl">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                </button>
                            </span>
                            
                            <span class="input-group-btn">
                                <button type="button" class="button-plus" data-type="plus" data-field="sl">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </span>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>


            <!-- end child comment -->
            <?php } ?>

            <!-- ajax comment-reply -->
            <div class="div-comment-form-reply">
            <!-- load data -->
            </div>
            <!-- end ajax comment-reply -->


        </div>
        <!-- child comment -->
        <div class="clear-fix"></div> 

    </li> 
    <?php } ?>
