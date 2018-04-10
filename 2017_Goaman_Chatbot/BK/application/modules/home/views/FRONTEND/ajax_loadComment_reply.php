<!-- ajax comment-reply -->
                <div class="clear-fix"></div>
                <?php if(isset($this->session->userdata['userData'])){
                $userDataSetting1 = modules::run('home/load_list_user_info', $this->session->userdata['userData']['id']);
                foreach ($userDataSetting1 as $value ){
                $username =  $value->username;
                $thumbnail = $value->thumbnail;
                $user_info_id = $value->id;
                }

                $id_artcles_item_lang = $articles_id;
                $id_comment_parents = $id_comment_parent;
                ?> 
                <div class="comment-write">
                    <form action="<?php echo PATH_URL ?><?php echo $this->lang->default_lang() ?>/comments-reply" method="POST" class="form-user-comment-reply" id="form-user-comment-reply-<?php echo  $id_comment_parents ?>">
                        <div class="mg-b10">
                            <img class="comment-img" src="<?=get_resource_url($thumbnail)?>" alt="<?php echo $username ?>" width="60" height="60" />
                            <input type="hidden" name='user_info_id' value="<?php echo $user_info_id ?>">
                            <input type="hidden" name='id_artcles_item_lang' value="<?php echo $id_artcles_item_lang ?>">
                            <input type="hidden" name='id_comment_parent' value="<?php echo $id_comment_parents ?>">

                            <textarea id="comment-box" name="comment" class="active" placeholder="Write Comment..." required value=""></textarea>
                        </div>
                        <div class="comment-action">
                            <input type="reset" name="reset" value="Cancel" />
                            <input type="submit" name="comment" value="Post"/>
                            <div class="clearfix"></div>
                           
                        </div>
                    </form>
                </div> 
                <?php } ?>
                <div class="clear-fix"></div>