(function(){

    var currClientWidth,

        fontValue,

        originWidth;

    originWidth = 750;//ui设计稿的宽度，一般750或640

    __resize();



    window.addEventListener('resize', __resize, false);



    function __resize() {

        currClientWidth = document.documentElement.clientWidth;

        if (currClientWidth > 768){

            currClientWidth = 768;

        } 

        if (currClientWidth < 320){

            currClientWidth = 320;

        } 

        fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);

        document.documentElement.style.fontSize = fontValue + '%';

    }

})();

//代码里面rem的值就是Ui设计稿上量的px除以100就是你代码中要写的rem值。