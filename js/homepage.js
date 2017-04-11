//点击进入添加页面
$('.right_add').click(function(){
	window.location.href = 'inForMation.html'
})
//点击退出登录
$('#quit').click(function(){
	sessionStorage.clear()
	window.location.href = '../index.html'
})


////提交头像
//$(".tx").click(function() { //点击切换头像
//	$("#file_tx").click();
//	$("#file_tx").change(function() {
//		var files = this.files[0],
//			read = new FileReader();
//		read.readAsDataURL(files);
//		read.onload = function() {
//			$(".tx")[0].innerHTML = "<img src='" + this.result + "'/>";
//			$('#header_p').innerHTML = "<img src='" + this.result + "'/>";
//		}
//	})
//});
//弹出层
$("#header_p").click(function() {
	$(".control_mask").css('display', 'block');
//	obj.int($(".header_z"));
});
$('#submit_tx').click(function() {
		$(".control_mask").css('display', 'none');
});
$("#controlClose").click(function() {
//	console.log()
	$(".control_mask").css('display', 'none');
})
//下拉菜单
$('.menu_control').mouseover(function() {
//	console.log()
	$('#alter').attr('src', '../img/down.png');
});
$(".menu_control").mouseout(function() {
	$('#alter').attr('src', '../img/up.png');
})
$(".menu_control").hover(function() {
		$(this).find(".submenu").slideToggle(200);

	})
	//弹出框
//var obj = {
//	now: null,
//	dingshi: null,
//	active: true,
//	int: function(el) {
//		this.now = el;
//		this.x = this.now.offsetLeft;
//		this.y = this.now.offsetTop;
//		this.endX = this.now.offsetLeft;
//		this.endY = this.now.offsetTop;
//		this.now.addEventListener("mousedown", this.down, false);
//		document.addEventListener("mouseup", this.up, false);
//	},
//	down: function(e) {
//		obj.active = true;
//		obj.x = e.clientX - this.offsetLeft;
//		obj.y = e.clientY - this.offsetTop;
//		document.addEventListener("mousemove", obj.move, false);
//		obj.dingshi = setInterval(function() {
//			obj.now.style.left = obj.endX + "px";
//			obj.now.style.top = obj.endY + "px";
//		}, 10);
//	},
//	move: function(e) {
//		if(obj.active) {
//			obj.endX = e.clientX - obj.x;
//			obj.endY = e.clientY - obj.y;
//		} else {
//			return;
//		}
//	},
//	up: function(e) {
//		obj.active = false;
//		clearInterval(obj.dingshi);
//	}
//}
//弹出层
$("#switchover").click(function() {
	$(".header_z").css('display', 'block');
//	obj.int($(".header_z"));
});
$("#loginClose").click(function() {
	$(".header_z").css('display', 'none');
//	$(".login").style.left = document.body.clientWidth / 2 - obj.now.clientWidth / 2 + "px";
//	$(".login").style.top = document.body.clientHeight / 2 - obj.now.clientHeight / 2 + "px";
})

//跑马灯
//$(function() {
//	alert('欢迎登陆！')
//	$('.staff_box').height($('.staff_box div').height() * 2)
//	$('#box').html($('.staff_page').html());
//	var wid = $('.staff_box').height($('#box').height() * 2).height();
//	console.log(wid)
//	var timer = null;
//	clearInterval(timer);
//	timer = setInterval(function() {
//		var ml = parseInt($('.staff_box').css('top'));
//		$('.staff_box').css({
//			'top': --ml
//		});
//		if(ml < -wid / 2) {
//			$('.staff_box').css({
//				'top': 0
//			})
//		}
//	}, 5)
//
//	$('.staff_box').hover(function() {
//		clearInterval(timer)
//	}, function() {
//		timer = setInterval(function() {
//			var ml = parseInt($('.staff_box').css('top'));
//			$('.staff_box').css({
//				'top': --ml
//			})
//			if(ml < -wid / 2) {
//				$('.staff_box').css({
//					'top': 0
//				})
//			}
//		}, 5)
//	});
//})
