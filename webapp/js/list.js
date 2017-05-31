//点击排序时 显示和隐藏判断
$('.sort').on('click', function() {
    if ($('.sorts').css('display') == 'none') {
      if ($('.screens').css('display') == 'block') {
        $('.screens').css('display', 'none');
        $('.screen').css('color', '#000');
      }
      $('.sorts').css('display', 'block');
      $('.sort').css('color', '#ed2b87')
    } else {
      $('.sorts').css('display', 'none');
      $('.sort').css('color', '#000')
    }
  })
  //点击筛选时 显示和隐藏判断
$('.screen').on('click', function() {
  if ($('.screens').css('display') == 'none') {
    if ($('.sorts').css('display') == 'block') {
      $('.sorts').css('display', 'none');
      $('.sort').css('color', '#000');
    }
    $('.screens').css('display', 'block');
    $('.screen').css('color', '#ed2b87')
  } else {
    $('.screens').css('display', 'none');
    $('.screen').css('color', '#000')
  }
})

$('.indexToTop').on('click', function() {
    //创建定时器
    timer = setInterval(function() {
      //获取滚动条高度
      var ostop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      //每次上升高度的20%
      var speed = Math.ceil(ostop / 5);
      //每次上升当前高度的80%
      document.documentElement.scrollTop = document.body.scrollTop = ostop - speed;
      //如果高度为0，清除定时器
      if (ostop == 0) {
        clearInterval(timer);
      }
    }, 30);
  })
  //toTop滚轮滑动时出现
$(window).scroll(function() {
  //console.log($(window).scrollTop())D:\jsdzt
  if ($(window).scrollTop() >= 800) {
    $('.indexToTop').show();
  } else if ($(window).scrollTop() < 800) {
    $('.indexToTop').hide();
  }
});

/*//将数据库中数据导入indexList
$.get('http://localhost:8888/insert', function(response) {


})*/

var list = {
  init: function() {

  },
  ajax: function() {

  }

}
list.init();
var index = {
  init: function() {
    this.getdom();
    this.ajax('default');
    this.click();
  },
  ajax: function(sort,type) {
    $.post('http://localhost:8888/sort?sort='+sort + '&navKeyWord=' + type, {}, function(data) {
      data = JSON.parse(data);
      $('.f-cb').html('');
      if(data.status == 0){
        data.data.map(function(obj) {
          var li = $('<li/>');
          li.html(`
              <a href="../html/detail.html?id=${obj.id}"><img src="../images/${obj.img}" alt=""></a>
              <dt>
                <h4>
                  <a href="" class="title-price">
                    ${obj.goodsMsg}
                  </a>
                </h4>
              </dt>
              <dd>
                <span class="pri-left">
                  <strong class="prife-price">
                    <i>￥${obj.vipPrice}</i>
                  </strong>
                  <small class="ori-price">
                    <i>￥${obj.price}</i>
                  </small>
                </span>
              </dd>
              <dd>
                <span class="pri-right">
                  <i>销量:${obj.sales}件</i>
                </span>
              </dd>
              
              `)
          $('.f-cb').append(li);

        })
      }else{
        alert('获取数据失败');
      }
      
    })
  },
  getdom:function(){
    this.sorts = $('.sorts');
    this.screens = $('.screens');
  },
  click:function(){
    var self = this;
    this.sorts.on('click',function(e){
      if(e.target.tagName == 'LI'){
        $(this).find('li').removeClass('active');
        $(e.target).addClass('active');
        self.ajax($(e.target).attr('type'),self.screens.find('.active').attr('type'));
      }
    })
    this.screens.on('click',function(e){
      if(e.target.tagName == 'LI'){
        $(this).find('li').removeClass('active');
        $(e.target).addClass('active');
        self.ajax(self.sorts.find('.active').attr('type'),$(e.target).attr('type'));
      }
    })
  }
}
index.init();


