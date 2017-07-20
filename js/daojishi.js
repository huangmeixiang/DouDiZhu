var tt = 25;
var index = 20;
var tem = setInterval(function() {}, 1000);

function daoshu(temp) {
	index--;
	index = index < 10 && index > 0 ? "0" + index : index;
	$('.clock_num').eq(temp).html(index + 's');

	console.log(index);

	if (index < 0) {
		clearInterval(tem);
		$('.clock').hide();
		noboss()

	}
}
//出牌定时器
var playT = setInterval(function() {}, 1000);

function playdaoshu(play) {
	tt--;
	tt = tt < 10 && tt > 0 ? "0" + tt : tt;
	$('.clock_num').eq(play).html(tt + 's');

	console.log(tt);

	if (tt < 0) {
		clearInterval(playT);
		$('.clock').eq(play).hide();
		no_play(play);

	}
}
/*弹窗提示*/
$('.windowTipA').click(function() {
	$('#window').hide();
	$('#windowA').hide();
	$('#windowB').hide();
	$('#windowC').hide();
});

/*农民,地主胜利*/
$('.donghuaBox').click(function() {
	$('.donghuaBox').hide();
});

/*声音*/
$('.confirm').click(function() {
	$('#audioB')[0].play(); //抢地主
});
$('.cancel').click(function() {
	$('#audioC')[0].play(); //不抢
});
$('.a').click(function() {
	$('#audioH')[0].play();
});
$('.b').click(function() {
	$('#audioI')[0].play();
});

//三个角色的声音
$('.tx1').mouseover(function() {
	$('#audioE')[0].play();
});
$('.tx1').mouseout(function() {
	$('#audioE')[0].pause();
});
$('.tx2').mouseover(function() {
	$('#audioF')[0].play();
});
$('.tx2').mouseout(function() {
	$('#audioF')[0].pause();
});
$('.tx3').mouseover(function() {
	$('#audioG')[0].play();
});
$('.tx3').mouseout(function() {
	$('#audioG')[0].pause();
});

/*弹幕飘过*/
$('#talk_send').click(function() {
	//定义一个变量存储输入的字符串
	$text = $('.talk').val();
	//定义一个变量用来存储top值。最小值是0，最大值是500.
	$top = Math.random() * 460;
	//定义词一个变量存储字体的大小,最小值10，最大值40.
	$font = Math.random() * 30 + 18;
	//设置文字随机颜色
	$arr = ["#f90734", "white", "yellow", "#a8fd03", "#35e981", "#02bffd", "#9507f8", "#1df2e5"];
	//floor(x)向下取整,返回小于或等于x的数
	$num = Math.floor(Math.random() * 8);
	$color = $arr[$num];
	//为p设置随机的速度,最快速度为2000.
	$speed = Math.random() * 8000 + 3000;
	//创建p节点追加到div中
	$('<em></em>').appendTo('.tanMu').text($text).addClass('em tanMu_p').siblings().removeClass('em tanMu_p');
	$('.em').css({
		'font-size': $font
	});
	//获取p的宽度
	$wid = $('.em').width();
	$('.em').css({
		'top': $top,
		'color': $color,
		'right': -$wid
	});
	//设置目的地、速度、运动方式、回调函数
	$(".em").animate({
		"left": -$wid
	}, $speed, "linear", function() {
		$(this).remove();
	});
	$('.talk').val('');
});

$('.sendB').click(function() {
	$('.tipBox').css({
		transition: 'all 1s',
		transform: 'rotateY(180deg)'
	});
	$('.tipBox').css('backface-visibility', 'hidden');
	$('.talkWindow').css({
		transition: 'all 1s',
		transform: 'rotateY(0deg)'
	});
});
$('.hid_A').click(function() {
	$('.talkWindow').css({
		transition: 'all 1s',
		transform: 'rotateY(180deg)'
	});
	$('.talkWindow').css('backface-visibility', 'hidden');
	$('.tipBox').css({
		transition: 'all 1s',
		transform: 'rotateY(0deg)'
	});
});