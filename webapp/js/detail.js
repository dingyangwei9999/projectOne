require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','lazyload','fly','common','swiper'],function($,lazyload,fly,common,swiper){
		$(function(){


			//根据传进来的id请求数据
			var big_proa=location.search
            var big_id=big_proa.split('=')[1]
            var productid;
            // console.log(big_id)
            $.ajax({
              	type: "GET",
             	url: "http://localhost:8080/details",
             	data: {productid: big_id},
             	success: function(msg){
                 	// console.log(msg[0])

                	$('.lbt1').html(`<img src="../images/${msg[0].banner1}" alt="" class="swiperWrapper1">`);
					$('.lbt2').html(`<img src="../images/${msg[0].banner2}" alt="" class="swiperWrapper1">`);
					$('.title').html(`${msg[0].name}`);
					$('.price p').html(`${msg[0].price}`);
					$('.Explain').html(`${msg[0].states}`);
					$('.shuo').html(`${msg[0].des}`);
					$('.img').html(`<img src="../images/${msg[0].img1}" alt="">
						<img src="../images/${msg[0].img2}" alt="">
						<img src="../images/${msg[0].img3}" alt="">
						<img src="../images/${msg[0].img4}" alt="">
						<img src="../images/${msg[0].img5}" alt="">
						<img src="../images/${msg[0].img6}" alt="">
						<img src="../images/${msg[0].img7}" alt="">
						<img src="../images/${msg[0].img8}" alt="">
						<img src="../images/${msg[0].img9}" alt="">
						<img src="../images/${msg[0].img10}" alt="">
						<img src="../images/${msg[0].img11}" alt="">
						<img src="../images/${msg[0].img12}" alt="">
						<img src="../images/${msg[0].img13}" alt="">
						<img src="../images/${msg[0].img14}" alt="">
						<img src="../images/${msg[0].img15}" alt="">
						<img src="../images/${msg[0].img16}" alt="">
						<img src="../images/${msg[0].img17}" alt="">
		`);
					$('.kucun').html(`库存${msg[0].kucun}件`);
					$('.spName').html(`${msg[0].states}`);
					$('.span1').text(`${msg[0].kind1}`);
					$('.span2').text(`${msg[0].kind2}`);
					$('.span3').text(`${msg[0].kind3}`);
					$('.tu').html(`<img src="../images/${msg[0].banner1}" alt="">`);
					// console.log(`${msg[0].kind3}`)
					// console.log($('.title'))
              		}
              		
              		

            });


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

			//懒加载
			$("img").lazyload({threshold:1,effect: "fadeIn"});
			
			
			});
		
			//选项
			
			$('.center span').eq(0).addClass('active');
			$('.center').on('click','span',function(){
				$('.leixing').text($(this).text());
				$(this).addClass('active').siblings().removeClass('active');

			});



	
			
			setTimeout(function(){
				$('.leixing').text($('.span1').text());
				$('.txt .price').text((parseFloat($('.price p').text())*$('.count').val()).toFixed(2));
				$('.center span').each(function(i,ele){
					// console.log($(ele).text());
				   if($(ele).text()==""){
				   	// console.log($(ele));
					$(ele).hide();
					
					}
				});
			},300);


			setTimeout(function(){
				
				// console.log(($('.img img').attr('src')))
				$('.img img').each(function(i,ele){
					// console.log($(ele).attr('src'))
				   if($(ele).attr('src') == '../images/'){
						$(ele).hide();
						// console.log(1)
					}
				});


			},300);





			$('.miao').click(function(){
				$('.m').show();
				var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
				$('main').animate({scrollTop:h},100)
				$('.miao').css({"border-bottom":"1px solid #fff"});
				$('.lun').css({"border-bottom":"1px solid #ccc"});
				$('.xi').css({"border-bottom":"none"});
				
			})
			$('.lun').click(function(){
				var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
				$('main').animate({scrollTop:h},100)
				$('.m').hide();
				$('.lun').css({"border-bottom":"1px solid #fff"});
				$('.miao').css({"border-bottom":"1px solid #ccc"});
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
			$('.clo-btn').click(function(){
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

				}
			})
			
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
							$('.close').click(function(){
								$('.tip').stop().fadeOut();
								$('.hei1').stop().fadeOut();
							});
							$('.car1').click(function(){
								window.location.href='#'
							});
					    }
					});
				}
				
			    

				
				
	            
			
		});
	})
})

