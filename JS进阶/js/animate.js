/**
 * Created by andy on 2015/11/23.
 */
// 多个属性运动框架  添加回调函数
function animate(obj,json,fn) {  // 给谁    json
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
        for(var attr in json){
            var current = 0;
            if(attr == "opacity") {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            } else {
                current = parseInt(getStyle(obj,attr)); // 数值
            }

            // 目标位置就是  属性值
            var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            //判断透明度
            if(attr == "opacity") {
                if("opacity" in obj.style) {
                    obj.style.opacity = (current + step) /100;
                } else {
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";
                }
            } else if(attr == "zIndex") {
                obj.style.zIndex = json[attr];
            } else {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr]) flag = false;
        }
        if(flag) {
            clearInterval(obj.timer);
            if (fn) fn();
        }
    },10)
}

function getStyle(obj,attr) {  //  谁的      那个属性
    if(obj.currentStyle) {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    } else {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}