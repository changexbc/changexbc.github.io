$(function(){
    var ePageX = 0
    var ePageY = 0
    var num = 0
    var $body = $("body")
    var $page = $(".page")
	var $column = $(".col-btn")
	var $faceitem = $('#face-item span')
	var $slogan = $('#slogan')
	var $wall = $("#photowall")
	var $about = $("#aboutus")
	var $about_list = $('.about-side li')
	var $about_item = $('.about-item')
	var $list = $wall.find("span")
	var $menu = $(".zlk-menu")
	var $btns = $menu.find("s")
	var pagelen = $page.length
	var len = $list.length
	var num = 0;
	var color = ['#1C1C1C','#dfb81e']


	/*判断当前页面*/
	var hash;
    function hashchange(){
	    hash = (!window.location.hash)?"#photowall":window.location.hash;
    	console.log(hash)
	    window.location.hash = hash;
	    switch(hash){
	    	case"#photowall":
	    		num = 0
				gopage(num)
	    		break;
	    	case"#aboutus":
	    		num = 1
	    		gopage(num)
	    		break;
	    	// case"#abv":
	    	// 	num = 3
	    	// 	gopage(num)
	    	// 	break;
	    	// case"#abv":
	    	// 	num = 4
	    	// 	gopage(num)
	    	// 	break;
	    	// case"#abv":
	    	// 	num = 5
	    	// 	gopage(num)
	    	// 	break;
		}
    }
	hashchange()
	window.onhashchange = function(){
		hashchange()
	 }

	/*照片墙*/
	$list.each(function (index,obj) {
		inAnimate(obj,index,'flipin','animation-delay',100,300)
		$(this).children(":not('.big-photo')").css({
			'animation-delay':Math.random()*(-5000+1000+1)-1000+"ms",
			'animation-name':'float',
			'animation-duration':'4s',
			'animation-timing-function':'linear',
			'animation-iteration-count':'infinite'		
		})
	})

	/*菜单图标出现*/
	$btns.each(function (index,obj) {
		inAnimate(obj,index,'metro','animation-delay',100,2000)
	})

	/*移动鼠标角度变化*/
	$body.mousemove(function (event) {
		pageX = event.pageX;
		pageY = event.pageY;
		rx = (pageX - 840) / 360 * 1.1 + 'deg'
		ry = (pageY - 525) / 360 * 2.5 + 'deg'
		 // console.log(rx)
		 // console.log(ry)
		$wall.css({'-webkit-transform':'rotateY('+rx+') rotateX('+ry+')'})
	})

	/*点击栏目跳转*/
	$column.each(function (index,obj) {
		$(this).click(function(){
			num = index + 1
			// console.log(num)
			gopage(num)
		})
	})


	/*点击向右箭头*/
	$('#next').click(function(){
		// console.log(num)
		if(!$page.hasClass('playing')){
			num++
			// console.log(num)
			num > pagelen-1 ? num = pagelen-1 : gopage(num)
		}
	})

	/*点击向左箭头*/
	$('#prev').click(function(){
		if(!$page.hasClass('playing')){
			num--
			console.log(num)
			num < 0 ? num = 0 : gopage(num)
			
		}
	})

	/*跳转方法*/
	function gopage(num){
		$show = $('.show')
		$show.removeClass('show').addClass('playing')
		setTimeout(function(){
			// console.log($show.html())
			$page.removeClass('playing').eq(num).addClass('show');
			$('body').css('background-color',color[num])
		},300)
	}

	/*有你有爱有技术*/

	var words = $slogan.text().split("");
	var innerspan = ''
	for (var i = 0; i < words.length; i++) {
	    innerspan += "<span>" + words[i] + "</span>"
	}

	$slogan.text('').append(innerspan)

	$slogan.find('span').each(function (index,obj) {
		inAnimate(obj,index,'pendulum','animation-delay',150,2400)
	})

	$faceitem.each(function (index,obj) {
		inAnimate(obj,index,'shakedown','animation-delay',100,500)
		$(this).click(function(){
			if(!$(this).hasClass('intro')){
				$faceitem.removeClass('intro').eq(index).addClass('intro')
				$('body').css('background',"#9a7f15")
				// $faceitem.css('-webkit-filter','blur(2px)')
				// $(this).css('-webkit-filter','blur(0px)')
			}
			else{
				$('body').css('background',"#dfb81e")
				// $faceitem.css('-webkit-filter','blur(0px)')
				$faceitem.removeClass('intro')
			}
		})
	})

	/*关于我们左边tab*/
	$about_item.first().addClass('in')

	$about_list.each(function(index){
		$(this).click(function(){
			if(!$(this).find('s').hasClass('current')){
				$about_list.find('s').removeClass('current').eq(index).addClass('current')
				$('.in').removeClass('in').addClass('out')
				$about_item.eq(index).addClass('in')
				setTimeout(function(){
					$('.out').removeClass('out')
				},300)
			}
		})
	})


	/*进入动画*/
	function inAnimate(obj,index,name,mode,delay,interval){
		$(obj).addClass(name).css(mode,delay*index+interval+'ms')
	}

	/*消失动画*/
	function outAnimate(obj,index,inclass,outclass,mode,interval){
		$(obj).removeClass(inclass).addClass(outclass).css(mode,100*(len-index)+interval+'ms')
	}
	
})