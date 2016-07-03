/**
 * Created by kun on 2016/7/2.
 */

$(function () {

    /*移除不需要的内容*/
    $(".top-banner-ad-container," +
        ".js-navigation-header," +
        ".content__labels," +
        ".content__meta-container," +
        ".content__secondary-column," +
        ".content-footer," +
        ".l-footer__primary," +
        "footer,.site-message," +
        ".submeta," +
        "aside," +
        ".email-sub")
        .remove();


    /*翻译*/
    $("body").mouseup(function (e) {
        var x = 10;
        var y = 10;

        //页面可见高宽
        var docX = document.documentElement.clientWidth;
        var docY = document.documentElement.clientHeight;

        //获取文本
        var text = "";
        if (document.selection) {
            text = document.selection.createRange().text;
        }
        else if (window.getSelection()) {
            text = window.getSelection();
        }
        if (text != "") {

            translateHttp(event, text, x, y,docX,docY);


        }
    });


    /**
     *
     * @param e
     * @param word
     * @param x
     * @param y
     * @param docx
     * @param docy
     */
    function translateHttp(e, word, x, y,docx,docy) {


        $("#tooltip").remove();

        //获取翻译
        $.get("https://api.shanbay.com/bdc/search/?word=" + word, function (data) {

            var audioUrl = data.data.audio;
            var tooltip;

            if (data.data.definition == undefined||data.data.definition==null) {
                tooltip = "<div id='tooltip' class='tooltip tooltip_container' >"
                    + "请选择要翻译的词!" +
                    "</div>";
            } else {
                tooltip = "<div id='tooltip' class='tooltip tooltip_container' >"
                    + data.data.definition +
                    "</div>";
            }
            $("body").append(tooltip).children("#tooltip")
                .css({
                    "top": (e.pageY -x) + "px",
                    "left": (e.pageX - y) + "px",
                })
                .show("fast")
                .mouseover(function () {
                    $(this).on("click", {url: audioUrl}, function (event) {
                        console.log(">>> " + event.data.url);
                        var audio = document.createElement("audio");
                        audio.src = event.data.url;
                        audio.id = "audio"
                        audio.play();

                    })
                })
                .mouseout(function () {
                    $("body").children("#tooltip").remove();
                    $("body").children("audio[id='audio']").remove();
                });


        });
    }


})



