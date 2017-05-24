require(['config'],function(){
    require(['jquery'],function($){
    	var $Htitle = $('title').html();
        $('.Htop').load('../html/personal-header.html',function(){
        	return $('.h_2').html($Htitle);
        });
        $('.Hfoot').load('../html/personal-footer.html');
        

});
});