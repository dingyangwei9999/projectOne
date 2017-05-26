$(function(){
	$.get(erp.baseUrl + 'getsession',{},function(res){
		
	})
	//获取数据库中已有商品  显示到页面
	$.get(erp.baseUrl + 'getproduct',function(response){
		var res = JSON.parse(response);
		$('tbody').html(res.map(function(item){
			return `<tr>
						<td><input type="checkbox"></td>
						<td>${item.id}</td>
						<td><img src="../webapp/images/${item.img}" alt="" style="width:40px;"/></td>
						<td>${item.goodsMsg}</td>
						<td>${item.price}</td>
						<td>${item.vipPrice}</td>
						<td>状态</td>
						<td><i class="iconfont icon-xiugai"></i>修改
							<i class="iconfont icon-shanchu"></i>删除
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
	//点击出现功能板块
	$('.user').click(function(){
		$('.admin_set').toggle();
	})
	$('.user_mng').click(function(){
		$('.vip_mng').toggle();
		$(this).css('background-color','#ddd');
	})
	$('.goods_mng').click(function(){
		$('.prt_mng').toggle();
		$(this).css('background-color','#ddd');
	})
	$('.btn_modle').click(function(){
		overlay();
	})
	$('.close').click(function(){
		overlay();
	})
	//添加商品并显示到页面
	$('.sure').click(function(e){
		var _goodsname = $('.goodsname').val();
		var _goodsnum = $('.goodsnum').val();
		var _goodstype = $('.goodstype').val();
		var _goodsprice = $('.goodsprice').val();
		var _goodsvip = $('.goodsvip').val();
		var _goodsurl = $('.goodsurl').val();
		$('form').ajaxSubmit({
			type: 'post',
			url: erp.baseUrl + 'upload',
			clearForm:true,
			success:function(data){
                console.log(data);
                var res = JSON.parse(data);
                var imgurl = res[0].filename;
                $.post(erp.baseUrl + 'addproduct',{
					id:_goodsnum,
					img:imgurl,
					kind1:_goodstype,
					goodsMsg:_goodsname,
					price:_goodsprice,
					vipPrice:_goodsvip
				},function(response){
					console.log(response);
					if(response.status){
						$('<tr><td><input type="checkbox"></td><td>'+Number(_goodsnum)+'</td><td><img src="../upload/'+imgurl+'" alt="" style="width:40px;"/></td><td>'+_goodsname+'</td><td>'+_goodsprice+'</td><td>'+_goodsvip+'</td><td>状态</td><td><i class="iconfont icon-xiugai"></i>修改<i class="iconfont icon-shanchu"></i>删除</td></tr>').appendTo('tbody');
						overlay();
					}else{
						alert('商品ID重复,请确认录入商品');
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
	});
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
						<td><input type="checkbox"></td>
						<td>${item.id}</td>
						<td><img src="../webapp/images/${item.img}" alt="" style="width:40px;"/></td>
						<td>${item.goodsMsg}</td>
						<td>${item.price}</td>
						<td>${item.vipPrice}</td>
						<td>状态</td>
						<td><i class="iconfont icon-xiugai"></i>修改
							<i class="iconfont icon-shanchu"></i>删除
						</td>
					</tr>`
		}))
		})
	})
	//模态框弹出  消失
	function overlay(){
	    var e1 = document.getElementById('modal-overlay');			
	    e1.style.visibility =  (e1.style.visibility == "visible"  ) ? "hidden" : "visible";
	}
})