(function($){
    $(document).ready(function(){
        my_debug=false;
        debug=function(t,o){
            if(my_debug){
                if(typeof window.console !='undefined'){
                    console.log(t,o);
                }
            }
        }
        $(document).on('change',"#my-vertical-limit",function(){
            var is=$("#my-vertical-limit").is(":checked");
            if(is){
                $("#my_option_my-vertical-count").show();
                $("#my_option_my-vertical-count-small").show();
            }else {
                $("#my_option_my-vertical-count").hide();
                $("#my_option_my-vertical-count-small").hide();

            }
        });
        $(document).on('change','#vertical',function(){
            var is=$("#vertical").is(":checked");
            if(is){
                $("#pbox2").show();
            }else {
                $("#pbox2").hide();
            }
        });
        var is12312344=$("#my-vertical-limit").is(":checked");
        if(is12312344){
            $("#my_option_my-vertical-count").show();
            $("#my_option_my-vertical-count-small").show();
        }else {
            $("#my_option_my-vertical-count").hide();
            $("#my_option_my-vertical-count-small").hide();
        }
        var is12345=$("#vertical").is(":checked");
        if(is12345){
            $("#pbox2").show();
        }else {
            $("#pbox2").hide();
        }
        function leftElementPosition (elementId, elementWidth ){

            var windowWidth = $('body').width();
            return (windowWidth- elementWidth)/2;


        }
        function topElementPosition (elementId, elementHeight){

            var windowHeight = $('body').height();
            return (windowHeight- elementHeight)/2;


        }
        pre_style=$("#style option:selected").val();
        debug("Pre style",pre_style);
        $("#style").change(function(){
            var s=$("#style option:selected").val();
            debug('Change style',{pre_style:pre_style,s:s});
            if(s!=pre_style){
                pre_style=s;
                if(typeof wp_my_timeline_styles[s]!='undefined'){
                    debug("Style options",wp_my_timeline_styles[s]);
                    var obj=wp_my_timeline_styles[s];
                    $.each(obj,function(i,v){
                        if(i=='shdow')i='shadow';
                        var id="#"+i;
                        var tag=$(id).prop('tagName');
                        if(typeof tag!='undefined'){
                            tag=tag.toLowerCase();
                            var classes=$(id).attr('class');
                            debug("Tag name",{tag:tag,i:i,v:v,classes:classes});
                            if(tag=='a'){
                                if($(id).hasClass("cw-image-upload")){
                                    if(v==''){
                                        $(id).attr('style','');
                                        var id_1=i+'-input';

                                        $("#"+id_1).val(v);
                                        debug("Background",{v:v,id_1:id_1});
                                        $(id).parents(".cw-image-select-holder").find(".remove-image").trigger('click');
                                    }else {
                                        var id_1=i+'-input';

                                        $("#"+id_1).val(v);
                                        debug("Background",{v:v,id_1:id_1});
                                        $(id).attr("style","background:url('"+v+"')");

                                    }
                                }
                            }
                            else if(tag=='input'){
                                if($(id).hasClass('wp-color-picker')){
                                    debug("Color picker",{i:i,v:v});
                                    $(id).val(v);
                                    $(id).trigger('change');
                                    $(id).wpColorPicker('color',v);
                                }else {
                                    var type=$(id).attr('type');
                                    debug("Input type",type);
                                    if(type=='text' || type=='hidden'){



                                        $(id).val(v);

                                        //}
                                    }else if(type=='checkbox'){
                                        if(v){
                                            debug('Set checbox ',v);
                                            $(id).prop('checked',true);
                                        }else {
                                            debug('Unset checbox',v);
                                            $(id).prop('checked',false);
                                        }
                                    }
                                }
                            }else if(tag=='select'){
                                debug('Set selecvted',v);
                                $(id).val(v);
                                //$(id).prop('selected',v);
                            }
                        }
                    });
                }

            }

        })

        // COLORPICKER
        var colPickerOn = false,
            colPickerShow = false,
            pluginUrl = $('#plugin-url').val(),
            imageurl = ajaxurl + '?action=ctimeline_image_get';

        $('.timeline_color_input').wpColorPicker();
        // colorpicker field
        $('.cw-color-picker').each(function(){
            var $this = $(this),
                id = $this.attr('rel');

            $this.farbtastic('#' + id);
            $this.click(function(){
                $this.show();
            });
            $('#' + id).click(function(){
                $('.cw-color-picker:visible').hide();
                $('#' + id + '-picker').show();
                colPickerOn = true;
                colPickerShow = true;
            });
            $this.click(function(){
                colPickerShow = true;
            });

        });
        $('body').click(function(){
            if(colPickerShow) colPickerShow = false;
            else {
                colPickerOn = false;
                $('.cw-color-picker:visible').hide();
            }
        });

        // IMAGE UPLOAD
        var thickboxId =  '',
            thickboxIdBCKGRND = '',
            thickboxIdMiniCard = '', thickItem = false;

        // backgorund images
        $('.cw-image-upload').click(function(e) {
            e.preventDefault();
            thickboxIdBCKGRND = '#' + $(this).attr('id');

            var file_frame_background, image_data_background;

            if ( undefined !== file_frame_background ) {

                file_frame_background.open();
                return;

            }

            file_frame_background = wp.media.frames.file_frame = wp.media({
                //Title of media manager frame
                title: "Select or upload custom image",
                library: {
                    type: 'image'
                },
                button: {
                    //Button text
                    text: "Insert image"
                },
                multiple: false
            });
            // Get selection
            file_frame_background.on( 'select', function() {

                image_data_background = file_frame_background.state().get( 'selection' ).first().toJSON();

                // Fill hidden input and Create preview
                $(thickboxIdBCKGRND).css('background', 'url('+ image_data_background.url +')').prev().attr('value', image_data_background.url);

            });

            // Now display the actual file_frame
            file_frame_background.open();

			/*formfield = $(thickboxId + '-input').attr('name');
			 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
			 return false;*/
        });

        function tb_remove_altered() {

            $(document).find('.clicked-overlay').fadeIn(500);
            $(document).find('.clicked-card').animate({left:elementLeftPosition, top:elementTopPosition, opacity:1},500);
            $(document).find('.TBct_card_overlay').removeClass('clicked-overlay');
            $(document).find('.TBct_card_window').removeClass('clicked-card');
			/*jQuery(document).unbind('.thickbox');
			 return false;*/
        }
        window.send_to_editor = function(html) {
            if(window.console){
                console.log('html',html);
            }
            var img_pos=html.indexOf('<img');
            if (img_pos>0) html=html.substring(img_pos);
            img_pos=html.indexOf('>');
            if (img_pos>0) html=html.substring(0, img_pos+1);
            while (html.indexOf('\\"')>-1) html=html.replace('\\"','"');
            var $jhtml=$(html);
            var imgurl = $jhtml.attr('src');

            $(thickboxId + '-input').val(imgurl);
            console.log($(thickboxId + '-input').val(imgurl));
            if (thickItem) {
                thickItem = false;
				/*$(thickboxIdMiniCard).attr('src', imageurl + '&src=' + imgurl + '&w=258&h=130');

				 $(thickboxId).attr('src', imageurl + '&src=' + imgurl + '&w=500&h=500');*/
            }
            else {
                $(thickboxId).css('background', 'url('+imgurl+') repeat');
            }
            tb_remove_altered();
        }

        $('.remove-image').click(function(e){
            e.preventDefault();
            $(this).parent().parent().find('input').val('');
            $(this).parent().parent().find('.cw-image-upload').css('background-image', 'url(' + pluginUrl + '/images/no_image_background.jpg)');
        });

        // CATEGORIES
        if ($('#cat-type').val() == 'categories') {
            $('.cat-display').show();
            $('.data_id').css('color', 'gray');
        }
        else {
            $('.category_id').css('color', 'gray');
        }
        $('#cat-type').change(function(){
            if ($(this).val() == 'months') {
                $('.cat-display').hide();
                $('.category_id').css('color', 'gray');
                $('.data_id').css('color', '');
                alert('Check the Date field of your items before you save!');
                $('#my_option_num-of-years').hide()
            }
            else if($(this).val()=='categories'){
                $('.cat-display').show();
                $('.data_id').css('color', 'gray');
                $('.category_id').css('color', '');
                alert('Check the Category field of your items, and pick categories you want to show before you save!');
                $('#my_option_num-of-years').hide()
            }
            else {
                $('#my_option_num-of-years').show();
            }
        });
        if($('#cat-type').val() == 'years') {
            $('#my_option_num-of-years').show();
        }

        $('#cat-check-all').click(function(){
            $('.cat-name').attr('checked', true);
        });

        $('#cat-uncheck-all').click(function(){
            $('.cat-name').attr('checked', false);
        });


        // SORTABLE

        $('#timeline-sortable').sortable({
                placeholder: "tsort-placeholder",
                items:">li",
                handle: ".tsort-header",
                refreshPositions: true,
                forcePlaceholderSize: true,
                tolerance: 'pointer',
                scroll:true
            }
        );
//not working on mozilla firefox!!!
		/*$('#timeline-sortable').disableSelection();*/
		/*$('#timeline-sortable').draggable({
		 //placeholder: "tsort-placeholder"
		 revert:true
		 });*/
        $('.meta-box-sortables').sortable("disable");

        //---------------------------------------------
        // Ctimeline Sortable Actions
        //---------------------------------------------

        // add
        $('#tsort-add-new').click(function(e){
            e.preventDefault();
            ctimelineAddNew(pluginUrl);

        });
        // open item

       // if
        var openCardLeftPosition = $('.TBct_card_window').width();
        var openCardTopPosition = $('.TBct_card_window').height();
       // $('.TBct_card_window').css({width:'52vw', height:'70h'});
        var elementLeftPosition = leftElementPosition(".TBct_card_window", openCardLeftPosition);
        var elementTopPosition = topElementPosition(".TBct_card_window", openCardTopPosition);
        var windowHeight = topElementPosition(".TBct_card_window", openCardTopPosition)+openCardTopPosition+100;
        $('.TBct_card_window').css({left:elementLeftPosition, top:windowHeight});

        $(document).on('click', '.tsort-plus', function(){

            var imgSrc= $(this).parents('li').find('.tsort-image-div img').attr('src');

            $('body').css({'overflow-y': 'hidden', 'position':'relative', 'height':'100%'});

            $('.TBct_card_overlay').hide();
            var openCardLeftPosition = $('.TBct_card_window').width();
            var openCardTopPosition = $('.TBct_card_window').height();

            var elementLeftPosition = leftElementPosition(".TBct_card_window", openCardLeftPosition);
            var elementTopPosition = topElementPosition(".TBct_card_window", openCardTopPosition);
            var windowHeight = topElementPosition(".TBct_card_window", openCardTopPosition)+openCardTopPosition;
            $('.TBct_card_window').css({left:elementLeftPosition, top:windowHeight});

            $(this).parent().parent().find('.TBct_card_window').css('z-index', 1000000);
            $(this).parent().parent().find('.TBct_card_overlay').fadeIn(500);
            $(this).parent().parent().find('.TBct_card_window').animate({left:elementLeftPosition, top:elementTopPosition, opacity: 1},500);

            $('.tsort-item').show();
            $('.tsort-itemopen').hide();
            $('.item-options').trigger('click');

            $('#timeline-sortable').sortable('disable');
        });

        $(document).on('click','.TBct_cardCloseWindowButton', function(e) {

            e.preventDefault();

            var openCardLeftPosition = $('.TBct_card_window').width();
            var openCardTopPosition = $('.TBct_card_window').height();

            var elementLeftPosition = leftElementPosition(".TBct_card_window", openCardLeftPosition);
            var elementTopPosition = topElementPosition(".TBct_card_window", openCardTopPosition);
            var windowHeight = topElementPosition(".TBct_card_window", openCardTopPosition)+openCardTopPosition;
            $('body').css({'overflow-y': 'scroll', 'position':'inherit', 'height':'auto'});
            $(this).parent().parent().prev().fadeOut(300);

            $(this).parent().parent().animate({left:elementLeftPosition, top:windowHeight, opacity:0},300);


            $('#timeline-sortable').sortable('auto');
        });

        // delete
        $(document).on('click', '.tsort-delete', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
        });

        $(document).on('click', '.tsort-remove', function(e){
            e.preventDefault();
            $(this).parent().find('input').val('');
			/*$(this).parent().parent().find('img').attr('src', pluginUrl + '/images/no_image.jpg');*/
            $(this).parents('li').find('.tsort-image-div img').attr('src', pluginUrl + '/images/no_image_small.jpg');
            $(this).parents('li').find('.tsort-image img').attr('src', pluginUrl + '/images/no_image_large.jpg');
        });
        $(document).on('click', '.tsort-remove-open', function(e){
            e.preventDefault();
            $(this).parent().find('input').val('');
			/*$(this).parent().parent().find('img').attr('src', pluginUrl + '/images/no_image.jpg');*/
            $(this).parent().parent().find('img').attr('src', pluginUrl + '/images/no_image_large.jpg');

        });

        $(document).on('click', '.tsort-copy-item', function() {

            var dataCountCopy = $(this).parents('li').data('copy-counter');

            $(this).parents('li').addClass('copy-clicked');

            var parentCopyId = $(this).parents('li').find('.item-header').text().substring(0, 7).slice(-2);

            var copyNumber = 'copy-number-' + parentCopyId;
            $(this).parents('li').addClass(copyNumber);

            var copyImage = $(this).parents('li').find('.tsort-image-div img').attr('src');
            var copyDateInfo = $(this).parents('li').find('.date-info').text();
            var copyPostInfo = $(this).parents('li').find('.post-info').text();
            var copyTextTitle = $(this).parents('li').find('.tsort-text-title').text();
            var copyItemTitle = $(this).parents('li').find('.item-info-wrapper').find('.tsort-title').val();
            var copyItemExcerpt = $(this).parents('li').find('.tsort-contarea').val();
            var copyItemPrettyPhotoUrl = $(this).parents('li').find('.tsort-prettyPhoto').val();
            var copyItemButtonUrl = $(this).parents('li').find('.tsort-link').val();
            var copyItemDate = $(this).parents('li').find('.data_id').val();
            var copyItemCategory = $(this).parents('li').find('.category_id').val();
            var copyTitleOfTimeline = $(this).parents('li').find('.title-optional').val();
            var copyItemImage = $(this).parents('li').find('.tsort-image img').attr('src');
            var copyItemImageHidden = $(this).parents('li').find('.image-option-change input').val();

            var copyOpentItemTitle = $(this).parents('li').find('.itemopen-info-wrapper').find('.tsort-title').val();
            var copyOpentItemExcerpt = $(this).parents('li').find('.tsort-contarea-open').val();
            var copyOpentItemPrettyPhoto = $(this).parents('li').find('.itemopen-info-wrapper').find('.tsort-prettyPhoto').val();
            var copyOpentItemDisableScroll = $(this).parents('li').find('.disable-scroll').prop('checked');
            var copyOpentItemImage = $(this).parents('li').find('.tsort-image-open img').attr('src');
            var copyOpenItemImageHidden = $(this).parents('li').find('.image-open-option-change input').val();

            $('#tsort-add-new').trigger('click');
            setTimeout(300);
            $('#TBct_timelineNew').trigger('click');

            $(this).parents('ul').children().last().find('.tsort-header .item-header').text('ITEM ' + parentCopyId + ' - Copy (' + dataCountCopy + ')');
            $(this).parents('ul').children().last().find('.edit-header-title').text('EDIT ITEM ' + parentCopyId + ' - Copy (' + dataCountCopy + ')');

            dataCountCopy++;

			/*$(this).parents('li').data('copy-counter', dataCountCopy);*/

            $(this).parents('ul').children().last().find('.tsort-image-div img').attr('src', copyImage);
            $(this).parents('ul').children().last().find('.date-info').text(copyDateInfo);
            $(this).parents('ul').children().last().find('.post-info').text(copyPostInfo);
            $(this).parents('ul').children().last().find('.tsort-text-title').text(copyTextTitle);

            $(this).parents('ul').children().last().find('.item-info-wrapper').find('.tsort-title').val(copyItemTitle);
            $(this).parents('ul').children().last().find('.tsort-contarea').val(copyItemExcerpt);
            $(this).parents('ul').children().last().find('.tsort-prettyPhoto').val(copyItemPrettyPhotoUrl);
            $(this).parents('ul').children().last().find('.tsort-link').val(copyItemButtonUrl);
            $(this).parents('ul').children().last().find('.data_id').val(copyItemDate);
            $(this).parents('ul').children().last().find('.category_id').val(copyItemCategory);
            $(this).parents('ul').children().last().find('.title-optional').val(copyTitleOfTimeline);
            $(this).parents('ul').children().last().find('.tsort-image img').attr('src', copyItemImage);
            $(this).parents('ul').children().last().find('.image-option-change input').val(copyItemImageHidden);

            $(this).parents('ul').children().last().find('.itemopen-info-wrapper').find('.tsort-title').val(copyOpentItemTitle);
            $(this).parents('ul').children().last().find('.tsort-contarea-open').val(copyOpentItemExcerpt);
            $(this).parents('ul').children().last().find('.itemopen-info-wrapper').find('.tsort-prettyPhoto').val(copyOpentItemPrettyPhoto);
            $(this).parents('ul').children().last().find('.disable-scroll').prop('checked', copyOpentItemDisableScroll);
            $(this).parents('ul').children().last().find('.tsort-image-open img').attr('src', copyOpentItemImage);
            $(this).parents('ul').children().last().find('.image-open-option-change input').val(copyOpenItemImageHidden);

			/*$(this).parents('ul').children().last().data('copy-counter', dataCountCopy);*/

            $(this).parents('ul').children().last().addClass(copyNumber);

            $('#timeline-sortable li.' + copyNumber).data('copy-counter', dataCountCopy);



        });

        // item images
        var imageItemSrc = '';
        $(document).on('click', '.tsort-change', function(e) {

            e.preventDefault();

            thickboxId = '#' + $(this).parent().parent().find('img').attr('id');
            thickboxIdMiniCard = '#' + $(this).parents('li').find('.tsort-image-div').find('img').attr('id');
            thickItem = true;


            // Keept this for possible compatibility as may be needed for some other code

            var file_frame, image_data, image_ids = '';

            if ( undefined !== file_frame ) {

                file_frame.open();
                return;

            }

            file_frame = wp.media.frames.file_frame = wp.media({
                //Title of media manager frame
                title: "Select or upload custom image",
                library: {
                    type: 'image'
                },
                button: {
                    //Button text
                    text: "Insert image"
                },
                multiple: true
            });
            // Get selection
            file_frame.on( 'select', function() {

                var length = file_frame.state().get("selection").length;

                var images = file_frame.state().get("selection").models;

                for(var iii = 1; iii < length; iii++)
                {

                    image_ids+=images[iii].id + ',';

                }
                image_ids = image_ids.substring(0, image_ids.length-1);


                // Fill hidden input and Create preview

                $(thickboxId).attr("src", images[0].changed.url).parent().find('.image-option-change :nth-child(2)').attr('value', images[0].changed.url);
                $(thickboxId).parent().find('.image-option-change :nth-child(3)').attr('value', image_ids);
                $(thickboxIdMiniCard).attr("src", images[0].changed.url);

            });


            // Now display the actual file_frame
            file_frame.open();



        });
        $(document).on('click', '.tsort-change-open', function(e) {
            e.preventDefault();
            thickboxId = '#' + $(this).parent().parent().find('img').attr('id');
            thickItem = true;

            // Keept this for possible compatibility as may be needed for some other code

            var file_frame, image_data;

            if ( undefined !== file_frame ) {

                file_frame.open();
                return;

            }

            file_frame = wp.media.frames.file_frame = wp.media({
                //Title of media manager frame
                title: "Select or upload custom image",
                library: {
                    type: 'image'
                },
                button: {
                    //Button text
                    text: "Insert image"
                },
                multiple: true
            });
            // Get selection
            file_frame.on( 'select', function() {

                image_data = file_frame.state().get( 'selection' ).first().toJSON();

                // Fill hidden input and Create preview
                $(thickboxId).attr("src", image_data.url).parent().find('input').attr('value', image_data.url);

            });

            // Now display the actual file_frame
            file_frame.open();



			/*    formfield = $(thickboxId + '-input').attr('name');
			 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');

			 return false;*/
        });
        // item images
        $(document).on('click', '.tsort-start-item', function(e) {
            $('.tsort-start-item').attr('checked', false);
            $(this).attr('checked', 'checked');
            $('.check-back-color').css('background-color','inherit');
            $(this).parent().css('background-color','#F1592B');
            $('.starting-card').hide();
            $(this).parents('li').find('.starting-card').show();
        });

        //shindiri studio
        $(document).on('keyup', '.item-info-wrapper .tsort-title', function(e) {
            $(this).parents('table').parent().parent().prev().prev().html($(this).val());
            $(this).parents('li').find('.tsort-info').find('.post-info').html($(this).val());
        });
        $(document).on('keyup', '.data_id', function(e) {

            $(this).parents('li').find('.tsort-info').find('.date-info').html($(this).val());
        });

        //shindiri studio
        $(document).on('click','.item-options', function(e){
            $('.tsort-item').show();
            $('.tsort-itemopen').hide();
            $(this).css('color','#FFFFFF !important');
            $(this).css('opacity','1');
            $('.active-item-options').css('color','#ffffff !important');
            $('.active-item-options').css('opacity','0.5');
        });
        $(document).on('click','.active-item-options', function(e){
            $('.tsort-item').hide();
            $('.tsort-itemopen').show();
            $(this).css('color', '#FFFFFF !important');
            $(this).css('opacity','1');
            $('.item-options').css('color','#ffffff !important');
            $('.item-options').css('opacity','0.5');
        });

        // ----------------------------------------

        // AJAX subbmit
        $('#save-timeline').click(function(e){
            e.preventDefault();
            var serr = $('#post_form').serialize();

            serr = serr.replace(/=/g, '::');
            serr = serr.replace(/&/g, '||');
			/*$('#save-loader').show();*/
            $.ajax({
                type:'POST',
                url: 'admin-ajax.php',
                data:'action=ctimeline_save&data=' + serr,
                success: function(response) {
                    $('#timeline_id').val(response);

					/*$('#save-loader').hide();*/
                }
            });
        });

        $('#preview-timeline').click(function(e){
            e.preventDefault();

            var html = '<div id="TBct_overlay" class="TBct_overlayBG"></div>';
            html += '<div id="TBct_window" style="width:250px; margin-left:-75px; height:80px; margin-top:-40px; visibility: visible; letter-spacing:0.1px; overflow: hidden">';
            html += '<div id="TBct_title"><div id="TBct_ajaxWindowTitle">PREVIEW</div>';
            html += '<div id="TBct_closeAjaxWindow"><a id="TBct_closeWindowButton"  class="dashicons dashicons-editor-help" title="Close" href="#"></a></div>';
            html += '</div>';
            html += '<div id="timelineHolder" style="margin:0 auto;">';
            html += '<img style="margin:20px 20px;" id="TBct_loader" src="'+pluginUrl+'/images/loadingAnimation.gif" />';
            html += '</div>';
            html += '<div style="clear:both;"></div></div>';
            html += '</div>';
            $('body').append(html);
            var postForm = $('#post_form').serialize();
            postForm = postForm.replace(/=/g, '::');
            postForm = postForm.replace(/&/g, '||');

            $.ajax({
                type:'POST',
                url: 'admin-ajax.php',
                data:'action=ctimeline_preview&data=' + postForm,
                success: function(response) {
                    $('#TBct_loader').hide();
                    $('#TBct_window').animate({width: '100%', marginLeft:'-50%', marginTop: '-250px', height: '500px'}, 500, function(){
                        $('#timelineHolder').html(response);
                        $('#timelineHolder').css({'overflow-y':'scroll', 'position': 'relative', 'width':'100%', 'height':'470px'});
                        if($('#read-more').val() == 'whole-item') {
                            var $read_more = '.item';
                            var $swipeOn = false;
                        }
                        else if ($('#read-more').val() == 'button') {
                            var $read_more = '.read_more';
                            var $swipeOn = true;
                        }
                        else {
                            var $read_more = '.none';
                            var $swipeOn = true;
                        }

                        var startItem = $('#ctimeline-preview-start-item').val();
                        var vertical=$("#vertical").is(":checked");

                        var $cats = [];
                        var $numOfItems = [];
                        var numGet = parseInt($('#number-of-posts').val());
                        $('input[name|="cat-name"]:checked').each(function(){
                            $cats.push($(this).val());
                            $numOfItems.push(numGet);

                        });


                        var my_id_str=$("#timelineHolder").find(".timeline").attr('id');
                        var my_id=my_id_str.replace('tl','');
                        var my_is_years_val=$("#cat-type option:selected").val();
                        var my_is_years=0;
                        if(my_is_years_val=='years')my_is_years=1;
                        var jsonOptions = {
                            my_id:my_id,
                            my_debug:0,
                            my_del:130,
                            my_trigger_width:800,
                            my_is_years:my_is_years,
                            my_sizes:{
                                card:{
                                    item_width:parseInt($("#item-width").val()),
                                    item_height:parseInt($("#item-height").val()),
                                    margin:parseInt($('#item-margin').val())
                                },
                                active:{
                                    item_width:parseInt($("#item-open-width").val()),
                                    item_height:parseInt($("#item-open-height").val()),
                                    image_height:parseInt($('#item-open-image-height').val())
                                }
                            },
                            itemMargin : parseInt($('#item-margin').val()),
                            swipeOn : $swipeOn,
                            scrollSpeed : parseInt($('#scroll-speed').val()),
                            easing : $('#easing').val(),
                            openTriggerClass : $read_more,
                            startItem : startItem,
                            yearsOn : ($('#years-on:checked').length > 0  ),
                            hideTimeline : ($('#hide-line:checked').length > 0 ),
                            hideControles : ($('#hide-nav:checked').length > 0 )
                        }

                        if (typeof $cats[0] != 'undefined' && $('#cat-type').val() == 'categories') {
                            jsonOptions.yearsOn = false;
                            jsonOptions.categories = $cats;
                            jsonOptions.numberOfSegments = $numOfItems;
                        }
                        $("#timelineHolder .scrollable-content").mCustomScrollbar();
                        if(vertical){
                            var shadow=$("#shadow option:selected").val();
                            var my_p_123=10;
                            var my_p_123_1=5;
                            var my_p_123_2=5;
                            if( shadow== 'on-hover') {
                                my_p_123=15;
                                my_p_123_1=52;
                                my_p_123_2=30;
                            }else {
                                my_p_123=5;
                                if(shadow!='hide')
                                    my_p_123=10;
                                my_p_123_1=my_p_123;
                                my_p_123_2=my_p_123;
                            }
                            var jsonOptions1={};
                            var jsonOptions2={};
                            jsonOptions2={
                                vertical:1,
                                myMarginLeftRight:20,
                                myShow:$("#my-vertical-count").val(),
                                myShowSmall:$("#my-vertical-count-small").val(),
                                myVerticalPadding:my_p_123,
                                myVerticalPadding1:my_p_123_1,
                                myVerticalPadding2:my_p_123_2,
                            };
                            jsonOptions1=$.extend(jsonOptions,jsonOptions2);
                            if($('#cat-type').val()=='mothhs'){
                                if(my_ctimeline_has_wpml==1){
                                    if(my_ctimeline_lang!='en'){
                                        jsonOptions2['cats']=my_ctimeline_months;
                                    }
                                }

                            }
                            $('#timelineHolder .timeline').VerticalTimeline(jsonOptions1);
                        }else $('#timelineHolder .timeline').timeline(jsonOptions);
                        $('#preview-loader').hide();
						/*$("#timelineHolder").find(".item_open").each(function(i,v){
						 if(window.console){
						 console.log('Update height');
						 }
						 var scrCnt = $(v).find(".scrollable-content");
						 scrCnt.height(scrCnt.parent().height() - scrCnt.parent().children("h2").height() - parseInt(scrCnt.parent().children("h2").css("margin-bottom")));
						 //scrCnt.mCustomScrollbar({theme:"light-thin"});
						 srcCnt.mCustomScrollbar('update');
						 });*/
                        $('#TBct_closeWindowButton').click(function(ev){
                            ev.preventDefault();
                            $('.timeline').timeline('destroy');
                            $('#TBct_overlay').remove();
                            $('#TBct_window').remove();
                        });
                    });

                }
            });
        });



    });


    function ctimelineSortableActions(pluginUrl) {




    }


    function ctimelineAddNew(pluginUrl) {
        var searches = new Array();
        searches[''] = '';
        var html = '<div id="TBct_overlay" class="TBct_overlayBG"></div>';
        html += '<div id="TBct_window" style="width:720px; height:301px; visibility: visible;">';
        html += '<div id="TBct_title"><div id="TBct_ajaxWindowTitle">ADD NEW TIMELINE ITEM</div>'
        html += '<div id="TBct_closeAjaxWindow"><a id="TBct_closeWindowButton" class="dashicons dashicons-editor-help"title="Close" href="#"></a></div>';
        html += '</div>';
        html += '<div class ="add-item-div" style="width:33.3%; float:left; height:253px; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; margin-top:0px;">'
        html += '<h2 class ="add_item-header">ADD SINGLE POST</h2>'
        html += '<p class="add_explain">Find a specific post from <br>your backend and add it<br>to your timeline</p>'
        html += '<a id="TBct_timelinePost" class = "add_post" value = "post">ADD ITEM +</a>'
        html +=	'</div>';
        html += '<div class="add-item-div" style="width:33.3%; float:left; height:253px; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; margin-top:0px;">'
        html += '<h2 class ="add_item-header">ADD ENTIRE CATEGORY</h2>'
        html += '<p class="add_explain">Add an antire category of<br>posts as cards into your<br>timeline</p>'
        html += '<a id="TBct_timelineCategory" class = "add_post" value = "category">ADD ITEM +</a>'
        html +=	'</div>';
        html += '<div class="add-item-div" style="width:33.1%; float:left; height:253px; border-bottom: 1px solid #ccc; margin-top:0px;">'
        html += '<h2 class ="add_item-header">ADD BLANK CARD</h2>'
        html += '<p class="add_explain">Add an empty card to your<br>timeline and add custom<br>content to it</p>'
        html += '<a id="TBct_timelineNew" class = "add_post" value = "new">ADD ITEM +</a>'
        html +=	'</div>';
        html += '<span style="display: block; clear: both;"></span>';
        html += '<!--<a href="#" id="TBct_timelineSubmit" style="margin:10px;" class="button button-highlighted alignright">Add</a><img id="TBct_timelineSubmitLoader" class="alignright" src="'+pluginUrl+'/images/ajax-loader.gif" />--><!--<select id="TBct_timelineSelect" style="margin:10px; width:150px;"><option value="new">Add New</option><option value="post">From Post</option><option value="category">Whole Category</option></select>-->';
        html += '<div id="TBct_timelineFromPost" style="padding:10px 10px 0px; display:none;"><!--<label for="timelineFromPost">Search posts:</label>--> <img id="timelineFromPostLoader" style="display: none; position:fixed; float:right; top:472px; right: 625px; z-index: 1;" src="'+pluginUrl+'/images/ajax-loader.gif" /><span id="timelineFromPostHolder"><input id="timelineFromPost" name="timelineFromPost" style="width:325px;"  placeholder="Search posts here..."  /><a href="#" id="TBct_timelineSubmit" style="margin:10px;" class="button button-highlighted alignright">Add</a><img id="TBct_timelineSubmitLoader" class="alignright" src="'+pluginUrl+'/images/ajax-loader.gif" /><ul style="display:none;" id="timelineFromPostComplete"></ul></span>';

        html += '</div>';
        html += '<div id="TBct_timelineWholeCategory" style="padding:16px 10px 10px 10px;; border-top:1px solid gray; display:none;">';
        html += '<span class="TBct_timelineCategorySelectSpan">CHOOSE YOUR CATEGORY</span> <ul id="TBct_timelineCategorySelect" name="TBct_timelineCategorySelect">'
        var allCats = $('#categories-hidden').val();
        if(allCats) {
            allCats = allCats.split('||');
        }
        else {
            allCats = new Array();
        }
        for (cate in allCats) {
            html += '<li><span class="TBct_categoryName">'+allCats[cate]+'</span><a href="'+allCats[cate]+'" class="add-category-link">Add Category</a></li>';
        }

        html += '</ul>';
        html += '<a href="#" id="TBct_timelineSubmit" style="margin:10px;" class="button button-highlighted alignright">Add</a><img id="TBct_timelineSubmitLoader" class="alignright" src="'+pluginUrl+'/images/ajax-loader.gif" />';
        html += '</div>';
        html += '</div>';
        $('body').prepend(html);

		/*shindiri studio*/
        //center element in browser window: these two functions calculate left and top position of selected element
        function leftElementPosition (elementId, elementWidth ){

            var windowWidth = $('body').width();
            return (windowWidth- elementWidth)/2;


        }
        function topElementPosition (elementId, elementHeight){

            var windowHeight = $('body').height();
            return (windowHeight- elementHeight)/2;


        }
        var elementLeftPosition = leftElementPosition("#TBct_window", 720);
        var elementTopPosition = topElementPosition("#TBct_window", 301);
        $("#TBct_window").css({left:elementLeftPosition, top:elementTopPosition});


		/*shindiri studio*/

        $('#TBct_closeWindowButton').click(function(e){
            e.preventDefault();
            $('#TBct_overlay').remove();
            $('#TBct_window').remove();
        });
        $('#TBct_timelinePost').click(function(){

            $(this).addClass("visited");
            $('#TBct_timelineCategory').removeClass('visited');
            $('#TBct_timelineNew').removeClass('visited');
            $('#TBct_window').css({marginTop:'-150px', height:'650px'});
            $('.add-item-div').css('marginTop', '1px');
            $('#TBct_timelineFromPost').show();
            $('#TBct_timelineWholeCategory').hide();
            //setTimeout(function(){
            $('#TBct_timelineCategorySelect').mCustomScrollbar('destroy');
            //});


        });

        $('#TBct_timelineCategory').click(function(){

            $(this).addClass("visited");
            $('#TBct_timelinePost').removeClass('visited');
            $('#TBct_timelineNew').removeClass('visited');
            $('#TBct_window').css({marginTop:'-150px', height:'650px'});
            $('#add-item-div').css('marginTop', '1px');
            $('#TBct_timelineWholeCategory').show();
            $('#TBct_timelineFromPost').hide();
            setTimeout(function(){
                $('#TBct_timelineCategorySelect').mCustomScrollbar({
                    theme:"dark"
                });
            }, 10);

        });
        $('#TBct_timelineNew').click(function(){

            $(this).addClass("visited");
            $('#TBct_timelineCategory').removeClass('visited');
            $('#TBct_timelinePost').removeClass('visited');
            $('#TBct_window').css({marginTop:'-35px', height:'70px'});
            $('#TBct_timelineFromPost').hide();
            $('#TBct_timelineWholeCategory').hide();

        });
        $('#TBct_timelineNew').click(function(e){
            e.preventDefault();
            var timelineItem = '';
			/*if ($('#TBct_timelineSelect').val() == 'new') {*/
            timelineItem = timelineGenerateItem();
            $('#timeline-sortable').append(timelineItem);
			/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
			 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
            $('#TBct_overlay').remove();
            $('#TBct_window').remove();

            var offsetUl = $('#timeline-sortable').offset();

            if($('#timeline-sortable').height() + offsetUl.top > $(window).height()) {
            	$(document).scrollTop($('#timeline-sortable').height() + offsetUl.top - $(window).height());
			}

            if(!$('#timeline-sortable').find('li').hasClass('copy-clicked')) {
                $('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');
            }
            $('#timeline-sortable').find('li').removeClass('copy-clicked');

        });

        $('#TBct_timelineSubmit').click(function(e){
            e.preventDefault();
            var timelineItem = '';
            if ($('#TBct_timelineSelect').val() == 'new') {
                timelineItem = timelineGenerateItem();
                $('#timeline-sortable').append(timelineItem);
				/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
				 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                $('#TBct_overlay').remove();
                $('#TBct_window').remove();
            }
            else if ($('#TBct_timelineSelect').val() == 'category') {
                $('#TBct_timelineSubmitLoader').show();
                cat_name=$('#TBct_timelineCategorySelect').val();
                if($("#my_timeline_cats[value='"+cat_name+"']").length==0){
                    debug("Add new cat",cat_name);
                    var html='<input type="hidden" name="my_timeline_cats[]" id="my_timeline_cats" value="'+cat_name+'"/>';
                    debug("Html",html);
                    $("#post_form").prepend(html);
                }else {
                    debug('Cat exists',cat_name);
                }
                $.ajax({
                    url:"admin-ajax.php",
                    type:"POST",
                    data:'action=ctimeline_post_category_get&cat_name='+$('#TBct_timelineCategorySelect').val(),

                    success:function(results){
                        var resultsArray = results.split('||');
                        var ii = 0;
                        while (typeof resultsArray[0+ii] != 'undefined') {

                            var properties = {
                                'title' : resultsArray[0+ii],
                                'dataId' : resultsArray[1+ii],
                                'categoryId' : resultsArray[2+ii],
                                'itemContent' : resultsArray[3+ii],
                                'itemImage' : resultsArray[4+ii],
                                'itemPrettyPhoto' : resultsArray[4+ii],
                                'itemOpenPrettyPhoto' : resultsArray[4+ii],
                                'itemOpenContent' : resultsArray[5+ii],
                                'myItemPostId':resultsArray[6+ii]
                            }
                            timelineItem = timelineGenerateItem(properties);
                            $('#timeline-sortable').append(timelineItem);
                            ii +=7;
                        }
						/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
						 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                        $('#TBct_overlay').remove();
                        $('#TBct_window').remove();
                        var offsetUl = $('#timeline-sortable').offset();

                        if($('#timeline-sortable').height() + offsetUl.top > $(window).height()) {
                            $(document).scrollTop($('#timeline-sortable').height() + offsetUl.top - $(window).height());
                        }
                        /*$(window).scrollTop($(document).height());*/
                        $('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');
                    }
                });
            }

            else if($('#timelineFromPostComplete li a.active').length < 1) {
                alert('You have to select post you want to add, or choose add new!');
            }
            else {
                var postId = $('#timelineFromPostComplete li a.active').attr('href');
                $('#TBct_timelineSubmitLoader').show();
                $.ajax({
                    url:"admin-ajax.php",
                    type:"POST",
                    data:'action=ctimeline_post_get&post_id='+postId,

                    success:function(results){
                        var resultsArray = results.split('||');
                        var properties = {
                            'title' : resultsArray[0],
                            'dataId' : resultsArray[1],
                            'categoryId' : resultsArray[2],
                            'itemContent' : resultsArray[3],
                            'itemImage' : resultsArray[4],
                            'itemPrettyPhoto' : resultsArray[4],
                            'itemOpenPrettyPhoto' : resultsArray[4],
                            'itemOpenContent' : resultsArray[5],
                            'myItemPostId':resultsArray[6]
                        }
                        console.log(properties);
                        timelineItem = timelineGenerateItem(properties);
                        $('#timeline-sortable').append(timelineItem);
						/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
						 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                        $('#TBct_overlay').remove();
                        $('#TBct_window').remove();
                        var offsetUl = $('#timeline-sortable').offset();

                        if($('#timeline-sortable').height() + offsetUl.top > $(window).height()) {
                            $(document).scrollTop($('#timeline-sortable').height() + offsetUl.top - $(window).height());
                        }
                        /*$(window).scrollTop($(document).height());*/
                        $('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');
                    }
                });
            }
        })

        $('#timelineFromPost').keyup(function(e){
            var icall = null,
                qinput = $('#timelineFromPost').val();
			/*$('#timelineFromPostLoader').css({'float':'right', 'margin-top': '18px', 'right':'25px', 'z-index': '1'});*/
            $('#timelineFromPostLoader').show();
            if(qinput in searches) {
                if(icall != null) icall.abort();
                $('#timelineFromPostComplete').html(searches[qinput]).show();
                $('#timelineFromPostComplete').mCustomScrollbar({
                    theme:"dark"
                });

                $('#timelineFromPostComplete li a').click(function(e){
                    e.preventDefault();
                    var postId = $(this).attr('href');
                    $('#TBct_timelineSubmitLoader').show();
                    $.ajax({
                        url:"admin-ajax.php",
                        type:"POST",
                        data:'action=ctimeline_post_get&post_id='+postId,

                        success:function(results){
                            var resultsArray = results.split('||');
                            var properties = {
                                'title' : resultsArray[0],
                                'dataId' : resultsArray[1],
                                'categoryId' : resultsArray[2],
                                'itemContent' : resultsArray[3],
                                'itemImage' : resultsArray[4],
                                'itemPrettyPhoto' : resultsArray[4],
                                'itemOpenPrettyPhoto' : resultsArray[4],
                                'itemOpenContent' : resultsArray[5],
                                'myItemPostId':resultsArray[6]
                            }
                            timelineItem = timelineGenerateItem(properties);
                            $('#timeline-sortable').append(timelineItem);
							/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
							 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                            $('#TBct_overlay').remove();
                            $('#TBct_window').remove();
                            $(window).scrollTop($(document).height());
                            $('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');
                        }
                    });
                });
                $('#timelineFromPostLoader').hide();
            }
            else {
				/*$('#timelineFromPostLoader').css({'top':'112x', 'right':'-342px'});
				 $('#timelineFromPostLoader').show();*/
                icall = $.ajax({
                    url:"admin-ajax.php",
                    type:"POST",
                    data:'action=ctimeline_post_search&query='+qinput,

                    success:function(results){
                        $('#timelineFromPostComplete').html(results).show();
                        searches[qinput] = results
                        $('#timelineFromPostComplete').mCustomScrollbar({
                            theme:"dark"
                        });

                        $('#timelineFromPostComplete li a').click(function(e){
                            e.preventDefault();
                            var postId = $(this).attr('href');
                            $('#TBct_timelineSubmitLoader').show();
                            $.ajax({
                                url:"admin-ajax.php",
                                type:"POST",
                                data:'action=ctimeline_post_get&post_id='+postId,

                                success:function(results){
                                    var resultsArray = results.split('||');
                                    var properties = {
                                        'title' : resultsArray[0],
                                        'dataId' : resultsArray[1],
                                        'categoryId' : resultsArray[2],
                                        'itemContent' : resultsArray[3],
                                        'itemImage' : resultsArray[4],
                                        'itemPrettyPhoto' : resultsArray[4],
                                        'itemOpenPrettyPhoto' : resultsArray[4],
                                        'itemOpenContent' : resultsArray[5],
                                        'myItemPostId':resultsArray[6]
                                    }
                                    timelineItem = timelineGenerateItem(properties);
                                    $('#timeline-sortable').append(timelineItem);
									/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
									 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                                    $('#TBct_overlay').remove();
                                    $('#TBct_window').remove();
                                    $(window).scrollTop($(document).height());
                                    $('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');

                                }
                            });
                        });
                        $('#timelineFromPostLoader').hide();
                    }
                });
            }
        });

        $('.add-category-link').click(function(e){

            e.preventDefault();
            var cat_name = $(this).attr('href');
            if($("#my_timeline_cats[value='"+cat_name+"']").length==0){
                debug("Add new cat",cat_name);
                var html='<input type="hidden" name="my_timeline_cats[]" id="my_timeline_cats" value="'+cat_name+'"/>';
                debug("Html",html);
                $("#post_form").prepend(html);
            }else {
                debug('Cat exists',cat_name);
            }
            $.ajax({
                url:"admin-ajax.php",
                type:"POST",
                data:'action=ctimeline_post_category_get&cat_name='+$('#TBct_timelineCategorySelect').val(),

                success:function(results){
                    var resultsArray = results.split('||');
                    var ii = 0;
                    while (typeof resultsArray[0+ii] != 'undefined') {

                        var properties = {
                            'title' : resultsArray[0+ii],
                            'dataId' : resultsArray[1+ii],
                            'categoryId' : resultsArray[2+ii],
                            'itemContent' : resultsArray[3+ii],
                            'itemImage' : resultsArray[4+ii],
                            'itemPrettyPhoto' : resultsArray[4+ii],
                            'itemOpenPrettyPhoto' : resultsArray[4+ii],
                            'itemOpenContent' : resultsArray[5+ii],
                            'myItemPostId':resultsArray[6+ii]
                        }
                        timelineItem = timelineGenerateItem(properties);
                        $('#timeline-sortable').append(timelineItem);
                        ii +=7;
                    }
					/*$('.tsort-start-item').eq($('.tsort-start-item').length-1).trigger('click').attr('checked', 'checked');
					 $('.tsort-start-item').eq($('.tsort-start-item').length-1).parent().css('background-color', '#F1592B');*/
                    $('#TBct_overlay').remove();
                    $('#TBct_window').remove();
                    $(window).scrollTop($(document).height());
					/*$('#timeline-sortable').find("li:last").find('.tsort-plus').trigger('click');*/

                }
            });

        });


    }


    function timelineGenerateItem(properties) {
        // set globals
        var pluginUrl = $('#plugin-url').val(),
            imageurl = ajaxurl + '?action=ctimeline_image_get';

        // calculate item number
        var itemNumber = 1;
        while($('#sort'+itemNumber).length > 0) {
            itemNumber++;
        }

        // get current date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd}
        if(mm<10){mm='0'+mm}
        today = dd+'/'+mm+'/'+yyyy;

        // get input properties
        var pr = $.extend({
            'title' : 'Title',
            'dataId' : today,
            'categoryId' : '',
            'categoryId' : '',
            'itemContent' : 'Content',
            'itemPrettyPhoto' : '',
            'itemLink' : '',
            'itemImage' : '',
            'itemImagePhotos' : '',
            'itemOpenContent' : 'Content',
            'itemOpenPrettyPhoto' : ''
        }, properties);
        // bring all the pieces together
        var itemHtml = '\n'+
            '					<li id="sort'+itemNumber+'" class="sortableItem" data-copy-counter="1">\n'+
            '						<div class="tsort-header"><span class="item-header">ITEM '+itemNumber+' <!--<small><i>- '+pr.title+'</i></small> &nbsp;--></span><a href="#" class="tsort-delete dashicons dashicons-editor-help"><!--<i>delete</i>--></a><span class="tsort-drag-item dashicons dashicons-move"></span><span class="tsort-copy-item dashicons dashicons-editor-help"></span><span class="tsort-plus dashicons dashicons-editor-help"></span></div>\n'+
            '						<div class="tsort-image-div"><img id="sort'+itemNumber+'-item-image1" src="'+((pr.itemImage != '') ? imageurl + '&src=' + pr.itemImage + '&w=258&h=130' : pluginUrl + '/images/no_image_small.jpg')+ '" /><div class="starting-card" style="display:none">STARTING ITEM</div></div>\n'+
            '<div class="tsort-info"><div><p class="date-info">'+pr.dataId+'</p><p class="post-info">'+pr.title+'</p></div></div>\n'+
            '<div class="TBct_overlayBG TBct_card_overlay"></div>\n'+
            '<div class="TBct_card_window" style="width:1000px; height:665px; opacity:0;">\n'+
            '<!--<div class="TBct_card_title"><div class="TBct_cardAjaxWindowTitle">ADD NEW TIMELINE ITEM</div>\n-->'+
            '<div class="TBct_cardCloseAjaxWindow"><a class="TBct_cardCloseWindowButton dashicons dashicons-editor-help" title="Close" href="#"><!--<img src="'+pluginUrl+'/images/tb-close.png" alt="X">--></a></div>\n'+
            '						<!--</div>\n-->'+
            '						<div class="tsort-content">\n'+
            '							<div class="tsort-dataid">\n'+
            '								<div class="edit-header-title">EDIT ITEM '+itemNumber+'</div>\n'+
            '								<input name="sort'+itemNumber+'-my-post-id" id="'+itemNumber+'-my-post-id" class="" type="hidden" value="'+pr.myItemPostId+'">'+
            '								<div class="check-back-color"><input name="sort'+itemNumber+'-start-item" id="'+itemNumber+'-start-item" class="tsort-start-item alignright" type="checkbox"><label for="'+itemNumber+'-start-item" class="alignright">STARTING ITEM &nbsp;</label></div>'+
            '							</div>\n'+
            '								<div class="tsort-text-title">'+pr.title+'&nbsp;</div>\n'+
            '								<div class="tsort-card-select"><div class="item-options" style="padding-left:0; float:left;">ITEM OPTIONS</div><div class="active-item-options" style="padding-left:0; float: left; margin-left: 30px;">ACTIVE ITEM OPTIONS</div></div>\n'+
            '							<div class="tsort-item">\n'+
            '								<!--<h3 style="padding-left:0;"><span class="timeline-help dashicons dashicons-editor-help"><span class="timeline-tooltip">Base item content (image, title and content).</span></span>ITEM OPTIONS</h3>\n-->'+
            '								<div class="tsort-image"><img id="sort'+itemNumber+'-item-image" src="'+((pr.itemImage != '') ? imageurl + '&src=' + pr.itemImage + '&w=500&h=500' : pluginUrl + '/images/no_image_large.jpg')+ '" />\n' +
            '								<div class="card-image-overlay"></div>\n' +
            '									<div class="image-option-change"><a href="#" id="sort'+itemNumber+'-item-image-change" class="tsort-change">CHANGE IMAGE</a>\n' +
            '									<input id="sort'+itemNumber+'-item-image-input" name="sort'+itemNumber+'-item-image" type="hidden" value="'+pr.itemImage+'" />\n'+
            '									<input id="sort'+itemNumber+'-item-image-input-photos" name="sort'+itemNumber+'-item-image-photos" type="hidden" value="'+pr.itemImage+'" />\n'+
            '									<a href="#" id="sort'+itemNumber+'-item-image-remove" class="tsort-remove">REMOVE IMAGE</a>\n'+
            '									</div>\n'+
            '								</div>\n'+
            '								<div class="item-info-wrapper">\n'+
            '							<table style="width:96%; margin-bottom: 9px; border-spacing: 0px 4px;">\n'+
            '								<tr><td colspan="2"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -2px;"><span class="timeline-tooltip">Title text that is displayed on the card</span></span><div class="item-title-div"><div class="tsort-title-div" style="margin-left:27px;">TITLE:</div></td></tr>\n'+
            '								<tr><td colspan="2"><input class="tsort-title" name="sort'+itemNumber+'-item-title" value="'+pr.title+'" type="text" /></div></td></tr>\n'+
            '							</table>\n'+
            '								<div class="clear"></div>\n'+
            '                               <table style="width:96%; margin-bottom: 9px; border-spacing: 0px 4px;">\n'+
            '								<tr><td colspan="2"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -2px;"><span class="timeline-tooltip">Intro text that is displayed on the card</span></span><div class="tsort-contarea-title" style="margin-left:27px;">EXCERPT:</div></td></tr>\n'+
            '								<tr><td colspan="2"><textarea style="" class="tsort-contarea" name="sort'+itemNumber+'-item-content">'+pr.itemContent+'</textarea></td></tr>\n'+
            '								</table>\n'+
            '								<table style="width:100%; margin-bottom: 9px; border-spacing: 0px 4px;">\n'+
            '								<tr>\n'+
            '									<td style="width:120px;"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -1px;"> <span class="timeline-tooltip">"Photo URL can be image, video or site url. Leave it empty to link to full-size image.</span></span><label for="sort'+itemNumber+'-item-prettyPhoto" style="margin-left:7px; font-size:14px; font-weight:bold;">PHOTO URL:</label></td>\n'+
            '									<td style="width:120px;"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -1px;"><span class="timeline-tooltip">Link to post or page. Leave it empty for default behaivor.</span></span><label for="sort'+itemNumber+'-item-link" style="margin-left:7px;font-size:14px; font-weight:bold;">BUTTON URL:</label></td>\n'+
            '								</tr>\n'+
            '								<tr>\n'+
            '									<td><input class="tsort-prettyPhoto" name="sort'+itemNumber+'-item-prettyPhoto" placeholder="http://..." value="'+pr.itemPrettyPhoto+'" type="text" style="width:91%;" /></td>\n'+
            '									<td><input class="tsort-link" name="sort'+itemNumber+'-item-link" placeholder="http://..." value="'+pr.itemLink+'" type="text" style="width:91%;" /></td>\n'+
            '								</tr>\n'+
            '								</table>\n'+
            '								<table style="width:100%; margin-bottom: 9px; border-spacing: 0px 4px;">\n'+
            '								<tr>\n'+
            '									<td style="width:120px;"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -1px;"><span class="timeline-tooltip">Argument by which are elements organised (date - dd/mm/yyyy, Category - full category name) Different field is used for different categorizing type.</span></span><label for="sort'+itemNumber+'-dataid" style="margin-left:7px; font-size:14px; font-weight:bold;">DATE:</label>'+
            '									<td style="width:120px;"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -1px;"><span class="timeline-tooltip">Category that the post belongs to</span></span><label style="margin-left:7px; font-size:14px; font-weight:bold;" for="sort'+itemNumber+'-categoryid">CATEGORY:</label>'+
            '								</tr>\n'+
            '								<tr>\n'+
            '									<td><input class="data_id" style="width:91%;" id="sort'+itemNumber+'-dataid" name="sort'+itemNumber+'-dataid" value="'+pr.dataId+'" type="text"/>'+
            '									<td><input class="category_id" style="width:91%;";" id="sort'+itemNumber+'-categoryid" name="sort'+itemNumber+'-categoryid" placeholder="Blog posts..." value="'+pr.categoryId+'" type="text"/>'+
            '								</tr>\n'+
            '								</table>\n'+
            '								<!--<span class="timeline-help dashicons dashicons-editor-help"><span class="timeline-tooltip">Argument by which are elements organised (date - dd/mm/yyyy, Category - full category name) Different field is used for different categorizing type.</span></span>'+
            '								<label for="sort'+itemNumber+'-dataid">DATE:</label>'+
            '								<input style="margin-left:5px;" id="sort'+itemNumber+'-dataid" name="sort'+itemNumber+'-dataid" value="'+pr.dataId+'" type="text"/>'+
            '								<label style="margin-left:5px;" for="sort'+itemNumber+'-categoryid">CATEGORY:</label>'+
            '								<input style="margin-left:5px;" id="sort'+itemNumber+'-categoryid" name="sort'+itemNumber+'-categoryid" placeholder="Blog posts..." value="'+pr.categoryId+'" type="text"/>-->'+
            '								<table style="width:96%; border-spacing: 0px 4px;">\n'+
            '								<tr><td colspan="2"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -2px;"><span class="timeline-tooltip">Text that is displayed when the user hovers over the node in the timeline</span></span><label style="margin-left:27px; display:block; font-size:14px; font-weight:bold;" for="sort'+itemNumber+'-node-name">TITLE OF TIMELINE NODE (OPTIONAL):</label></td></tr>'+
            '								<tr><td colspan="2"><input class="title-optional" style="width:100%; color: #888888;" id="sort'+itemNumber+'-node-name" name="sort'+itemNumber+'-node-name" placeholder="Title goes here..." value="" type="text" /></td></tr>'+
            '							</table>\n'+
            '							</div></div>\n'+
            '							<div class="tsort-itemopen">\n'+
            '								<!--<h3 style="padding-left:0;"><span class="timeline-help dashicons dashicons-editor-help"><span class="timeline-tooltip">Opened item content (image, title and content).</span></span>ACTIVE ITEM OPTIONS</h3>\n-->'+
            '								<div class="tsort-image-open"><img id="sort'+itemNumber+'-item-open-image" src="'+((pr.itemImage != '') ? imageurl + '&src=' + pr.itemImage + '&w=500&h=500' : pluginUrl + '/images/no_image_large.jpg')+ '" /\n>'+
            '								<div class="card-image-overlay"></div><div class="image-open-option-change">\n' +
            '									<a href="#" id="sort'+itemNumber+'-item-open-image-change" class="tsort-change-open">CHANGE IMAGE</a>\n'+
            '									<input id="sort'+itemNumber+'-item-open-image-input" name="sort'+itemNumber+'-item-open-image" type="hidden" value="'+pr.itemImage+'" />\n'+
            '									<a href="#" id="sort'+itemNumber+'-item-open-image-remove" class="tsort-remove-open">REMOVE IMAGE</a>\n'+
            '								</div>\n'+
            '								</div>\n'+
            '								<div class="itemopen-info-wrapper">\n'+
            '								<table style="width:96%; margin-bottom:9px; border-spacing: 0px 4px;">\n'+
            '								<tr><td colspan="2"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -2px;"><span class="timeline-tooltip">Title text for the active (opened) item</span></span><div class="tsort-title-div" style="margin-left:27px;">TITLE:</div></td></tr>\n'+
            '								<tr><td colspan="2"><input class="tsort-title" name="sort'+itemNumber+'-item-open-title" value="'+pr.title+'" type="text" /></td></tr>\n'+
            '								</table>\n'+
            '								<div class="clear"></div>\n'+
            '								<table style="width:96%; margin-bottom:9px; border-spacing: 0px 4px;">\n'+
            '								<tr><td colspan="2"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -2px;"><span class="timeline-tooltip">Content that is displayed in an active (opened) item</span></span><div class="tsort-contarea-title" style="margin-left:27px;">CONTENT:</div></td></tr>\n'+
            '								<tr><td colspan="2"><textarea class="tsort-contarea-open" name="sort'+itemNumber+'-item-open-content">'+pr.itemOpenContent+'</textarea></td></tr>\n'+
            '								</table>\n'+
            '								<table style="width:96%; margin-bottom:9px; border-spacing: 0px 4px;">\n'+
            '								<tr>\n'+
            '									<td style="width:120px;"><span class="timeline-help dashicons dashicons-editor-help" style="margin-top: -1px;"><span class="timeline-tooltip">"Photo URL can be image, video or site url. LEAVE IT EMPTY TO DISPLAY FULL SIZED IMAGE.</span></span><label for="sort'+itemNumber+'-item-open-prettyPhoto" style="margin-left:7px; font-size:14px; font-weight:bold;">PHOTO URL:</label></td>\n'+
            '								</tr>\n'+
            '								<tr>\n'+
            '									<td><input class="tsort-prettyPhoto" name="sort'+itemNumber+'-item-open-prettyPhoto" placeholder="http://..." value="'+pr.itemOpenPrettyPhoto+'" type="text" style="width:100%;" /></td>\n'+
            '								</tr>\n'+
            '								</table>\n'+
            '								<input style="margin-left:4px; margin-top: -1px;" type="checkbox" id="sort'+itemNumber+'-desable-scroll" class="disable-scroll" name="sort'+itemNumber+'-desable-scroll" />\n'+
            '								<label for="sort'+itemNumber+'-desable-scroll" style="font-size:14px; font-weight:bold;">DISABLE SCROLL&nbsp;</label>\n'+
            '							</div>\n'+
            '							</div>\n'+
            '						</div>\n'+
            '					</div>\n'+
            '					</li>\n';
        return itemHtml;

    }


})(jQuery)
