require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','lazyload','fly','common','swiper'],function($,lazyload,fly,common,swiper){

		//根据传进来的id请求数据
		var big_proa=location.search;
        var big_id=big_proa.split('=')[1];
        // console.log(big_id);
        var productid;
        $.post(erp.baseUrl + "details",{id:big_id},function(msg){
        	// console.log(msg);
        			$('.lbt1').html(`<img src="${erp.baseUrl}webapp/images/${msg[0].banner1}" alt="" class="swiperWrapper1">`);
					$('.lbt2').html(`<img src="${erp.baseUrl}webapp/images/${msg[0].banner2}" alt="" class="swiperWrapper1">`);
					$('.title').html(`${msg[0].name}`);
					$('.price p').html(`${msg[0].vipPrice}`);
					$('.Explain').html(`${msg[0].states}`);
					$('.shuo').html(`${msg[0].des}`);
					$('.img').html(`<img src="${erp.baseUrl}webapp/images/${msg[0].img1}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img2}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img3}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img4}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img5}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img6}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img7}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img8}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img9}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img10}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img11}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img12}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img13}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img14}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img15}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img16}" alt="">
						<img src="${erp.baseUrl}webapp/images/${msg[0].img17}" alt="">
		`);
					$('.kucun').html(`库存${msg[0].kucun}件`);
					$('.spName').html(`${msg[0].states}`);
					$('.span1').text(`${msg[0].kind1}`);
					$('.span2').text(`${msg[0].kind2}`);
					$('.span3').text(`${msg[0].kind3}`);
					$('.tu').html(`<img src="${erp.baseUrl}webapp/images/${msg[0].banner1}" alt="">`);
					$('.yuan').html(`${msg[0].price}`);
					// console.log(`${msg[0].kind3}`)
					// console.log($('.title'))
					
					//隐藏空的选项
					$('.img img').each(function(i,ele){
					// console.log($(ele).attr('src'))
					   if($(ele).attr('src') == erp.baseUrl+'webapp/images/'){
							$(ele).remove();
							// console.log(1)
						}
					});

					//隐藏空的图片
					$('.leixing').text($('.span1').text());
					$('.txt .price').text((parseFloat($('.price p').text())*$('.count').val()).toFixed(2));
					$('.center span').each(function(i,ele){
						// console.log($(ele).text());
					   if($(ele).text()==""){
					   	// console.log($(ele));
						$(ele).remove();
						
						}
					});
					if(!localStorage.getItem('user')){
						return false;
					}else{
						//获取用户id
						var user = JSON.parse(localStorage.getItem('user'));
						var userid = user.userId;
						$.post(erp.baseUrl + 'fetch',{userId:userid},function(res){
							if(res.status){
								res.data.forEach(function(item){
									if(item.goodsId == big_id){
										$('.goods-title a').css('color','red');
										$('.goods-title a').prop('class','unlike');
									}
								})
							}
							goodsnum();
						})
					}
					
        })




		// 顶部轮播图
		var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    //自动播放
		    autoplay:2000,
		    //播放速度
		    speed:650,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    // 这样，即使我们滑动之后， 定时器也不会被清除
		　　autoplayDisableOnInteraction : false,

		})  


			//toTop滚轮滑动时出现
	   	$('main').scroll(function () {
	        //console.log($(window).scrollTop())D:\jsdzt
	        if ($(this).scrollTop() >= 600) {
	          $('.indexToTop').fadeIn(300);
	        }else if($(this).scrollTop() < 600){
	          $('.indexToTop').fadeOut(300);
	        }
	    });

		//toTop点击事件回到顶部
	     $('.indexToTop').on('click',function(){
	      	$('main').animate({scrollTop:0},500)
	     })

		//点击收藏
		$('.goods-title a').click(function(){
			if(!localStorage.getItem('user')){
	    		alert('请先登录');
	    		location.href = 'login.html';
	    		return false;
	    	}
	    	//获取用户id
			var user = JSON.parse(localStorage.getItem('user'));
			var userid = user.userId;

			//获取存入购物车商品数据
	    	var big_proa=location.search;
        	var big_id= big_proa.split('=')[1];
	    	if($(this).prop('class') == 'like'){
				$(this).css('color','red').removeClass().addClass('unlike');
		    	var goodsMsg = $(this).siblings('h4').text();
		    	var price = $(this).closest('div').siblings('.price').find('.yuan').text();
		    	var vipPrice = $(this).closest('div').siblings('.price').find('p').eq(0).text();
	    		var img = $(this).closest('.goods').siblings('.swiper-container').find('img').eq(0).prop('src');
				$.post(erp.baseUrl + 'collect',{
					userId:userid,
					goodsId:big_id,
					goodsMsg:goodsMsg,
					price:price,
					vipPrice:vipPrice,
					img:img
				},function(res){
					alert(res.message);
				})
	    	}else{
	    		$(this).css('color','').removeClass().addClass('like');
	    		$.post(erp.baseUrl + 'del',{
					userId:userid,
					goodsId:big_id
				},function(res){
					alert(res.message);
				})

	    	}
	    	
		})


		//选项
		$('.center span').eq(0).addClass('active');
		$('.center').on('click','span',function(){
			$('.leixing').text($(this).text());
			$(this).addClass('active').siblings().removeClass('active');

		});
	
		//点击描述显示事件
		$('.miao').click(function(){
			$('.m').show();
			var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
			$('main').animate({scrollTop:h},100)
			$('.miao').css({"border-bottom":"1px solid #fff","color":"#f59d2b"});
			$('.lun').css({"border-bottom":"1px solid #ccc","color":"#3e3e3e"});
			$('.xi').css({"border-bottom":"none"});
			
		})
		
		//
		//点击评论显示事件
		$('.lun').click(function(){
			var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
			$('main').animate({scrollTop:h},100)
			$('.m').hide();
			$('.lun').css({"border-bottom":"1px solid #fff","color":"#f59d2b"});
			$('.miao').css({"border-bottom":"1px solid #ccc","color":"#3e3e3e"});
			$('.xi').css({"border-bottom":"none"});
			
		})



		//吸顶效果
		var a = $('.xi').clone(true);
		$('main').append(a)
		$('main').scroll(function() {
			// console.log(111)
			var he = $(this).scrollTop();
			var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height();
			// console.log(he,h)

			// console.log(a)
			if(he > h){
				a.css({"position":"fixed","top":"0.82rem"});
			}else if(he <= h){
				a.css({'position':''});
			}
		});



		//页面商品数量减少
		var count = parseInt($('.count').val());
		// console.log(count,$('.count'))
		$('.cut').click(function(){

			if(count < 2){
				count = 2;
			}
			$('.count').val(--count);
			$('.txt .price').text((parseFloat($('.price p').text())*$('.count').val()).toFixed(2));
		})
		//页面商品数量增加加
		$('.add').click(function(){
			
			$('.count').val(++count);
			$('.txt .price').text((parseFloat($('.price p').text())*$('.count').val()).toFixed(2));
			
		});
		//手动输入
		$('.count').blur(function(){
			$('.txt .price').text((parseFloat($('.price p').text())*$('.count').val()).toFixed(2));
		});



		var flag = false;
		$('.clo-btn,.hei').click(function(){
			$('.zhe').stop().animate({top:'100%'},300);
			$('.hei').stop().fadeOut(300);
			flag = false;
		})
		

		$('.buy').click(function(){
			// console.log(555)
			if(flag ==false){
				$('.zhe').stop().animate({top:'42%'},300);
				$('.hei').stop().fadeIn(300);
				flag = true;
			}else if(flag == true){
				//加入购物车
		    	if(!localStorage.getItem('user')){
		    		alert('请先登录');
		    		location.href = 'login.html';
		    		return false;
		    	}
	    		//获取用户id
				var user = JSON.parse(localStorage.getItem('user'));
				var userid = user.userId;
		    	//获取存入购物车商品数据
		    	var big_proa=location.search;
            	var big_id= big_proa.split('=')[1];
            	var spName = $('.Explain').text();
            	var img = $('.lbt1 img').attr('src');
            	console.log(img)
            	var name = $('.title').text();
            	var price = $('.price').eq(1).text();
		    	var qty = $('.b :text').val();
		    	var standard = $('span.active').text();
		    	var cartGoods = {
		    		userId:userid,
		    		goodsId:big_id,
		    		spName:spName,
		    		name:name,
		    		price:price,
		    		img:img,
		    		standard:standard,
		    		qty:qty
		    	}
		    	$.post(erp.baseUrl + 'cartgoods',cartGoods);
				location.href = 'cart.html';
			}
		});
		
		
		//点击加入购物车 + 飞入效果
		$('.car').click(function(event){
			
			if(flag ==false){
				$('.zhe').stop().animate({top:'42%'},300);
				$('.hei').stop().fadeIn(300);
				flag = true;
				// console.log(555)

			}
			else if(flag == true){
				
				// console.log(56)
				var offset = $('#end').offset();

			    var flyer = $('.swiper-wrapper img').eq(0).clone().addClass("u-flyer");
			    // console.log(flyer)
			    // var left = $('.swiper-wrapper img').offset().left +100;
			    // var top = $('.swiper-wrapper img').offset().top - window.scrollY +150;
			    // console.log(event.clientX,event.clientY,offset.left,offset.top)
			    flyer.fly({
			        start: {
			            left: event.clientX,
			            top: event.clientY
			          
			        },
			        end: {
			            left: offset.left,
			            top: offset.top,
			            width: 20,
			            height: 20
				    },
				   
				    onEnd: function(){
				    	//动画结束后调用函数，清除飞入的图片
				    	flyer.remove();

				    	//隐藏选购页
					 //    $('.zhe').stop().animate({top:'100%'},300);
						// $('.hei').stop().fadeOut(300);
						// flag = false;
						//显示提示
						$('.tip').stop().fadeIn();
						$('.hei1').stop().fadeIn();
						$('.close,.hei1').click(function(){
							$('.tip').stop().fadeOut();
							$('.hei1').stop().fadeOut();
						});
						$('.car1').click(function(){
							window.location.href='cart.html';
						});
				    }
				});
				//加入购物车
		    	if(!localStorage.getItem('user')){
		    		alert('请先登录');
		    		location.href = 'login.html';
		    		return false;
		    	}
	    		//获取用户id
				var user = JSON.parse(localStorage.getItem('user'));
				var userid = user.userId;
		    	//获取存入购物车商品数据
		    	var big_proa=location.search;
            	var big_id= big_proa.split('=')[1];
            	var spName = $('.Explain').text();
            	var img = $('.lbt1 img').attr('src');
            	console.log(img)
            	var name = $('.title').text();
            	var price = $('.price').eq(1).text();
		    	var qty = $('.b :text').val();
		    	var standard = $('span.active').text();
		    	var cartGoods = {
		    		userId:userid,
		    		goodsId:big_id,
		    		spName:spName,
		    		name:name,
		    		price:price,
		    		img:img,
		    		standard:standard,
		    		qty:qty
		    	}
		    	$.post(erp.baseUrl + 'cartgoods',cartGoods,function(res){
		    		if(res.status){
		    			goodsnum();
		    		}
		    	}) 	
			}
				
		});	
		//封装函数  获取购物车数量 写入页面
		function goodsnum(){
			// console.log(localStorage.getItem('user'));
			if(!localStorage.getItem('user')){
				return false;
			}
			//获取用户id
			var user = JSON.parse(localStorage.getItem('user'));
			var userid = user.userId;
			var num = 0;
			$.post(erp.baseUrl + 'getgoods',{userId:userid},function(res){
				if(res.status){
					// console.log(res.data);
					var dat = JSON.parse(res.data);
					// console.log(dat);
					dat.map(function(item){
						num += Number(item.qty);
					})
					// console.log(num);
					$('.shu').text(num);
				}
			})
		}
	})
})

