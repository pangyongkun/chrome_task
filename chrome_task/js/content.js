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


        //获取文本
        var text = "";
        if (document.selection) {
            text = document.selection.createRange().text;
        }
        else if (window.getSelection()) {
            text = window.getSelection();
        }
        if (text != "") {

            translateHttp(event, text);


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
    function translateHttp(e, word) {

        //默认右下方
        var x = 10;
        var y = 10;

        //页面可见高宽
        var docX = document.documentElement.clientWidth;
        var docY = document.documentElement.clientHeight;

        if ((docY - e.pageY) < 80) {
            y = -80
        }
        if ((docX - e.pageX) < 80) {
            x = -200;
        }

        $("#tooltip").remove();

        //获取翻译
        $.get("https://api.shanbay.com/bdc/search/?word=" + word, function (data) {

            var audioUrl = data.data.audio;
            var tooltip;

            if (data.data.definition == undefined || data.data.definition == null) {
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
                    "top": (e.pageY + y) + "px",
                    "left": (e.pageX + x) + "px",
                })
                .show("fast")
                .mouseover(function () {
                    $(this).on("click", {url: audioUrl}, function (event) {
                        //console.log(">>> " + event.data.url);
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


    function pagination() {

        $("a[id^='page_'],#scroll").remove();

        //计算总页数
        var pageSize;
        var totalSize;
        var totalPage;
        pageSize = document.documentElement.clientHeight;
        totalSize = document.documentElement.scrollHeight;
        if ((totalSize / pageSize) > parseInt(totalSize / pageSize)) {
            totalPage = parseInt(totalSize / pageSize) + 1;
        } else {
            totalPage = parseInt(totalSize / pageSize);
        }

        /*添加页码*/
        for (var i = 1; i <= totalPage + 1; i++) {
            if (i == 1) {
                var a = document.createElement("a");
                a.id = "page_" + i;
                a.style.position = "absolute";
                a.style.top = "5px";
                a.style.left = "20px";
                a.innerHTML = "第" + i + "页";
                $("body").append(a);
            } else {
                var a = document.createElement("a");
                a.id = "page_" + i;
                a.style.position = "absolute";
                a.style.top = (i - 1) * pageSize + "px";
                a.style.left = "20px";
                a.innerHTML = "第" + i + "页";
                $("body").append(a);
            }

        }

        /*添加分页*/
        var scroll = '<ul id="scroll" >' +
            '<li><a id="pre" class="scroll-h" title="上一页">上一页</a></li>' +
            '<li><a class="scroll-h" title="总页数">共' + totalPage + '页</a></li>' +
            '<li><input value="1" id="goPage" type="text"/></li>' +
            '<li><a id="next" class="scroll-b" title="下一页">下一页</a></li>' +
            '</ul>';

        $("body").append(scroll);

        /*根据url页码设置当前页*/
        var np = getUrlPage();
        $("#goPage").attr("value", np);


        /*手动输入跳转*/
        $("#goPage").keypress(function (e) {
            var nowpage = $(this).attr("value");
            var pageCode = e.keyCode;
            if (pageCode < 49 || pageCode > 57) {
                return;
            }
            var page = pageCode - 48;
            if (page != nowpage && page > 0 && page < totalPage + 1) {
                $(this).attr("value", page);
                window.location.href = "#page_" + page;

            }

        });

        /*上一页*/
        $("#pre").bind("click", function (e) {
            var nowpageStr = $("#goPage").attr("value");
            var nowpage = Number(nowpageStr);

            if (nowpage > 1) {
                nowpage = nowpage - 1;
                console.log(">>> ", nowpage);
                $("#goPage").attr("value", nowpage);
                window.location.href = "#page_" + nowpage;
            }
            e.preventDefault();
        })

        /*下一页*/
        $("#next").bind("click", function (e) {
            var nowpageStr = $("#goPage").attr("value");
            var nowpage = Number(nowpageStr);

            if (nowpage < totalPage) {
                nowpage = nowpage + 1;
                console.log(">>> ", nowpage);
                $("#goPage").attr("value", nowpage);
                window.location.href = "#page_" + nowpage;
            }
            e.preventDefault();
        })

    }

    pagination();

    /**
     * 监听浏览器窗口变化
     */
    $(window).resize(function () {
        pagination();
    })

    /**
     * 获取url上的页数
     * @returns {number}
     */
    function getUrlPage() {
        var url = window.location.href;
        var strs = url.split("page_");
        var nowpage;
        if (strs.length == 1) {
            nowpage=1;
        }else{
            nowpage=strs[1];
        }
        window.location.href="#page_"+nowpage;
        return Number(strs[1]);
    }


})



