$(function(){
	// $.get(erp.baseUrl + 'getsession',{},function(res){
		
	// })
	//获取数据库中已有商品  显示到页面
	$.get(erp.baseUrl + 'fetchproduct',function(response){
		// console.log(response);
		var res = JSON.parse(response);
		$('tbody').html(res.map(function(item){
			return `<tr>
						<td style="width:5%;"><input type="checkbox"></td>
						<td style="width:5%;">${item.id}</td>
						<td style="width:10%;"><img src="../upload/${item.pic}" alt="" style="width:40px;"/></td>
						<td style="width:40%;">${item.goodsMsg}</td>
						<td style="width:10%;color:#bbb;"><del>￥${Number(item.price).toFixed(2)}</del></td>
						<td style="width:10%;color:red;">￥${Number(item.vipPrice).toFixed(2)}</td>
						<td style="width:10%;color:green;">已启用</td>
						<td style="width:10%;"><span class="chgGoods"><i class="iconfont icon-xiugai"></i>修改</span>
							<span class="delGoods"><i class="iconfont icon-shanchu"></i>删除</span>
						</td>
					</tr>`
		}))
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
	})
	
})