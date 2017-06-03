$(function(){
	$.get(erp.baseUrl + 'getsession',function(res){
		if(res.status){
			$('.user strong').text(res.data);
		}else{
			location.href = 'login.html';
		}
		
	})
	//获取数据库中已有商品  显示到页面
	$.get(erp.baseUrl + 'fetchproduct',function(response){
		// console.log(response);
		var res = JSON.parse(response);
		$('tbody').html(res.map(function(item){
			return `<tr>
						<td style="width:5%;"><input type="checkbox"></td>
						<td class="goodsid" style="width:5%;">${item.id}</td>
						<td style="width:10%;"><img src="../upload/${item.pic}" alt="" style="width:40px;"/></td>
						<td style="width:40%;">${item.goodsMsg}</td>
						<td style="width:10%;color:#bbb;" class="price"><del>￥${Number(item.price).toFixed(2)}</del></td>
						<td style="width:10%;color:red;" class="vipPrice">￥${Number(item.vipPrice).toFixed(2)}</td>
						<td style="width:10%;color:green;">已启用</td>
						<td style="width:10%;" data-kind1=${item.kind1} data-des=${item.des} 
						data-kind2=${item.kind2} data-kind3=${item.kind3} data-cun=${item.kucun}
						data-states=${item.states}>
						<span class="chgGoods"><i class="iconfont icon-xiugai"></i>修改</span>
							<span class="delGoods"><i class="iconfont icon-shanchu"></i>删除</span>
						</td>
					</tr>`
		}));
		$('.delGoods').mouseenter(function(){
			$(this).css('color','red');
		}).mouseleave(function(){
			$(this).css('color','');
		});
		$('.chgGoods').mouseenter(function(){
			$(this).css('color','red');
		}).mouseleave(function(){
			$(this).css('color','');
		});
		//点击删除
		$('.delGoods').click(function(){
			
			var goodsId = $(this).closest('td').siblings('.goodsid').text();
			$(this).closest('tr').remove();
			$.post(erp.baseUrl + 'delgoods',{id:goodsId},function(res){
				console.log(res);
				
			})
		});
		//修改商品
		$('.chgGoods').click(function(){
			var goodsId = $(this).closest('td').siblings('.goodsid').text();
			var states = $(this).closest('td').attr('data-states');
			var kucun = $(this).closest('td').attr('data-cun');
			var kind1 = $(this).closest('td').attr('data-kind1');
			var kind2 = $(this).closest('td').attr('data-kind2');
			var kind3 = $(this).closest('td').attr('data-kind3');
			var des = $(this).closest('td').attr('data-des');
			var price = $(this).closest('td').siblings('.price').find('del').text().slice(1);
			var vipPrice = $(this).closest('td').siblings('.vipPrice').text().slice(1);
			location.href = 'chg-product.html?id='+goodsId;
		})
	})
	//时间显示
	function currentTime(){ 
		var d=new Date(),str=''; 
		str+=d.getFullYear()+'年'; 
		str+=d.getMonth() + 1+'月'; 
		str+=d.getDate()+'日'; 
		str+=d.getHours()+'时'; 
		str+=d.getMinutes()+'分'; 
		str+= d.getSeconds()+'秒'; 
		return str; 
	}
	setInterval(function(){$('#time').html(currentTime)},1000);
	//添加商品
	$('.btn_modle').click(function(){
		location.href = 'add-product.html';
	})
	//点击出现功能板块
	$('.user').click(function(){
		$('.admin_set').toggle();
	});
	$('.user_mng').click(function(){
		$('.vip_mng').toggle();
		$(this).css('background-color','#ddd');
	});
	$('.goods_mng').click(function(){
		$('.prt_mng').toggle();
		$(this).css('background-color','#ddd');
	});
	$('.delGoods').mouseenter(function(){
		$(this).css('color','red');
		console.log()
	})
	//点击删除
	$('.iconfont').click(function(){

	})
	//查询  商品  并显示到页面
	$('.btn_search').click(function(){
		var keyword = $('.keywords').val();
		console.log(keyword);
		$.post(erp.baseUrl + 'searchproduct',{
			keyword:keyword
		},function(response){
			var res = JSON.parse(response);
			console.log(res);
			$('tbody').html(res.map(function(item){
			return `<tr>
						<td style="width:5%;"><input type="checkbox"></td>
						<td style="width:5%;">${item.id}</td>
						<td style="width:10%;"><img src="../upload/${item.pic}" alt="" style="width:40px;"/></td>
						<td style="width:40%;">${item.goodsMsg}</td>
						<td style="width:10%;color:#bbb;"><del>￥${Number(item.price).toFixed(2)}</del></td>
						<td style="width:10%;color:red;">￥${Number(item.vipPrice).toFixed(2)}</td>
						<td style="width:10%;color:green;">已启用</td>
						<td style="width:10%;"><i class="iconfont icon-xiugai"></i>修改
							<i class="iconfont icon-shanchu"></i>删除
						</td>
					</tr>`
			}))
		})
	});
	$('.keywords').change(function(){
		console.log($(this).val());
		if($(this).val() == ''){
			$.get(erp.baseUrl + 'fetchproduct',function(response){
				// console.log(response);
				var res = JSON.parse(response);
				$('tbody').html(res.map(function(item){
					return `<tr>
								<td style="width:5%;"><input type="checkbox"></td>
								<td class="goodsid" style="width:5%;">${item.id}</td>
								<td style="width:10%;"><img src="../upload/${item.pic}" alt="" style="width:40px;"/></td>
								<td style="width:40%;">${item.goodsMsg}</td>
								<td style="width:10%;color:#bbb;" class="price"><del>￥${Number(item.price).toFixed(2)}</del></td>
								<td style="width:10%;color:red;" class="vipPrice">￥${Number(item.vipPrice).toFixed(2)}</td>
								<td style="width:10%;color:green;">已启用</td>
								<td style="width:10%;" data-kind1=${item.kind1} data-des=${item.des} 
								data-kind2=${item.kind2} data-kind3=${item.kind3} data-cun=${item.kucun}
								data-states=${item.states}>
								<span class="chgGoods"><i class="iconfont icon-xiugai"></i>修改</span>
									<span class="delGoods"><i class="iconfont icon-shanchu"></i>删除</span>
								</td>
							</tr>`
				}));
			})
		}
	})
	
})