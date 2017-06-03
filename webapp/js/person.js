require(['personal-config'],function(){
    require(['jquery'],function($){
      $('.user_img').on('click',function(){
          //显示提示
          $('.tip').stop().fadeIn();
          $('.hei1').stop().fadeIn();
          
      })
      //提示关闭
      $('.btn_close').click(function(){
          $('.tip').stop().fadeOut();
          $('.hei1').stop().fadeOut();
      });
      //拍照选取
      $('.tip_no').on('touchstart',function(){
        navigator.camera.getPicture(function (imageData) {
            // document.getElementById('myImage').src = "data:image/jpeg;base64," + imageData;
            console.log(imageData);
            $('.user_img img').attr('src', imageData);
        }, function (message) {
            console.log('Failed because: ' + message);
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        });
        $('.tip').stop().fadeOut();
        $('.hei1').stop().fadeOut();
      })
      //本地文件
      $('.tip_yes').on('touchstart',function(){
        navigator.camera.getPicture(function (imageData) {
            // document.getElementById('myImage').src = "data:image/jpeg;base64," + imageData;
            console.log(imageData);
            $('.user_img img').attr('src', imageData);
        }, function (message) {
            console.log('Failed because: ' + message);
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            sourceType: 0
        });
        $('.tip').stop().fadeOut();
        $('.hei1').stop().fadeOut();
      })
      var $Htitle = $('title').html();
        $('.Htop').load('../html/personal-header.html',function(){
          return $('.h_2').html($Htitle);
        });
        $('.Hfoot').load('../html/personal-footer.html');

      var obj=JSON.parse(localStorage.getItem("user"));
      console.log(window.localStorage.getItem("user"));
       $('.userxx').html(obj.username);
        //首页
        if($Htitle==='个人中心'){
          //判断有没有注册
     
      //退出的时候删除本地存储
      $('.a-exit').click(function(){
      window.localStorage.removeItem('user');
      alert('退出成功');
      })
          //获取到用户的浏览记录
          // $.post(erp.baseUrl+'personal_index',function(response){
          //    console.log(response);
          //    //判断浏览记录是否存在
          //   if(response.length==0){
          //     var pi = $('<p/>');
          //     pi.html(`<p class="pp-font">暂无浏览记录，点击
          //       <a href="">进入</a>浏览商品</p>`);
          //     $('.shuju').html(pi);
          //   }
          //   //遍历商品
          //   response.map(function(obj){
          //     console.log(123);
          //     console.log(obj);
          //     var li = $('<li/>');
          //     li.html(`
          //         <li class="personalgodsli">
          //           <a href="" class="godslink">
          //           <img src="../images/default.jpg">
          //           <p class="godname">这是商品名</p></a>
          //           <p class="godmoney">￥123</p>
          //           </li>`);
          //     console.log(li);
          //     var $s = $('.perindexListUl').append(li);
          //     $('.shuju').html($s);
          //   });
          // });
        }


        //主页面功能
         // $('.shuju').hide();
         //点击三个导航栏的时候变色
        // $('.tab-ul').on('click','>li',function(){

        //   $(this).addClass('dibu-color').siblings().removeClass('dibu-color');
        //     var idx = $(this).index();
        //     // if(idx == 2){
        //     // //点击查看浏览记录
        //     // $('.shuju').show();
        //     // }else{
        //     //    $('.shuju').hide(); 
        //     // }
        // });
  
    collect();//获取收藏商品
var nowname;
  var nowphone;
  var nowadress;
  //获取当前地址
   // if($Htitle==='地址管理'){
   //   $.post(erp.baseUrl+'getsite',function(response){
   //    console.log(response);
   //    response.map(function(obj){
   //            console.log(123);
   //            console.log(obj);
   //            var li = $('<li/>');
   //            var ul = $('<ul/>');
   //            li.html(`
   //                <li class="showaddress-li">
   //                <a href="adress-nowadd.html" class="adresslink">
   //                <div class="touxiangxi">
   //                <p class="address-name">${obj.usename}</p><p class="adress-phone">${obj.phone}</p></div>
   //                <div class="adress-xiangxi">${obj.address}</div>
   //                <span class="iconfont icon-fanhui addyb"></span>
   //                </a>
   //                </li>`);
   //            console.log(li);
   //            ul.addClass('showccc').append(li);
   //            $('.showbbbox').addClass('showaddress').append(ul);
              
   //          });
   //   })
   // }

  //增加地址
  $('.dq-address').click(function(){
    //获取用户id
    var user = JSON.parse(localStorage.getItem('user'));
    var userid = user.userId;
    var addphone = $('#addphone').val();
    var addname = $('#addname').val();
    var province = $('#province').val();
    province = $('#province option[value='+province+']').text();
    var city = $('#city').val();
    city = $('#city option[value='+city+']').text();
    var county = $('#county').val();
    county = $('#county option[value='+county+']').text();
    var textxiangxi = $('.text-xiangxi').val();
    var address = province + city + county + textxiangxi;
    var addressId = $('#city').val() + parseInt(Math.random()*100000);
    if(addphone===''||addname===''||textxiangxi===''){
      alert('提交的内容不能为空');
      return false;
    }else if(province == '000000' || city == '000000' || county == '000000'){
      alert('省市区必填');
      return false;
    }
    $.post(erp.baseUrl+'addsite',
      {addressId:addressId,userId:userid,username: addname, phone: addphone,address: address},function(response){
        console.log(response);
        location.href = 'personal-address.html';
      })
  })

  //修改地址
  //先获取原页面的数据
   //点击的时候就修改
  // if($Htitle==='编辑地址'){
  //   $.post(erp.baseUrl+'getsite',function(response){
  //         response.map(function(obj){
  //         $('#nowname').val(obj.usename);
  //         $('#nowphone').val(obj.phone);
  //         $('.nows-xiangxi').val(obj.address);
  //       })
  //         }); 
  //         }
  //未付款
  // if($Htitle==='未付款'){
  //   $.post(erp.baseUrl+'personal_index',function(response){
  //            console.log(response);
  //            //判断浏览记录是否存在
  //           if(response.length==0){
  //             $('#main1').html('不存在未付款的订单')
  //           }
  //           //遍历商品
  //           response.map(function(obj){
  //             console.log(123);
  //             console.log(obj);
  //             var li = $('<li/>');
  //             li.html(`
  //                 <li class="weifukuanli">
  //                   <a href="" class="weifukuanlink">
  //                   <img src="../images/default.jpg">
  //                   <p class="weifukuanname">这是商品名</p></a>
  //                   <p class="weifukuanmoney">￥123</p>
  //                   </li>`);
  //             console.log(li);
  //             var s = $('.perindexListUl').append(li);
  //             $('#main1').html(s);
  //           });
  //         });
  // }
  //全部订单
  //  if($Htitle==='全部订单'){
  //   $.post(erp.baseUrl+'personal_index',function(response){
  //            console.log(response);
  //            //判断浏览记录是否存在
  //           if(response.length==0){
  //             $('#main2').html('不存在未付款的订单')
  //           }
  //           //遍历商品
  //           response.map(function(obj){
  //             console.log(123);
  //             console.log(obj);
  //             var li = $('<li/>');
  //             li.html(`
  //                 <li class="weifukuanli">
  //                   <a href="" class="weifukuanlink">
  //                   <img src="../images/default.jpg">
  //                   <p class="weifukuanname">这是商品名</p></a>
  //                   <p class="weifukuanmoney">￥123</p>
  //                   </li>`);
  //             console.log(li);
  //             var s = $('.perindexListUl').append(li);
  //             $('#main2').html(s);
  //           });
  //         });
  // }

  //修改密码
    if($Htitle==='修改密码'){

      var usename = obj.username;
      var usepsw = obj.password;
      $('.changepws').click(function(){
        var ypw = $('#ypw').val();
        var newpw = $('#newpw').val();
        var repw = $('#repw').val();
        if(ypw===''||newpw===''||repw===''){
          return alert('输入的内容不能为空');
        }
        if(ypw!=usepsw){
          return alert('你输入的原密码不正确');
        }
        if(newpw!=repw){
          return alert('新输入的密码和再次输入的不相同');
        }
        
        $.post(erp.baseUrl+'resetpsw',{username: usename,password:newpw},function(response){
        console.log(response);
      })
      })
      
    }
    // if($Htitle==='个人资料'){
    //   $('.btn-info').click(function(){
    //     usename = obj.username;
    //     var useemail = $('.use-email').val();
    //     if(useemail==''){
    //       return alert('不能为空');
    //     }
    //     if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(useemail)){
    //   alert('请输入正确的邮箱');
    //   return false;
    //       }
    //     $.post(erp.baseUrl+'resetemail',{username: usename,email:useemail},function(response){
    //     console.log(response);
    //   })
    //     alert('修改成功');
    //   })
    // }
//红包
$('.redbb').click(function(){
  if($('#red-baobao').val()==''){
    return alert('请输入内容');
  }
  alert('提交成功')
});
//客服
$('.kefu').click(function(){

  if($('#zhuti').val()==''){
    return alert('请输入内容');
  }

  if($('.text-area').val()==''){
    return alert('请输入内容');
  }
  alert('提交成功')
});

//外援
$('.tuiguang').click(function(){

  if($('#shangcity').val()==''){
    return alert('请输入内容');
  }

  if($('#phone').val()==''){
    return alert('请输入内容');
  }
  if($('#repw').val()==''){
    return alert('请输入内容');
  }
  alert('提交成功')
});

if($Htitle==='个人资料'){
   $.post(erp.baseUrl+'email_show',{username:obj.username},function(response){
     $('.use-email').val(response.data);
    });

    $('.change-email').click(function(){
      var emailval = $('.use-email').val();
      $.post(erp.baseUrl+'resetemail',{username:obj.username,email:emailval},function(response){
    });
      alert('修改成功');
   })
}

    var num=1;
    $('.btnjia').click(function(){
      num++;
      
      $('.dd-num1').text(num);
    });
    
    $('.tab1').click(function(){
      collect();
      $(this).closest('.tab-li').css('border-bottom','none').siblings()
      .css({'borderBottomWidth':'1px','borderBottomStyle':'solid','borderBottomColor':'#ccc'});
    })
    $('.tab2').click(function(){
      $('.perindexListUl').html('用户评论正在开发中......敬请期待');
      $(this).closest('.tab-li').css('border-bottom','none').siblings()
      .css({'borderBottomWidth':'1px','borderBottomStyle':'solid','borderBottomColor':'#ccc'});
    })
    $('.tab3').click(function(){
      $('.perindexListUl').html('浏览记录正在开发中......敬请期待');
      $(this).closest('.tab-li').css('border-bottom','none').siblings()
      .css({'borderBottomWidth':'1px','borderBottomStyle':'solid','borderBottomColor':'#ccc'});
    });

    //显示用户收藏商品
    function collect(){
      //获取用户id
      var user = JSON.parse(localStorage.getItem('user'));
      var userid = user.userId;
      $.post(erp.baseUrl + 'fetch',{userId:userid},function(res){
        if(res.status){
          var data = res.data;

          $('.perindexListUl').html(data.map(function(item){
            return `<li class="personalgodsli" data-number=${item.goodsId}>
                    <a href="detail.html?id=${item.goodsId}" class="godslink">
                    <img src="${item.img}">
                    <p class="godname">${item.goodsMsg}</p></a>
                    <p class="godmoney"><strong>${item.vipPrice}</strong><del>${item.price}</del>
                    <span class="del-collect">删除</span></p>
                    </li>`
          }));
          //点击删除商品
          $('.del-collect').click(function(){
            var goodsId = $(this).closest('.personalgodsli').attr('data-number');
            //获取用户id
            var user = JSON.parse(localStorage.getItem('user'));
            var userid = user.userId;
            //删除该节点
            $(this).closest('.personalgodsli').remove();
            $.post(erp.baseUrl + 'del',{
              goodsId:goodsId,
              userId:userid
            },function(res){
              console.log(res);
            })
          })
        }else{
          $('.perindexListUl').html(res.message);
        }
      })
    }
    
});
});