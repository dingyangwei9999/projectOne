require(['config'],function(){
    require(['jquery'],function($){
    	var $Htitle = $('title').html();
        $('.Htop').load('../html/personal-header.html',function(){
        	return $('.h_2').html($Htitle);
        });
        $('.Hfoot').load('../html/personal-footer.html');
        //点击三个导航栏的时候变色
         $.get('http://localhost:888/personal',function(response){
             console.log(response);
            response.map(function(obj){
              console.log(123);
              console.log(obj);
              var li = $('<li/>');
              li.html(`
                  <p>123</p>`);
              console.log(li);
              var $s = $('.indexListUl').append(li);
              $('.shuju').html($s).hide();
            })
          }
        )
        $('.tab-ul').on('click','>li',function(){
        	$(this).addClass('dibu-color').siblings().removeClass('dibu-color');
            var idx = $(this).index();
            if(idx ==2){
            $('.shuju').html().show();
            }
        });
  //       $(function(){
		// 	$.get(erp.baseUrl , function(response){
		// 		if(!response.status){
		// 			window.location.href = 'login.html';
		// 		} else {
		// 			$('h1').text(response.data);
		// 		}
		// 		console.log(response)
		// 	});
		// });
    
});
});