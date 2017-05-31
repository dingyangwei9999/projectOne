$(function(){
	$('.closed,.btn-closed').click(function(){
		location.href = 'index.html';
	});
	//点击添加商品
	$('.btn-sure').click(function(e){
		var goodsName = $('.goodsName').val();
		var price = $('.price').val();
		var vipPrice = $('.vipPrice').val();
		var desc = $('.desc').val();
		var state = $('.state').val();
		var kucun = $('.kucun').val();
		var kind1 = $('.kind1').val();
		var kind2 = $('.kind2').val();
		var kind3 = $('.kind3').val();
		var num = Math.floor(Math.random()*1000000);
		$('form').ajaxSubmit({
			type: 'post',
			url: erp.baseUrl + 'upload',
			success:function(data){
                var res = JSON.parse(data);
                // console.log(Array.isArray(res.picture));
                var pic = res.picture;
                var ban = res.banner;
                var pho = res.photo;
                var picture;
                var banner = [];
                var photo = [];
                // console.log(pic);
                //获取缩略图名
                pic.forEach(function(item){
                	picture = item.filename;
                });
                //获取轮播图名
                ban.forEach(function(item){
                	banner.push(item.filename);
                });
                //获取详情图名
                pho.forEach(function(item){
                	photo.push(item.filename);
                });
                // console.log(picture,banner,photo);
                
                $.post(erp.baseUrl + 'addproduct',{
					id:num,
					pic:picture,
					kucun:kucun,
					kind1:kind1,
					kind2:kind2,
					kind3:kind3,
					goodsMsg:goodsName,
					price:price,
					vipPrice:vipPrice,
					states:state,
					des:desc,
					banner:JSON.stringify(banner),
					photo:JSON.stringify(photo)
				},function(res){
					if(res.status){
						location.href = 'index.html';
					}else{
						alert('id一致，请重新确认');
					}
				});
				
            },
            error:function(XmlHttpRequest,textStatus,errorThrown){
                console.log(XmlHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
		})
		e.preventDefault();
	})
})