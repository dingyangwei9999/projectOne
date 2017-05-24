require(['config'],function(){
    require(['jquery'],function($){
    	var $Htitle = $('title').html();
        $('.Htop').load('../html/personal-header.html',function(){
        	return $('.h_2').html($Htitle);
        });
        $('.Hfoot').load('../html/personal-footer.html');
        //点击三个导航栏的时候变色
        $('.tab-ul').on('click','>li',function(){
        	$(this).addClass('dibu-color').siblings().removeClass('dibu-color');
        })

});
});