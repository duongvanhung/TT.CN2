
    <div class="main-content mt140">
        <div class="title">
            <h3 class="mg-t0"><span>LATEST</span></h3>
        </div>

        <div class="carousel-home-1">
            <div class="carousel">
                <div class="carousel-items">
                    <?php
                    // Featured
                    $featured = modules::run('home/get_articles_featured');
                    foreach ($featured as $result){ ?>
                        <div class="slider-item">
                           <div class="slide-item-img"> 
                               <?php if($this->lang->default_lang() == 'en') { ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>">
                                <?php } else{ ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>">   
                                <?php } ?>
                                   <img src="<?php echo get_resource_url(substr($result->image, 1)) ?>" alt="<?php echo $result->title ?>">
                                    </a>
                            </div>
                            <div class="text-content carousel-items-description">
                                <p class="hidden"><?php if($this->lang->default_lang() == 'en') { ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="tag-a-title1 p-fs-20">
                                <?php } else{ ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="tag-a-title1 p-fs-20"> 
                                <?php } ?>
                                <?php echo $result->title ?></a></p>
                                <p><?php echo $result->description ?></p>
                                <?php if($this->lang->default_lang() == 'en') { ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="read-more">
                                <?php } else{ ?>
                                    <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="read-more">   
                                <?php } ?>+ read more</a>
                                <div class="clear-fix"></div>
                            </div>
                        </div>
                    <?php } ?> 
                </div>
                <div class="carousel-prev">
                    <i class="fa fa-caret-left" aria-hidden="true"></i>
                </div>
                <div class="carousel-next">
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>

        <hr/>
        <div class="title">
            <h3><span>LATEST</span></h3>
        </div>
        <div class="pix-col one-line pix-col-3 list-post">
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

            // latest
            $latest = modules::run('home/get_articles_latest');
            $i = 0;
            foreach ($latest as $result){
            $i++;

            ?>
            <div class="item item-latest mg-b20">
                <div class="wrap-image">
                   <?php if($this->lang->default_lang() == 'en') { ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" >
                    <?php } else{ ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>">   
                    <?php  } ?>
                        <img src="<?php echo get_resource_url(substr($result->image, 1)) ?>" alt="<?php echo $result->title ?>" class="image-post">
                    </a>
                </div>
                <div class="text-content">
                    <p class="hidden">
                    <?php if($this->lang->default_lang() == 'en') { ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="tag-a-title1 p-fs-20">
                    <?php } else{ ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="tag-a-title1 p-fs-20">   
                    <?php } ?>
                    <?php echo $result->title ?></a>
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
            <?php if($i%2 == 0) { ?>
            <div class="clearfix hidden-md hidden-lg"></div>
            <?php } ?>
           <?php if($i%3 == 0) { ?>
            <div class="clearfix hidden-xs hidden-sm"></div>
            <?php } ?>

            <?php } ?>
        </div>
        <img src="<?=get_resource_url('assets/images/banner_conten.png')?>" class="mg-b20 ad-single-image">

        <?php if(isset($this->session->userdata['userData'])){ ?>
        <?php
            $userDataSetting1 = modules::run('home/load_list_user_info', $this->session->userdata['userData']['id']);
            foreach ($userDataSetting1 as $value ){
            $country = $value->country;
            }
            // country
            $latest = modules::run('home/get_articles_country', $country);
           
        ?>
        <?php
        // No post: hide title
        if( count($latest) != '0' ) { ?> 
        <div class="title mg-b10">
            <h3><span>COUNTRY IF LOGGED IN</span></h3>
        </div>
        <?php }  ?>

        <div class="pix-col one-line pix-col-3 list-post">
          
        <?php $i = 0; foreach ($latest as $result){ $i++; ?>
            <div class="item item-latest mg-b20">
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
                    <p class="hidden">
                    <?php if($this->lang->default_lang() == 'en') { ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_en)  ?>" class="tag-a-title1 p-fs-20">
                    <?php } else{ ?>
                        <a href="<?php echo get_url_language('/blog/'. $result->slug_cn)  ?>" class="tag-a-title1 p-fs-20">   
                    <?php } ?>
                    <?php echo $result->title ?></a>
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

            <?php if($i%2 == 0) { ?>
            <div class="clearfix hidden-md hidden-lg"></div>
            <?php } ?>
           <?php if($i%3 == 0) { ?>
            <div class="clearfix hidden-xs hidden-sm"></div>
            <?php } ?>

            <?php }  ?>
            
        </div>
        <?php } //user-country   ?>
        <img src="<?=get_resource_url('assets/images/banner_conten1.png')?>" class="mg-b20 ad-single-image">
    </div>

   