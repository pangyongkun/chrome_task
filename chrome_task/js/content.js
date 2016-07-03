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
        "aside")
        .remove();


    /*翻译*/
    $("body").mouseup(function (e) {
        var x = 10;
        var y = 10;

        //页面可见高宽
        var docX = document.documentElement.clientWidth;
        var docY = document.documentElement.clientHeight;

        var text = "";
        if (document.selection) {
            text = document.selection.createRange().text;
        }
        else if (window.getSelection()) {
            text = window.getSelection();
        }
        if (text != "") {

            $("body").on("click","#tooltip",function(){
                alert("hello");
            })

            $.get("https://api.shanbay.com/bdc/search/?word=" + text, function (data) {
                var audioUrl = data.data.audio;

                var tooltip = "<div id='tooltip' class='tooltip tooltip_container' ><img id='play' src='http://pic.qiantucdn.com/58pic/14/40/27/22Y58PICrm2_1024.png' style='width:12px;height:12px'/>"
                    + data.data.definition +
                    "</div>";
                $("body").append(tooltip);


                $("#tooltip")
                    .css({
                        "top": (e.pageY + y) + "px",
                        "left": (e.pageX + x) + "px",
                    })
                    .show("fast")
                    .on("click", function () {
                        alert("hello")
                    });

            });

        }
    }).mousedown(function () {
        $("#tooltip").remove();
    });


    function doit(url) {

        console.log("hello");

        alert(url);
        /*var audio;
         audio = document.createElement("audio");
         audio.src = url;
         audio.play();*/

    }


})



