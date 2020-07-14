//------------------------------ 轮播carousel-----------------------------------------
//获取节点声明变量
var carouselW = document.getElementById("carousel");
var slide = document.getElementById("carouselSlide");
var item = document.getElementsByClassName("carousel-item");
var lc = document.getElementById("leftControl");
var rc = document.getElementById("rightControl");
var mark = document.getElementById("carouselMark");
var circleList = document.getElementsByClassName("circle");
var carouselTimeOut, slideOver;

//自调用函数创建圆点
(function () {
    for (i = 0; i < item.length; i++) {
        var circle = document.createElement("div");
        circle.setAttribute("class", "circle");
        mark.appendChild(circle);
        if (item[i].classList.contains("active")) {
            circleList[i].classList.add("active");
        }
    }
})();

//监听滑动结束改变圆点active
slide.addEventListener("transitionstart", function () {
    for (i = 0; i < item.length; i++) {
        if (item[i].classList.contains("active")) {
            circleList[i].classList.remove("active");
        } else if (item[i].classList.contains("next")) {
            circleList[i].classList.add("active");
        } else if (item[i].classList.contains("prev")) {
            circleList[i].classList.add("active");
        }
    }
}, false);

//滑动到下一图
function rightSlide() {
    slideOver = false;
    for (i = 0; i < item.length; i++) {
        if (item[i].classList.contains("active")) { //找到active的位置
            let active, next;
            //判断active是否在末尾，找到next的位置
            if (i == item.length - 1) {
                active = item[i];
                next = item[0];
            } else {
                active = item[i];
                next = item[i + 1];
            }
            //添加类让其滑动
            next.classList.add("next");
            setTimeout(function () {
                active.classList.add("slide-left");
                next.classList.add("slide-left");
                //监听滑动结束后更改类
                active.addEventListener("transitionend", function () {
                    // active.classList.remove("active", "slide-left");
                    // IE不能同时添加删除多个类
                    active.classList.remove("active");
                    active.classList.remove("slide-left");
                }, true)
                next.addEventListener("transitionend", function () {
                    // next.classList.remove("next", "slide-left");
                    next.classList.remove("next");
                    next.classList.remove("slide-left");
                    next.classList.add("active");
                    slideOver = true;
                }, true)
            }, 0100);
        }
    }
    return slideOver;
}
//滑动上一图
function leftSlide() {
    slideOver = false;
    for (i = 0; i < item.length; i++) {
        if (item[i].classList.contains("active")) { //找到active的位置
            let active, prev;
            //判断active是否在末尾，找到prev的位置
            if (i == 0) {
                active = item[i];
                prev = item[item.length - 1];
                // prev = item[item.length - 1];
            } else {
                active = item[i];
                prev = item[i - 1];
            }
            //添加类让其滑动
            prev.classList.add("prev");
            setTimeout(function () {
                active.classList.add("slide-right");
                prev.classList.add("slide-right");
                //监听滑动结束后更改类
                active.addEventListener("transitionend", function () {
                    // active.classList.remove("active", "slide-right");
                    active.classList.remove("active");
                    active.classList.remove("slide-right");
                }, true);
                prev.addEventListener("transitionend", function () {
                    // prev.classList.remove("prev", "slide-right");
                    prev.classList.remove("prev");
                    prev.classList.remove("slide-right");
                    prev.classList.add("active");
                    slideOver = true;
                }, true);
            }, 0100);
        }
    }
    return slideOver;
}

//循环左滑动函数
function carousel() {
    rightSlide();
    carouselTimeOut = setTimeout("carousel()", 3000);
}

//鼠标悬停清除循环滑动的timeout
carouselW.onmouseover = function (e) {
    let obj = e.fromElement || e.relatedTarget;
    let pa = this;
    if (pa.contains(obj)) {
        return false;
    } else {
        clearTimeout(carouselTimeOut);
    }
}

// 鼠标移出启动自循环
carouselW.onmouseout = function (e) {
    let obj = e.toElement || e.relatedTarget;
    let pa = this;
    if (pa.contains(obj)) {
        return false;
    } else {
        carouselTimeOut = setTimeout("carousel()", 3000);
    }
}

//左按键滑动到上一图
lc.onclick = function () {
    if (slideOver) {
        setTimeout("leftSlide()", 0100)
    };
};

//右案件滑动到下一图
rc.onclick = function () {
    if (slideOver) {
        setTimeout("rightSlide()", 0100)
    };
};

//圆点控制滑动
for (let n = 0; n < circleList.length; n++) {
    let cc = circleList[n];
    cc.index = n;
    cc.onclick = function () {
        if (slideOver) {
            slideOver = false;
            for (i = 0; i < item.length; i++) {
                if (item[i].classList.contains("active")) { //找到active的位置
                    let active, next;
                    active = item[i];
                    next = item[this.index]; //将圆点位置赋值给next
                    next.classList.add("next"); //添加类让其滑动
                    setTimeout(function () {
                        active.classList.add("slide-left");
                        next.classList.add("slide-left");
                        //监听滑动结束后更改类
                        active.addEventListener("transitionend", function () {
                            active.classList.remove("active", "slide-left");
                        }, true)
                        next.addEventListener("transitionend", function () {
                            next.classList.remove("next", "slide-left");
                            next.classList.add("active");
                            slideOver = true;
                        }, true)
                    }, 0100);
                }
            }
            return slideOver;
        }
    }
}

window.onload = carousel();

//----------------------------------------business-------------------------------------
var twl = document.getElementById("businessTitleWuliu");
var tds = document.getElementById("businessTitleDianshang");
var wl = document.getElementById("businessWuliu");
var ds = document.getElementById("businessDianshang");
twl.onclick = function () {
    twl.classList.add("active");
    tds.classList.remove("active");
    wl.classList.add("business-checked");
    ds.classList.remove("business-checked");
};
tds.onclick = function () {
    tds.classList.add("active");
    twl.classList.remove("active");
    ds.classList.add("business-checked");
    wl.classList.remove("business-checked");
}