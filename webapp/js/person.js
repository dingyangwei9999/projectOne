require(['personal-config'],function(){
    require(['jquery'],function($){
    	var $Htitle = $('title').html();
        $('.Htop').load('../html/personal-header.html',function(){
        	return $('.h_2').html($Htitle);
        });
        $('.Hfoot').load('../html/personal-footer.html');

        //首页
        if($Htitle==='个人中心'){
          //判断有没有注册
      // $.get(erp.baseUrl+'login' , function(response){
      //  if(!response.status){
      //    window.location.href = 'login.html';
      //  } else {
      //    $('userxx').text(response.data);
      //  }
      //  console.log(response)
      // });
          //获取到用户的浏览记录
          $.post(erp.baseUrl+'personal_index',function(response){
             console.log(response);
             //判断浏览记录是否存在
            if(response.length==0){
              var pi = $('<p/>');
              pi.html(`<p class="pp-font">暂无浏览记录，点击
                <a href="">进入</a>浏览商品</p>`);
              $('.shuju').html(pi);
            }
            //遍历商品
            response.map(function(obj){
              console.log(123);
              console.log(obj);
              var li = $('<li/>');
              li.html(`
                  <li class="personalgodsli">
                    <a href="" class="godslink">
                    <img src="../images/default.jpg">
                    <p class="godname">这是商品名</p></a>
                    <p class="godmoney">￥123</p>
                    </li>`);
              console.log(li);
              var $s = $('.perindexListUl').append(li);
              $('.shuju').html($s);
            });
          });
        }


        //主页面功能
         $('.shuju').hide();
         //点击三个导航栏的时候变色
        $('.tab-ul').on('click','>li',function(){

        	$(this).addClass('dibu-color').siblings().removeClass('dibu-color');
            var idx = $(this).index();
            if(idx == 2){
            //点击查看浏览记录
            $('.shuju').show();
            }else{
               $('.shuju').hide(); 
            }
        });
  
    //退出的时候删除本地存储
  // $('a-exit').click(function(){
  //   var perval = sessionStorage.getItem("key"); 
  //   sessionStorage.removeItem(perval);
  // })
var nowname;
  var nowphone;
  var nowadress;
  //获取当前地址
   if($Htitle==='地址管理'){
     $.post(erp.baseUrl+'addressss_show',function(response){
      console.log(response);
      response.map(function(obj){
              console.log(123);
              console.log(obj);
              var li = $('<li/>');
              var ul = $('<ul/>');
              li.html(`
                  <li class="showaddress-li">
                  <a href="adress-nowadd.html" class="adresslink">
                  <div class="touxiangxi">
                  <p class="address-name">${obj.usename}</p><p class="adress-phone">${obj.phone}</p></div>
                  <div class="adress-xiangxi">${obj.address}</div>
                  <span class="iconfont icon-fanhui addyb"></span>
                  </a>
                  </li>`);
              console.log(li);
              ul.addClass('showccc').append(li);
              $('.showbbbox').addClass('showaddress').append(ul);
             
            });
     })
   }

  //增加地址
  $('.dq-address').click(function(){
    var addphone = $('#addphone').val();
    var addname = $('#addname').val();
    var textxiangxi = $('.text-xiangxi').val();
    if(addphone===''||addname===''||textxiangxi===''){
      return alert('提交的内容不能为空');
    }
    $.post(erp.baseUrl+'addressss_add',
      {usename: addname, phone: addphone , 
      address: textxiangxi},function(response){
        console.log(response);
      })
  })

  //修改地址
  //先获取原页面的数据
   //点击的时候就修改
  if($Htitle==='编辑地址'){
    $.post(erp.baseUrl+'addressss_show',function(response){
          response.map(function(obj){
          $('#nowname').val(obj.usename);
          $('#nowphone').val(obj.phone);
          $('.nows-xiangxi').val(obj.address);
        })
          }); 
          }
  //未付款
  if($Htitle==='未付款'){
    $.post(erp.baseUrl+'personal_index',function(response){
             console.log(response);
             //判断浏览记录是否存在
            if(response.length==0){
              $('#main1').html('不存在未付款的订单')
            }
            //遍历商品
            response.map(function(obj){
              console.log(123);
              console.log(obj);
              var li = $('<li/>');
              li.html(`
                  <li class="weifukuanli">
                    <a href="" class="weifukuanlink">
                    <img src="../images/default.jpg">
                    <p class="weifukuanname">这是商品名</p></a>
                    <p class="weifukuanmoney">￥123</p>
                    </li>`);
              console.log(li);
              var s = $('.perindexListUl').append(li);
              $('#main1').html(s);
            });
          });
  }
  //全部订单
   if($Htitle==='全部订单'){
    $.post(erp.baseUrl+'personal_index',function(response){
             console.log(response);
             //判断浏览记录是否存在
            if(response.length==0){
              $('#main2').html('不存在未付款的订单')
            }
            //遍历商品
            response.map(function(obj){
              console.log(123);
              console.log(obj);
              var li = $('<li/>');
              li.html(`
                  <li class="weifukuanli">
                    <a href="" class="weifukuanlink">
                    <img src="../images/default.jpg">
                    <p class="weifukuanname">这是商品名</p></a>
                    <p class="weifukuanmoney">￥123</p>
                    </li>`);
              console.log(li);
              var s = $('.perindexListUl').append(li);
              $('#main2').html(s);
            });
          });
  }




});
});

