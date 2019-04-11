$(function () {

    resize();
    $(window).resize(function(event) {
        resize();
    });

    $('.location a').click(function () {
        $('.location a').removeClass('selected');
        $(this).addClass('selected');;
        $('.icon_layer span').html($(this).text());
    });

    $('#mycity').mouseenter(function () {
        $('.dropdown_layer').show();
        $('.dropdown_layer').addClass('dropdowning_list');
        $('.icon_layer').addClass('dropdowning_btn');
    }).mouseleave(function(){
        $('.dropdown_layer').hide();
        $('.dropdown_layer').removeClass('dropdowning_list');
        $('.icon_layer').removeClass('dropdowning_btn');
    });

    $('.fr_dropdown_btn').mouseenter(function () {
        $(this).find('.fr_dropdown_layer').show();
        $(this).find('.fr_dropdown_layer').addClass('dropdowning_list');
        $(this).find('.fr_icon_layer').addClass('dropdowning_btn');
    }).mouseleave(function(){
        $(this).find('.fr_dropdown_layer').hide();
        $(this).find('.fr_dropdown_layer').removeClass('dropdowning_list');
        $(this).find('.fr_icon_layer').removeClass('dropdowning_btn');
    });

    $('.photo-search-btn ').mouseover(function () {
        $(this).find('.upload_bg').css({"background-image":"url(../img/icon/photo_search_btn_red.png)"});
    }).mouseout(function () {
        $(this).find('.upload_bg').css({"background-image":""});
    });

    $('.cart_btn').mouseenter(function () {
        $('.cart_dropdown_layer').show();
        $('.cart_dropdown_layer').addClass('dropdowning_list');
        $(this).addClass('dropdowning_btn');
        $(this).css({"height":"35px", "z-index":"9999", "border-bottom":"none"});
    }).mouseleave(function(){
        $('.cart_dropdown_layer').hide();
        $('.cart_dropdown_layer').removeClass('dropdowning_list');
        $(this).removeClass('dropdowning_btn');
        $(this).css({"height":"", "z-index":"", "border-bottom":""});
    });



    $('.service_link').each(function () {
        var oldImage = $(this).find('img').attr('src');
        var newImage = new Image();
        var imgExt = /(\.\w{3}$)/;
        newImage.src = oldImage.replace(imgExt,'_red$1');

        $(this).mouseover(function () {
            $(this).find('span').addClass('service_link_over');
            $(this).find('img').attr('src',newImage.src);
        }).mouseout(function () {
            $(this).find('span').removeClass('service_link_over');
            $(this).find('img').attr('src', oldImage);
        });
    });




    //圖片輪播

    //展示下一張：每一次执行autoShowNext() i的值加1, 到8th歸零
    //注意：這裡的i+=1應該放在第一行,否則第一張切換要2秒
    var n = 0;
    function autoShowNext() {
        n += 1;
        if (n == 8) {
            n = 0;
        }
        $(".slider_item").eq(n).show().siblings(".slider_item").hide(); //第n張圖
        $(".slider_indicator_btn").eq(n).addClass("slider_item_activate").siblings().removeClass("slider_item_activate"); //對應之第n個圓圈按鈕
    }

    //展示上一張：
    var p = 8;
    function autoShowPre() {
        p -= 1;
        if (p == -1) {
            p = 8;
        }
        $(".slider_item").eq(p).show().siblings(".slider_item").hide();
        $(".slider_indicator_btn").eq(p).addClass("slider_item_activate").siblings().removeClass("slider_item_activate");
    }

    //自動輪播
    var id = setInterval(autoShowNext, 3000);   //每三秒自動展示下一張

    $(".slider_list").mouseenter(function(){    //滑鼠進入暫停輪播
        clearInterval(id);
    });
    $(".slider_list").mouseleave(function(){    //滑鼠離開恢復輪播
        id = setInterval(autoShowNext, 3000);
    });


    //手動輪播

    // 底部圓圈按鈕
    // 获取this索引，切换对应索引div,并去除hide,其兄弟元素增加hide
    $(".slider_indicator").on("mouseenter", ".slider_indicator_btn", function () {
        $(this).addClass("slider_item_activate").siblings().removeClass("slider_item_activate");
        var $index = $(this).index();
        n = $index; //取該圓圈按鈕值
        //選擇slider_wrapper裡面之前8個子div元素(此之index範圍為0~7)
        $(".slider_wrapper div:lt(8)").eq($index).show().siblings(".slider_item").hide();
        //给btn自定义属性赋值为当前索引
        $(".slider_control").attr("index", $index);
    });

    //兩側按鈕
    $(".slider_control").mouseenter(function(){    //滑鼠進入背景色變深
        $(this).addClass("slider_control_deeper");
    });
    $(".slider_control").mouseleave(function(){    //滑鼠離開背景色變淺
        $(this).removeClass("slider_control_deeper");
    });
    $(".slider_control").click(function () {
        if ($(this).attr("id") == "slider_control_prev") {
            autoShowPre();
        } else {
            autoShowNext();
        }
    });


    // 倒數計時
    $('.cd_hour span').countdown('2019/07/28', function(event) {
        $(this).html(event.strftime('%H'));
    });
    $('.cd_minute span').countdown('2019/07/28', function(event) {
        $(this).html(event.strftime('%M'));
    });
    $('.cd_second span').countdown('2019/07/28', function(event) {
        $(this).html(event.strftime('%S'));
    });






    function resize(){
        var ht=$(window).width();
        $('.sk').css({"width":ht});
        $('.grid_c1').css({"width":ht});
        $('#header_bg').css({"width":ht});
        $('.shortcut_bg').css({"width":ht});


    }






    // resize();
    // $(window).resize(function(event) {
    //     resize();
    // });
    // font();
});

// /*main*/
// //
//
// function font() {
//     var sw = $("body,html").width() < 750 ? $("body,html").width() : 750;
//     var pw = 750;
//     var f = 100 * sw / pw;
//     $('html').css('font-size', f + 'px');
// }
//
//
// /*call*/
// //
// function resize(){
//     var ht=$(window).height();
//     font();
// }