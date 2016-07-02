/**
 * Created by kun on 2016/7/2.
 */

$(function(){

    /*隐藏不需要的内容*/
    $(".top-banner-ad-container").hide();

    $(".js-navigation-header").hide();
    $(".content__labels").hide();
    $(".content__meta-container").hide();
    $(".content__secondary-column").hide();

    $(".content-footer ").hide();
    $(".l-footer__primary ").hide();

    $("footer").hide();

    $(".site-message").remove();

    $(".submeta").hide();

    $("aside").removeAttr("class").css("display","none");



    //添加选中事件
    document.onmouseup = surroundContent;


    //获取选中内容
    function surroundContent() {
        var r;
        if (window.getSelection) {
            r = window.getSelection();
            if (r.rangeCount > 0) {
                r = r.getRangeAt(0);

                translate(r);

            }

        }
    }

    function translate(word){

        $.get("https://api.shanbay.com/bdc/search/?word="+word,function(data){

            alert(data.data.definition);
        });

    }


})


//shanbei请求

