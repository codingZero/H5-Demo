/**
 * Created by admin on 2017/9/18.
 */
window.onload = function () {
    changeTopBarAlpha();
    autoScroll();
}

function changeTopBarAlpha() {
    var topBar = document.getElementsByClassName('topBar')[0];
    var banner = document.getElementsByClassName('banner')[0];
    var bannerHeight = banner.offsetHeight;
    window.onscroll = function () {
        if (this.scrollY <= bannerHeight) {
            var alpha = this.scrollY / bannerHeight * 0.8;
            topBar.style.backgroundColor = 'rgba(201, 23, 0,' + alpha + ')';
        } else {
            topBar.style.backgroundColor = 'rgba(201, 23, 0, 0.8)';
        }
    }
}

function autoScroll() {
    var banner = document.getElementsByClassName('banner')[0];
    var imgBox = banner.getElementsByTagName('ul')[0];
    var width = banner.offsetWidth;
    var index = 1;

    setInterval(function () {
        index++;
        imgBox.style.transition = 'all 0.3s ease';
        imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
    }, 3000);

    var transitionEnd = function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        imgBox.style.transition = 'none';
        imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
    }

    imgBox.addEventListener('transitionEnd', function () {
        transitionEnd()
    }, false)

    imgBox.addEventListener('webkitTransitionEnd', function () {
        transitionEnd()
    }, false)
}