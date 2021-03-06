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
				if(data){
					var res = JSON.parse(data);
				}else{
					var res={};
				}
                
                console.log(res);
                console.log(Array.isArray(res.picture));
                var pic = res.picture;
                var ban = res.banner;
                var pho = res.photo;
                var picture;
                var banner = [];
                var photo = [];
                // console.log(pic);
                if(pic){
                	 //获取缩略图名
	                pic.forEach(function(item){
	                	picture = item.filename;
	                });
                }else{
                	picture = null;
                }
               
                if(ban){
                	//获取轮播图名
	                ban.forEach(function(item){
	                	banner.push(item.filename);
	                });
                }else{
                	banner = null;
                }
                
                if(pho){
                	//获取详情图名
	                pho.forEach(function(item){
	                	photo.push(item.filename);
	                });
                }else{
                	photo = null;
                }
                console.log(banner);
                banner ? JSON.stringify(banner) : '';
                photo ? JSON.stringify(photo) : '';
                // console.log(picture,banner,photo);
                if(goodsName=='' || kind1 =='' || price =='' || vipPrice==''){
                	alert('商品名，种类，原价，现价为必填项');
                	return false;
                }
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
					banner:banner,
					photo:photo
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