require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','lazyload','fly','common','swiper'],function($,lazyload,fly,common,swiper){
		$(function(){

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

			$('.miao').click(function(){
				$('.m').show();
				var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
				$('main').animate({scrollTop:h},100)
				
			})
			$('.lun').click(function(){
				var h = $('.swiper-container').height()  + $('.goods-title').height() + $('.goods .price').height() + $('.Explain').height() + 3 + 'rem';
				$('main').animate({scrollTop:h},100)
				$('.m').hide();
				
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
				console.log(555)
				if(flag ==false){
					$('.zhe').stop().animate({top:'45%'},300);
					$('.hei').stop().fadeIn(300);
					flag = true;

				}
			})
			
			$('.car').click(function(event){
				
				if(flag ==false){
					$('.zhe').stop().animate({top:'45%'},300);
					$('.hei').stop().fadeIn(300);
					flag = true;
					console.log(555)

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

