require.config({
	// baseUrl:'lib'//data-main文件所在的文件夹
	paths : {
		//这里的路径基于baseUrl
        "jquery": "../libs/jquery-3.1.1",
        "lazyload":"../libs/jquery.lazyload",
        "fly":"../libs/jquery.fly",
        "swiper":"../libs/swiper-3.4.2.min",
        "scrollUp":'../libs/jquery.scrollUp'

    },
     shim:{
    	// 表示依赖jquery
        "lazyload":["jquery"],
        "fly":["jquery"],
        "swiper":["jquery"],
        "scrollUp":["jquery"]
    }

})