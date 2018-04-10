    <div class="img-blog-edit">
        <img class="img-top-blog" src="<?=get_resource_url('assets/images/blog2.jpg')?>"/>
    </div>
    <div class="main-content redm-blog">
    <?php
    foreach ($articles_blog as $result) {
    // result category
    $category_id = $result->category_id;
    $articles_id = $result->id;

    
    ?>
        <div class="title-classic">
            <h3><?=$result->title?></h3>
        </div>

         <div>
            <img class="img-top-blog mw-100pt" src="<?php echo get_resource_url(substr($result->image, 1)) ?>" alt="<?php echo $result->title ?>">
        </div> 
        <div class="text-content">
            <p><?=$result->description?></p>
            <div class="clear-fix"></div>
        </div>

        <div class="content-center-blog mg-t10">
            <div class="text-center-content-blog">
               <?php echo str_replace( array("#222222","black"),"white",$result->content) ?>
            </div>
            
        </div>
    <?php
    }
    ?>
        <div class="comment-blog <?php if(isset($hidden)){ echo 'hidden'; } ?>">
            <input type="hidden" value="<?php ($this->session->userdata('start'))? print $this->session->userdata('start') : print 0 ?>" id="start" />
             <input type="hidden" value="10" id="per_page">
            <h2 class="comment-title">
                <span><? //echo count($item_list)?></span>
                Comments      
            </h2>
         
     

            <div class="clear-fix"></div>
            <?php if(isset($this->session->userdata['userData'])){
            foreach ($userDataSetting1 as $value ){
                $username =  $value->username;
                $thumbnail = $value->thumbnail;
                $user_info_id = $value->id;
            }
            $id_artcles_item_lang = $articles_id;
            ?>
            
            <div class="comment-write mg-t20">
                <div class="name-conversation"><a href="#overview"><?php echo $username ?></a> join the conversation</div>
                <form action="<?php echo PATH_URL ?><?php echo $this->lang->default_lang() ?>/comments" method="POST" id="form-user-comment">


                <div class="mg-t10 mg-b10">
                    <img class="comment-img" src="<?=get_resource_url($thumbnail)?>" alt="<?php echo $username ?>" width="60" height="60" />
                    <input type="hidden" name='user_info_id' value="<?php echo $user_info_id ?>">
                    <input type="hidden" name='id_artcles_item_lang' value="<?php echo $id_artcles_item_lang ?>">
                    <textarea id="comment-box" name="comment" placeholder="Write Comment..." required value=""></textarea>
                </div>
                <div class="comment-action">
                    <input type="reset" name="reset" value="Cancel" />
                    <input type="submit" name="comment" value="Post"/>
                    <div class="clearfix"></div>
                    <div class="comment-guideline mg-t10">Community guidelines</div>
                </div>
                </form>
                
            </div>
    

            <?php  } ?>
             <div class="clear-fix"></div>

            <div class="comment-show mg-t20">
                <span class="comment-total">
                </span>

                <ol id="ajax_loadcomment" data-ajax-load-comment="<?php echo PATH_URL ?><?php echo $this->lang->default_lang() ?>/ajax_comment" data-ajax-load-comment-id="<?php echo $articles_id ?>">
                    <!-- ajax load comment -->
                    
                </ol>
                

          <!--       <div class="comment-next-prev">
                    <ul class="pagination-pix padding-top-50">
                        <?=$paginator?>
                    </ul>
                 </div> -->                                                                                                                                                                                                                                                                                                             

                <div class="comment-next-prev hidden">
                    <ul class="pagination-pix padding-top-50">
                        <li><a class="first" href="#">« Previous</a></li>
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a class="last" href="#">Next »</a></li>
                    </ul>
                </div>


            </div>
        </div>
        <div class="popup-modal-signup">
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                
                  <div class="modal-body">
                    <p></p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default"  data-dismiss="modal">Close</button>
                  </div>
                </div>

            </div>
        </div>
    </div>
        <div class="title mg-t30">

            <h3 class="text-read-also">READ ALSO</h3>
        </div>

        <div class=" list-post">
            <div class="carousel">
                <div class="carousel-items">
                
                <?php 
                function the_excerpt($text, $count){ 
                $text = str_replace("  ", " ", $text); 
                $string = explode(" ", $text); 
                $len = count($string); 
                $count = ($count > $len) ? $count = $len : $count;
                    for ( $wordCounter = 0; $wordCounter < $count; $wordCounter++ ){ 
                        if(empty($result_text)) {
                            $result_text= $string[$wordCounter];    
                        }else{
                            $result_text.= $string[$wordCounter];   
                        }
                        if ( $wordCounter < $count - 1 ){ 
                            $result_text .= " "; 
                        } else if($count < $len ) { 
                            $result_text .= " ..."; 
                        } 
                    } 
                $result_text = trim($result_text); 
                return $result_text; 
                } 

                $articles_blog_category = modules::run('home/get_articles_blog_category', $category_id, $articles_id);
                foreach ($articles_blog_category as $result) {   
                ?>
                    <div class="slider-item">
                        <div class="item mg-b20 item-latest-slick">
                            <div class="wrap-image">
                            <?php if($this->lang->default_lang() == 'en') { ?>
                                <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>">
                            <?php } else{ ?>
                                <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>">   
                            <?php  } ?>
                            <img src="<?php echo get_resource_url(substr($result->image, 1)) ?>" alt="<?php echo $result->title ?>" class="image-post">
                            </a>
                    
                          
                            </div>
                            <div class="text-content">
                                <p class="hidden"><?php if($this->lang->default_lang() == 'en') { ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="tag-a-title1 p-fs-20">
                                    <?php } else{ ?>
                                        <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="tag-a-title1 p-fs-20">   
                                    <?php } ?><?php echo $result->title ?></a>
                                </p>
                                <p><?php echo the_excerpt($result->description, 16);  ?></p>
                                <?php if($this->lang->default_lang() == 'en') { ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="read-more">
                                <?php } else{ ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="read-more">   
                                <?php } ?>+ read more</a>
                                <div class="clear-fix"></div>
                            </div>
                        </div>
                    </div>
                <?php
                   
                }
                ?>
                </div>
                <div class="carousel-prev prev">
                    <i class="fa fa-caret-left" aria-hidden="true"></i>
                </div>
                <div class="carousel-next next">
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <img src="<?=get_resource_url('assets/images/ad2.png')?>" class="mg-b20 ad-single-image">
    </div>
    
   
