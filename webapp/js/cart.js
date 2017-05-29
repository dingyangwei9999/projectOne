$(function(){
	$('.icon-fanhui').click(function(){
		location.href = 'javascript:history.go(-1)';
	});
	$('.icon-shouye-shouye').click(function(){
		location.href = '../index.html';
	});
	$('.goShop').click(function(){
		location.href = 'list.html';
	})
	//判断是否登陆
	if(!localStorage.getItem('user')){
		alert('您还没登录，去登录');
		location.href = 'login.html';
		return false;
	}else{
		//获取用户id
		var user = JSON.parse(localStorage.getItem('user'));
		var userid = user.userId;
		//请求购物车数据
		$.post(erp.baseUrl + 'getgoods',{userId:userid},function(res){
			if(res.status){	
				var data = JSON.parse(res.data);
				var ul = $('<ul/>');
				ul.html(data.map(function(item){
					return `<li class="goods_detail">
							<span class="delete_goods">×</span>
							<span><em class="change_goods">√</em></span>
							<span class="goods_img"><img src="${item.img}" alt="商品图"></span>
							<span>
								<p>${item.name}</p>
								<p class="norms"><strong>${item.spName}</strong><small>${item.standard}</small></p>
								<div class="next">
									<strong>￥${Number(item.price).toFixed(2)}</strong>
									<del>￥189.00</del>
									<p class="change_num">
										<b class="decrease_goods"> - </b>
										<input type="text" value="${item.qty}">
										<b class="increase_goods"> + </b>
									</p>
								</div>
							</span>

						</li>`
				}));
				ul.appendTo('.car-goodslist');
				$('footer').show();
				$('.car-goodslist').show();
				$('section').hide();
				//点击删除商品
				$('.delete_goods').click(function(){
					//显示提示
					$('.tip').stop().fadeIn();
					$('.hei1').stop().fadeIn();
					$(this).closest('li').addClass('judge_sure');
				})
				//提示关闭
				$('.close,.no').click(function(){
					$('.tip').stop().fadeOut();
					$('.hei1').stop().fadeOut();
					$('.judge_sure').removeClass('judge_sure');
				});
				$('.yes').click(function(){
					var standard = $('.judge_sure small').text();				
					$('.tip').stop().fadeOut();
					$('.hei1').stop().fadeOut();
					$('.judge_sure').remove();
					//全选与总价函数
					judgeCheck();
					totalPrice();
					//发送删除请求  更新数据库
					$.post(erp.baseUrl + 'removegoods',{userId:userid,standard:standard},function(res){
						if(!res.status){
							$('footer').hide();
							$('.car-goodslist').hide();
							$('section').show();
						}
					});
				});
				//点击勾选  变化
				$('.goods_detail em').click(function(){
					if($(this).prop('class') == 'change_goods'){
						$(this).removeClass().addClass('none_goods').text('');
						totalPrice();
					}else{
						$(this).removeClass().addClass('change_goods').text('√');
						totalPrice();
					}
					judgeCheck();
				})
				//点击全选  变化
				$('footer em').click(function(){
					if($(this).prop('class') == 'allcheck'){
						$(this).html('').removeClass().addClass('nonecheck');
						$('.goods_detail em').prop('class','none_goods').text('');
						totalPrice();
					}else{
						$(this).html('√').removeClass().addClass('allcheck');
						$('.goods_detail em').prop('class','change_goods').text('√');
						totalPrice();
					}
					
				});
				//进入页面 默认全选 计算价格
				totalPrice();
				//加数量
				$('.increase_goods').click(function(){
					changeQty(this);
				})
				//减数量
				$('.decrease_goods').click(function(){
					changeQty(this);
				})
				var orderId = 0;
				//点击结算
				$('.clearing').click(function(){
					//判断是否已选取商品
					if(!$('.change_goods').length){
						alert('您还没选取需要结算的商品');
						return ;
					}
					var userOrder = [];
					//遍历勾选商品 生成对应订单
					$('.change_goods').each(function(idx,ele){
						var goodsName = $(ele).parent().siblings().find('p').eq(0).text();
						var spName = $(ele).parent().siblings().find('.norms strong').text();
						var goodsKind = $(ele).parent().siblings().find('.norms small').text();
						var vipPrice = $(ele).parent().siblings().find('.next strong').text();
						var price = $(ele).parent().siblings().find('.next del').text();
						var num = $(ele).parent().siblings().find('.next :text').val();
						var img = $(ele).parent().siblings('.goods_img').find('img').prop('src');
						var orderNews = {
							goodsName:goodsName,
							spName:spName,
							goodsKind:goodsKind,
							vipPrice:vipPrice,
							price:price,
							num:num,
							img:img
						}
						userOrder.push(orderNews);
					})
					// console.log(userOrder);
					var totalPrice = $('.totalprice').text();
					orderId++;
					$.post(erp.baseUrl + 'userorder',{
						userId:userid,
						orderId:orderId,
						userOrder:JSON.stringify(userOrder),
						totalPrice:totalPrice
					},function(res){
						console.log(res);
						//请求是否判断是否有收货地址
						$.ajax({
							url:erp.baseUrl + 'getsite',
							type:'post',
							data:{userId:userid},
							success:function(res){
								if(res.status){
									location.href = 'personal-goods.html';
								}else{
									location.href = 'personal-address.html';
								}
							}
						})
							
					})
					
				})
			}else{
				$('footer').hide();
				$('.car-goodslist').hide();
				$('section').show();
			}
		})

	}
	
	function judgeCheck(){
		//取消一个勾选即取消全选
		if($('.goods_detail').length ==  $('.change_goods').length){
			$('footer em').html('√').removeClass().addClass('allcheck');
		}else{
			$('footer em').html('').removeClass().addClass('nonecheck');
		}
	}
	//累计结算数量以及计算购物车尾部显示的勾选总价
	function totalPrice(){	
		$('.totalnum').text($('.change_goods').length);
		var priceEle = ($('.change_goods').parent().siblings().find('.next').find('strong'));
		var num = 0;
		priceEle.each(function(idx,ele){
			num += Number($(ele).text().slice(1))*Number($(ele).siblings().find(':text').val());
		});
		$('.totalprice').text('￥'+ num.toFixed(2));
	}
	//数量增减
	function changeQty(opt){
		//获取该商品种类
		var standard = $(opt).closest('div').siblings('.norms').find('small').text();
		var currentNum = $(opt).siblings(':text').val();
		//判断点击事件
		if($(opt).prop('class') == 'decrease_goods'){
			if(currentNum == 1){
				$(opt).siblings(':text').val(currentNum);
				totalPrice();
				//同时存入数据库
				$.post(erp.baseUrl + 'updategoods',{userId:userid,standard:standard,qty:currentNum},function(res){});
				return;
			}
			currentNum--;
		}else if($(opt).prop('class') == 'increase_goods'){
			currentNum++;
		}
		$(opt).siblings(':text').val(currentNum);
		totalPrice();
		//同时存入数据库
		$.post(erp.baseUrl + 'updategoods',{userId:userid,standard:standard,qty:currentNum},function(res){});
	}
})