//点击排序时 显示和隐藏判断
$('.sort').on('click',function(){
	if($('.sorts').css('display')=='none'){
		if($('.screens').css('display')=='block'){
			$('.screens').css('display','none');
			$('.screen').css('color','#000');
		}
		$('.sorts').css('display','block');
		$('.sort').css('color','#ed2b87')
	}else{
		$('.sorts').css('display','none');
		$('.sort').css('color','#000')
	}
	
})
//点击筛选时 显示和隐藏判断
$('.screen').on('click',function(){
	if($('.screens').css('display')=='none'){
		if($('.sorts').css('display')=='block'){
			$('.sorts').css('display','none');
			$('.sort').css('color','#000');
		}
		$('.screens').css('display','block');
		$('.screen').css('color','#ed2b87')
	}else{
		$('.screens').css('display','none');
		$('.screen').css('color','#000')
	}
})

$('.indexToTop').on('click',function(){
          //创建定时器
         timer=setInterval(function(){
          //获取滚动条高度
          var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          //每次上升高度的20%
          var speed=Math.ceil(ostop/5);
          //每次上升当前高度的80%
          document.documentElement.scrollTop=document.body.scrollTop=ostop-speed;
          //如果高度为0，清除定时器
          if(ostop==0){
           clearInterval(timer);
          } 
         },30); 
})
//toTop滚轮滑动时出现
$(window).scroll(function () {
//console.log($(window).scrollTop())D:\jsdzt
if ($(window).scrollTop() >= 800) {
  $('.indexToTop').show();
}else if($(window).scrollTop() < 800){
  $('.indexToTop').hide();
}
});

var list = {
	init:function(){

	},
	ajax:function(){

	}

}
list.init();