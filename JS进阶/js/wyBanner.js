window.onload = function () {
    var scrollWidth = 310;
    var box = document.getElementById('box');
    var slider = document.getElementById('slider');
    var ctrl = document.getElementById('ctrl');
    var lis = slider.firstElementChild.children;
    for (var i = 1; i < lis.length; i++) {
        lis[i].style.left = scrollWidth + "px";
    }

    for (var i = 0; i < lis.length; i++) {
        var span = document.createElement("span");
        ctrl.insertBefore(span, ctrl.lastElementChild);
        span.className = "ctrl-page";
        span.index = i;
        if (i == 0) span.className = "ctrl-page current";
    }


    var index = 0;
    var ctrls = ctrl.children;
    for (var i = 0; i < ctrls.length; i++) {
        ctrls[i].onclick = function () {
            if (this.className == "ctrl-left") {
                animate(lis[index], {left: scrollWidth});
                index = (index == 0)? lis.length - 1 : index - 1;
                lis[index].style.left = -scrollWidth + "px";
                animate(lis[index], {left: 0});
                setSelectSpan();
            } else if (this.className == "ctrl-right") {
                autoPlay();
            } else {
                var clickIndex = this.index;
                if (index > clickIndex) {
                    animate(lis[index], {left: scrollWidth});
                    lis[clickIndex].style.left = -scrollWidth + "px";
                } else if (index < clickIndex) {
                    animate(lis[index], {left: -scrollWidth});
                    lis[clickIndex].style.left = scrollWidth + "px";
                }
                index = clickIndex;
                animate(lis[index], {left: 0});
                setSelectSpan();
            }
        }
    }

    function setSelectSpan() {
        for (var i = 1; i < ctrls.length - 1; i++) {
            var ctrl_page = ctrls[i];
            ctrl_page.className = "ctrl-page";
            if (ctrl_page.index == index) {
                ctrl_page.className = "ctrl-page current";
            }
        }
    }

    var timer = setInterval(autoPlay, 2000);
    function autoPlay() {
        animate(lis[index], {left: -scrollWidth});
        index = (index == lis.length - 1)? 0 : index + 1;
        lis[index].style.left = scrollWidth + "px";
        animate(lis[index], {left: 0});
        setSelectSpan();
    }

    box.onmouseover = function () {
        clearInterval(timer);
    }

    box.onmouseout = function () {
        timer = setInterval(autoPlay, 2000);
    }

}
