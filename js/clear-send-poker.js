// 定义三个玩家的数据为对象，用于保存用户的所有信息
var play_1 = {
	'name': '', //用户的昵称
	'fun': '0', //用户的积分
	'poker': [], //用户的手牌数据
	'role': '0' //用户身份
};
var play_2 = {
	'name': '', //用户的昵称
	'fun': '0', //用户的积分
	'poker': [], //用户的手牌数据
	'role': '0' //用户身份
};
var play_3 = {
	'name': '', //用户的昵称
	'fun': '0', //用户的积分
	'poker': [], //用户的手牌数据
	'role': '0' //用户身份
};

//定义玩家准备出的牌组
//用于记录游戏中的常用数据
var game_data = {
	'boss': null, //用于记录当前牌局中谁是地主
	'play': 0, //用于记录当前牌局当前回合谁出牌
	'multiple': 1, //用于记录当前牌局的倍数
	'before_poker': {
		'model': 0,
		'arr': [],
		'contrast': 0
	}, //用于记录当前牌局中桌面上的牌(只是上一回合)
	'action': {
		'model': 0,
		'arr': [],
		'contrast': 0
	} //用于保存当前玩家准备要出的牌
}
var mins = 0; //定义一个变量，用来决定第一次抢地主的按钮出现在那个位置
//定义一个空变量，以便全局定时器的调用
var clock = null;
// off为统计连续按不出牌的次数，-1是为了地主第一回合不能过牌
var off = -1;
/*
	初始化生成牌堆
*/
$('.all_poker').html(makeAllPoker()); // 在页面对应的位置生成初始牌组

/*
	初始化牌组数据，可以数组保存。
	由于一张牌内容实际上是由两种数据组合而成。
	所以我们可以模拟出一个数据或字符规则进行保存。
	例子：  方块 A ：  1_1;
			梅花 A ：  1_2;
			红桃 A ：  1_3;
			黑桃 A ：  1_4;
			红桃 9 ：  9_3;
						点数_花色
*/
var all_poker = Array('14_0', '14_1');
for (var i = 1; i <= 13; i++) {
	for (var j = 0; j <= 3; j++) {
		all_poker.push(i + '_' + j);
	}
}

// 生成初始牌组HMTL代码的方法
function makeAllPoker() {
	var l = '';
	for (i = 0; i < 54; i++) {
		l += '<li class="back" style="top:-' + (i) + 'px;"></li>';
	}
	return l;
}

/*
	执行洗牌动画
*/
var click = 0;
// 使用监听事件来绑定触发事件元素，为了防止元素更改后绑定的事件失效。
$('.mid_top').on('click', '.all_poker li', function() {

	if (click == 0) {
		// 调用洗牌动画方法
		clearPoker();

		// 把牌组数据顺序打乱
		for (var i = 0; i < 3; i++) {
			all_poker.sort(function(x, y) {
				return Math.random() - 0.5;
			});
		}

		// 洗牌后增加点击事件，用于判断下次点击执行什么方法
		click++;
	} else if (click == 1) {
		// 调用发牌方法
		startPoker(17);
		click++;
	} else if (click == 2) {
		console.log(play_1);
		console.log(play_2);
		console.log(play_3);
	}
});

// 洗牌的方法
function clearPoker() {

	// 1、先保存后面需要恢复的HTML代码
	var all_poker_html = $('.mid_top').html();
	startAll();
	//		// 删除临时牌组，恢复原样
	setTimeout(function() {
		$('.all_new_poker').remove(); // 因为动画需要时间执行，所以以恢复原样的语句需要等动画执行完毕后再执行。
		// 把原代码重新放回页面中，实现恢复原样
		$('.mid_top').html(all_poker_html);
	}, 8500);
}

// 发牌的方法
function startPoker(number) {

	// 给左边玩家发牌
	$('.all_poker li:last').animate({
		left: '-450px',
		top: '200px'
	}, 100);
	// 牌发下去后就删除
	setTimeout(function() {
		$('.all_poker li:last').remove();
		play_1.poker.push(all_poker[all_poker.length - 1]); // 最总牌堆中最后数据放到玩家1数据中
		var poker_html = makePoker(play_1.poker[play_1.poker.length - 1]);
		$('.play_1').append(poker_html);
		$('.play_1 li:last').css({
			'left': '100px',
			'top': (20 - number) * 18 + 'px',
			'transform': 'rotateZ(90deg)'
		});
		all_poker.pop(); // 放完数据后总牌组中就没有该数据了.

		$('#audioD')[0].play(); //发牌声音
		setTimeout(function() {
			$('#audioD')[0].pause();
		}, 230);

	}, 110);

	// 给中间玩家发牌
	setTimeout(function() {
		$('.all_poker li:last').animate({
			top: '450px'
		}, 100);
		setTimeout(function() {
			$('.all_poker li:last').remove();

			// 最总牌堆中最后数据放到玩家1数据中
			play_2.poker.push(all_poker[all_poker.length - 1]);
			// 通过传参，把对应数据的牌面HTML代码生成
			var poker_html = makePoker(play_2.poker[play_2.poker.length - 1]);
			$('.play_2').append(poker_html);
			$('.play_2 li:last').css({
				'left': (17 - number) * 18 + 'px'
			});
			$('.play_2').css({
				'left': -(17 - number) * 9 + 'px'
			})

			all_poker.pop(); // 放完数据后总牌组中就没有该数据了。
		}, 100);

	}, 120);

	// 给右边玩家发牌
	setTimeout(function() {
		$('.all_poker li:last').animate({
			left: '450px',
			top: '200px'
		}, 100);
		// 牌发下去后就删除
		setTimeout(function() {
			$('.all_poker li:last').remove();
			play_3.poker.push(all_poker[all_poker.length - 1]); // 最总牌堆中最后数据放到玩家1数据中
			var poker_html = makePoker(play_3.poker[play_3.poker.length - 1]);
			$('.play_3').append(poker_html);
			$('.play_3 li:last').css({
				'right': '100px',
				'top': (number + 3) * 18 + 'px',
				'transform': 'rotateZ(-90deg)'
			});
			all_poker.pop(); // 放完数据后总牌组中就没有该数据了。
		}, 100);

		if (--number > 0) {
			// 使用自调函数调整好所有时间，后再执行自己
			setTimeout(function() {
				startPoker(number);
			}, 100);
		} else {
			setTimeout(function() {
				endStartPok()
			}, 100); //发牌结束后的方法
		}
	}, 230);
}

//发牌结束后执行的方法
//牌组排序的方法
function endStartPok() {
	play_1.poker = sortPoker(play_1.poker);
	play_2.poker = sortPoker(play_2.poker);
	play_3.poker = sortPoker(play_3.poker);
	setTimeout(function() {
		$('.play_1 li').css({
			'background': ''
		}).addClass("back");
		$('.play_2 li').css({
			'background': ''
		}).addClass("back");
		$('.play_3 li').css({
			'background': ''
		}).addClass("back");
	}, 1000)
	setTimeout(function() {
		$('.play_1 li').remove();

		for (var i = 0; i < play_1.poker.length; i++) {
			var l = makePoker(play_1.poker[i]);
			$('.play_1').append(l);
			$('.play_1 li:last').css({
				'left': '100px',
				'top': (i + 3) * 18 + 'px',
				'transform': 'rotateZ(90deg)'
			});
		}
		$('.play_2 li').remove();
		for (var i = 0; i < play_2.poker.length; i++) {
			var l = makePoker(play_2.poker[i]);
			$('.play_2').append(l).css({
				left: (-9 * i) + 'px'
			});
			$('.play_2 li:last').css({
				left: (18 * i) + 'px'
			});
		}
		$('.play_3 li').remove();
		for (var i = 0; i < play_3.poker.length; i++) {
			var l = makePoker(play_3.poker[i]);
			$('.play_3').append(l).css({
				left: (-9 * i) + 'px'
			});
			$('.play_3 li:last').css({
				'right': '100px',
				'top': (20 - i) * 18 + 'px',
				'transform': 'rotateZ(90deg)'
			});
		}
	}, 2000)
	setTimeout(function() {
		getLandlord();
	}, 2100);

	/*显示用户头像的动画*/
	$('.tx1').slideDown(500);

	$('.tx2').css("display", "block");
	$('.tx2').animate({
		top: '80px'
	}, 500);
	$('.tx2').animate({
		top: '40px'
	}, 300);

	$('.tx3').slideDown(500);

	/*显示弹幕窗口*/
	$('.tanMu').css('display', 'block');
	$('.tipBox').slideDown(1000);

}

//排序牌
function sortPoker(data) {
	data.sort(function(x, y) {
		x = x.split('_');
		y = y.split('_');
		if (x[0] != y[0]) {
			return y[0] - x[0];
		} else {
			return y[1] - x[1];
		}
	});
	return data;
}

// 生成牌HTML代码的方法
function makePoker(poker_data) {
	var arr = poker_data.split('_'); // 字符串分割后下标为0的是点数，下标为1是花色
	var color = Array(
		[-17, -225], // 方块花色图片的坐标
		[-17, -5], // 梅花花色图片的坐标
		[-162, -5], // 红桃花色图片的坐标
		[-162, -225] // 黑桃花色图片的坐标
	);

	// 通过牌组的花色与坐标集数组，生成对就数据的图片坐标
	if (arr[0] != 14) {
		var x = color[arr[1]][0];
		var y = color[arr[1]][1];
	} else {
		if (arr[1] == 0) {
			var x = -162;
			var y = -5;
		} else {
			var x = -17;
			var y = -5;
		}
	}

	return '<li style="width: 125px; height: 175px; background: url(./img/' + arr[0] + '.png) ' + x + 'px ' + y + 'px;" data-value="' + poker_data + '"></li>';
}

var c_num = 0; // 取消的次数 
// 随机一个值来开始进行抢地主
var temp = Math.round(Math.random() * 3 - 0.5);
//第7步抢地主方法
function getLandlord() {

	console.log(temp);
	$('.getLandlord').eq(temp).show();
	$('.clock').eq(temp).show();
	tem = setInterval(function() {
		daoshu(temp)
	}, 1000);

	// 绑定选抢地主的事件
	$('.getLandlord .confirm').click(function() {
		// 通过当前的temp这个临时值来决定谁是地主
		switch (temp) {
			case 0:
				// 分配身份角色
				play_1.role = 2;
				play_2.role = 1;
				play_3.role = 1;

				$('.getLandlord').eq(temp).hide();
				$('.clock').eq(temp).hide();
				for (var i = 0; i < 3; i++) {
					// 把总牌堆中的值发给玩家手牌中
					play_1.poker.push(all_poker[i]);
					// 生成对应牌面HTML代码
					var poker_html = makePoker(all_poker[i]);
					$('.play_1').append(poker_html);
					$('.play_1 li:last').css({
						'left': '100px',
						'top': -(i - 3) * 18 + 'px',
						'transform': 'rotateZ(90deg)'
					});
				}
				clearInterval(tem);
				game_data.boss = 0; //记录当前谁是地主
				game_data.play = 0; //记录当前谁在打牌
				//调用打牌的方法
				playPoker(game_data.play);

				//显示地主魔法阵图片
				$('.posA').show();

				break;
			case 1:
				// 分配身份角色
				play_1.role = 1;
				play_2.role = 2;
				play_3.role = 1;
				$('.getLandlord').eq(temp).hide();
				$('.clock').eq(temp).hide();
				console.log(all_poker);
				// 把最后三张牌给主地
				for (var i = 0; i < 3; i++) {
					console.log(all_poker[i]);

					// 把总牌堆中的值发给玩家手牌中
					play_2.poker.push(all_poker[i]);

					// 生成对应牌面HTML代码
					var poker_html = makePoker(all_poker[i]);
					$('.play_2').append(poker_html);
					$('.play_2 li:last').css({
						'left': (17 + i) * 18 + 'px'
					});
				}

				clearInterval(tem);
				game_data.boss = 1;
				game_data.play = 1;
				playPoker(game_data.play);

				//显示地主魔法阵图片
				$('.posB').show();
				break;
			case 2:
				play_1.role = 1;
				play_2.role = 1;
				play_3.role = 2;
				$('.getLandlord').eq(temp).hide();
				$('.clock').eq(temp).hide();

				console.log(all_poker);
				// 把最后三张牌给主地
				for (var i = 0; i < 3; i++) {
					console.log(all_poker[i]);

					// 把总牌堆中的值发给玩家手牌中
					play_3.poker.push(all_poker[i]);

					// 生成对应牌面HTML代码
					var poker_html = makePoker(all_poker[i]);
					$('.play_3').append(poker_html);
					$('.play_3 li:last').css({
						'right': '100px',
						'top': (20 - i) * 18 + 'px',
						'transform': 'rotateZ(90deg)'
					});
				}

				clearInterval(tem);
				game_data.boss = 2;
				game_data.play = 2;
				playPoker(game_data.play);

				//显示地主魔法阵图片
				$('.posC').show();
				break;
		}

		showLandlord();
		AsortPoker()
	});

}
// 绑定不抢地主的事件
$('.getLandlord .cancel').click(function() {
	noboss();
});
$('.newstart').click(function() {
	window.location.reload(true);
})
$('.new_s').click(function() {
	window.location.reload(true);
})
$('.donghuaC').click(function() {
		window.location.reload(true);
	})
	//不抢地主方法
function noboss() {
	if (++c_num > 2) {

		/*没人抢地主时弹窗*/
		$('#window').show();
		$('.windowTip').html('妈卖批,没人抢地主还玩个毛线啊！');

		$('.getLandlord').hide();
		$('.clock').hide();
		clearInterval(tem);
		$('#audioA')[0].pause();

		return false;
	}

	// 进行顺序出现相应的内容
	temp = (++temp) > 2 ? 0 : temp;
	clearInterval(tem);
	$('.clock').hide();
	$('.getLandlord').hide();
	$('.getLandlord').eq(temp).show();
	$('.clock').eq(temp).show();
	index = 20;
	tem = setInterval(function() {
		daoshu(temp)
	}, 1000);

}
//第8步显示地主牌
function showLandlord() {
	$('.all_poker li:last').animate({
		left: '200px'
	}, 100);
	setTimeout(function() {
		$('.all_poker li:last').remove();
		var poker_html = makePoker(all_poker[0]);
		$('.all_poker').append(poker_html);
		$('.all_poker li:last').css({
			'left': '200px'
		});
	}, 110)

	setTimeout(function() {
		$('.all_poker li').eq(0).animate({
			left: '-200px'
		}, 100);
		setTimeout(function() {
			$('.all_poker li').eq(0).remove();
			var poker_html = makePoker(all_poker[1]);
			$('.all_poker').append(poker_html);
			$('.all_poker li:last').css({
				'left': '-200px'
			});
		}, 110)
	}, 120)

	setTimeout(function() {
		$('.all_poker li').eq(0).remove();
		var poker_html = makePoker(all_poker[2]);
		$('.all_poker').append(poker_html);
		$('.all_poker li:last').css({
			'left': '0px'
		});
	}, 240)
	setTimeout(function() {

		$('.all_poker').css({
			transform: 'scale(0.5)'
		})
	}, 480)
	setTimeout(function() {

		$('.all_poker').css({
			top: '-100px'
		})
	}, 490)
	setTimeout(function() {
		$('.jifenBox').show();
	}, 500)
}

//	//再次排序
function AsortPoker() {
	play_1.poker = sortPoker(play_1.poker); // 玩家手牌地进行排序
	play_2.poker = sortPoker(play_2.poker); // 玩家手牌地进行排序
	play_3.poker = sortPoker(play_3.poker); // 玩家手牌地进行排序
	$('.play_1 li').remove();
	for (var i = 0; i < play_1.poker.length; i++) {
		var l = makePoker(play_1.poker[i]);
		$('.play_1').append(l);
		$('.play_1 li:last').css({
			'left': '100px',
			'top': (i + 3) * 18 + 'px',
			'transform': 'rotateZ(90deg)'
		});
		for (var j = 0; j < all_poker.length; j++) {
			if (all_poker[j] == play_1.poker[i]) {
				$('.play_1 li:eq(' + i + ')').css({
					left: '120px'
				}).attr('on', 1)
			}
		}
	}
	//中间牌
	$('.play_2 li').remove();
	for (var i = 0; i < play_2.poker.length; i++) {
		var l = makePoker(play_2.poker[i]);
		$('.play_2').append(l).css({
			left: (-9 * i) + 'px'
		});
		$('.play_2 li:last').css({
			left: (18 * i) + 'px'
		});
		for (var j = 0; j < all_poker.length; j++) {
			if (all_poker[j] == play_2.poker[i]) {
				$('.play_2 li:eq(' + i + ')').css({
					top: '-20px'
				}).attr('on', 1)
			}
		}
	}
	//右边牌
	$('.play_3 li').remove();
	for (var i = 0; i < play_3.poker.length; i++) {
		var l = makePoker(play_3.poker[i]);
		$('.play_3').append(l).css({
			left: (-9 * i) + 'px'
		});
		$('.play_3 li:last').css({
			'right': '100px',
			'top': (20 - i) * 18 + 'px',
			'transform': 'rotateZ(-90deg)'
		});
		for (var j = 0; j < all_poker.length; j++) {
			if (all_poker[j] == play_3.poker[i]) {
				$('.play_3 li:eq(' + i + ')').css({
					right: '120px'
				}).attr('on', 1)
			}
		}
	}
}

//排序并且重新生成手牌函数
function paixu(num) {
	// 当传进来的值为0时，排序玩家一的手牌
	// 当传进来的值为1时，排序玩家二的手牌
	// 当传进来的值为2时，排序玩家三的手牌
	if (num == 0) {
		sortPoker(play_1.poker);
		$('.play_1 li').remove();
		for (var i = 0; i < play_1.poker.length; i++) {
			var l = makePoker(play_1.poker[i]);
			$('.play_1').append(l);
			$('.play_1 li:last').css({
				'left': '100px',
				'top': (i + 3) * 18 + 'px',
				'transform': 'rotateZ(90deg)'
			});
		}
	}
	if (num == 1) {
		sortPoker(play_2.poker);
		$('.play_2 li').remove();
		for (var i = 0; i < play_2.poker.length; i++) {
			var l = makePoker(play_2.poker[i]);
			$('.play_2').append(l).css({
				left: (-9 * i) + 'px'
			});
			$('.play_2 li:last').css({
				left: (18 * i) + 'px'
			});
		}
	}
	if (num == 2) {
		sortPoker(play_3.poker);
		$('.play_3 li').remove();
		for (var i = 0; i < play_3.poker.length; i++) {
			var l = makePoker(play_3.poker[i]);
			$('.play_3').append(l).css({
				left: (-9 * i) + 'px'
			});
			$('.play_3 li:last').css({
				'right': '100px',
				'top': (20 - i) * 18 + 'px',
				'transform': 'rotateZ(-90deg)'
			});
		}
	}
}

function actionPoker(obj) {
	game_data.action.arr = [];
	$('body').on('click', '.play_' + (obj + 1) + ' li', function() {
		if ($(this).attr('on') == 1) {
			if (obj == 0) {
				$(this).animate({
					left: '100px'
				}, 100).attr('on', 0); //玩家1选的牌归位
			}
			if (obj == 1) {
				$(this).animate({
					top: '0px'
				}, 100).attr('on', 0); //玩家2选的牌归位
			}
			if (obj == 2) {
				$(this).animate({
					right: '100px'
				}, 100).attr('on', 0); //玩家3选的牌归位
			}
			for (var i = 0; i < game_data.action.arr.length; i++) {
				if (game_data.action.arr[i] == $(this).attr('data-value')) {
					game_data.action.arr.splice(i, 1);
					break;
				}
			}
		} else {
			if (obj == 0) {
				$(this).animate({
					left: '120px'
				}, 100).attr('on', 1); //玩家1选的牌右移
			}
			if (obj == 1) {
				$(this).animate({
					top: '-20px'
				}, 100).attr('on', 1); //玩家2选的牌上移
			}
			if (obj == 2) {
				$(this).animate({
					right: '120px'
				}, 100).attr('on', 1); //玩家3选的牌左移
			}
			game_data.action.arr.push($(this).attr('data-value'));
			//玩家牌组中对应的牌的属性值 添加到 玩家准备出的牌组数据中
		}
	})
}

//打牌的方法
function playPoker(play) {
	tt = 25;
	$('.play_btn').hide().eq(play).show();
	$('.clock').eq(play).show();
	playT = setInterval(function() {
		playdaoshu(play)
	}, 1000);
	if (play == 0) {
		actionPoker(0)
	} else if (play == 1) {
		actionPoker(1)
	} else {
		actionPoker(2)
	}
	//出牌的事件 :点击事件 2次 ,所以我们要先解绑再重新绑定
	$('.play_btn').eq(play).find('.play').unbind("click");
	$('.play_btn').eq(play).find('.play').click(function() {

		console.log('当前off的值为：' + off);
		checkPoker(game_data.action);
		if (game_data.action.model == 0) {
			//===========================================================				
			$('#windowC').show();
			$('.tipImgD').html('靓仔,你的牌型有问题！！');
			//alert('你出的牌不符合规则，请重新选择1。');
			return false;
		}
		// 玩家出的牌跟桌面的牌进行对比,将对比结果存入到res中
		var res = contrastPoker(game_data.action, game_data.before_poker);
		off = 0;
		if (res) {
			console.log(game_data.action.arr);
			console.log(game_data.before_poker.arr);
			// 由于有数组类型赋值，所以要分开一个一个
			game_data.before_poker.model = game_data.action.model;
			game_data.before_poker.contrast = game_data.action.contrast;
			game_data.before_poker.arr = [];
			$('.content li').remove();
			for (var i = 0; i < game_data.action.arr.length; i++) {
				game_data.before_poker.arr[i] = game_data.action.arr[i];
				// 将打出去的牌显示在舞台中央，不居中
				var landlord = makePoker(game_data.before_poker.arr[i]);
				$('.content').append(landlord);
				$('.content li:last').animate({
					left: (i + 7) * 30 + 'px'
				}, 1000);
				$('.content').css({
					left: i * 10 + 'px'
				});
				console.log('OK?3');
			}
			console.log(game_data.before_poker.arr);

			switch (game_data.play) {
				case 0:
					//第一个循环的作用是用来遍历打出去的牌
					for (var i = 0; i < game_data.action.arr.length; i++) {
						//第二个循环的作用是用来遍历玩家手中所剩余的牌
						for (var j = 0; j < play_1.poker.length; j++) {
							if (play_1.poker[j] == game_data.action.arr[i]) {
								play_1.poker.splice(j, 1); //从玩家一的手牌中，删除一个位于数组J位置的手牌
							}
						}
					}
					paixu(play); //出完牌后重新排序
					console.log('上一个玩家剩余手牌：' + play_1.poker);
					console.log('上一个玩家剩余手牌数：' + play_1.poker.length);
					// 删除完已经打出的牌后进行判断，是否已经没有手牌
					if (play_1.poker.length == 0) {
						if (play_1.role == 1) {
							clearInterval(playT);
							$('.dA').show();

							$('#audioQ')[0].play();
						} else {
							clearInterval(playT);
							$('#audioQ')[0].play();
							$('.dB').show();
						}
						$('#audioA')[0].pause();
						return false;
					}
					break;

				case 1:
					//第一个循环的作用是用来遍历打出去的牌
					for (var i = 0; i < game_data.action.arr.length; i++) {
						//第二个循环的作用是用来遍历玩家手中所剩余的牌
						for (var j = 0; j < play_2.poker.length; j++) {
							if (play_2.poker[j] == game_data.action.arr[i]) {
								play_2.poker.splice(j, 1); //从玩家一的手牌中，删除一个位于数组J位置的手牌
							}
						}
					}
					paixu(play); //出完牌后重新排序
					console.log('上一个玩家剩余手牌：' + play_2.poker);
					console.log('上一个玩家剩余手牌数：' + play_2.poker.length);
					// 删除完已经打出的牌后进行判断，是否已经没有手牌
					if (play_2.poker.length == 0) {
						if (play_2.role == 1) {
							clearInterval(playT);
							$('.dA').show();
							$('#audioQ')[0].play();
						} else {
							clearInterval(playT);
							$('.dB').show();
							$('#audioQ')[0].play();
						}
						return false;
					}
					break;

				case 2:
					//第一个循环的作用是用来遍历打出去的牌
					for (var i = 0; i < game_data.action.arr.length; i++) {
						//第二个循环的作用是用来遍历玩家手中所剩余的牌
						for (var j = 0; j < play_3.poker.length; j++) {
							if (play_3.poker[j] == game_data.action.arr[i]) {
								play_3.poker.splice(j, 1); //从玩家一的手牌中，删除一个位于数组J位置的手牌
							}
						}
					}
					paixu(play); //出完牌后重新排序
					console.log('上一个玩家剩余手牌：' + play_3.poker);
					console.log('上一个玩家剩余手牌数：' + play_3.poker.length);
					// 删除完已经打出的牌后进行判断，是否已经没有手牌
					if (play_3.poker.length == 0) {
						if (play_3.role == 1) {
							clearInterval(playT);
							$('.dA').show();
							$('#audioQ')[0].play();
						} else {
							clearInterval(playT);
							$('.dB').show();
							$('#audioQ')[0].play();
						}
						return false;
					}
					break;
			}
			//出完牌后，到下一个玩家出牌
			//解绑事件
			$('body').off('click', '.play_' + (play + 1) + ' li');
			// 切换到下一个玩家出牌

			game_data.play = (++game_data.play > 2) ? 0 : game_data.play;
			clearInterval(playT);
			$('.clock').eq(play).hide();
		} else {
			return false;
		}
		playPoker(game_data.play);
	});
	//过牌的事件 
	$('.play_btn').eq(play).find('.not_play').unbind("click");
	$('.play_btn').eq(play).find('.not_play').click(function() {
		no_play(play);
	});
}

function no_play(play) {

	$('.poks').eq(play).find('li').css({
		'top': '0px'
	}).attr('on', 0);
	if (off == -1) {
		//=============================================================
		$('.windowA').show();
		$('.tipImgB').html('地主首轮不可以不出牌哦!');

		$('.play_btn').eq(play).find('.not_play').unbind("click");
		off = 0;
		return false;
	}
	off++;
	if (off > 2) {
		$('.windowB').show();
		$('.tipImgC').html('这一轮你不可以不出牌的!');

		off = 2;
		return false;
	}
	//解绑事件
	$('body').off('click', '.play_' + (play + 1) + ' li');
	// 切换到下一个玩家出牌
	game_data.play = (++game_data.play > 2) ? 0 : game_data.play;
	$('.clock').eq(play).hide();
	clearInterval(playT);
	tt = 25;

	console.log('当前off的值为：' + off);
	playPoker(game_data.play);
}

function contrastPoker(now, before) {
	if (off == 2) {
		return true;
	}
	// 先判断所有可以直出牌的情况
	if (before.model == 0 || now.model == 110) {
		return true;
	}

	// 单独判断大小王
	if (now.contrast == 14 && before.contrast == 14) {
		var now_color = now.arr[0].substr(-1);
		var before_color = before.arr[0].substr(-1);
		if (now_color > before_color) {
			return true;
		} else {
			$('.windowC').show();
			$('.tipImgD').html('恕我直言</br>你的牌不符合规则！');
			return false;
		}
	}

	// 判断可以对比牌大小的情况
	if (now.model == before.model && now.arr.length == before.arr.length || now.model == 4) {
		if (now.model != 4 && now.contrast > before.contrast) {
			return true;
		} else if (now.model == 4 && before.model != 4) {
			return true;
		} else if (now.contrast > before.contrast) {
			return true;
		} else {
			$('.windowC').show();
			$('.tipImgD').html('恕我直言</br>你的牌不符合规则！');
			return false;
		}
	} else {
		$('.windowC').show();
		$('.tipImgD').html('恕我直言</br>你的牌不符合规则！');
		return false;
	}
}
/*
     检查牌型方法
  model的代码表示；
  0:无效牌
  1：单牌
  2：对子
  3:3张
  4：三带一
  5:顺子
  6:三带二
  7:连对
  8:四带二
  9:飞机
  100:普通炸弹
  110：王炸
 
 */
function checkPoker(a_obj) {
	// 先把牌组数据进行重新排序，方便后面的判断
	a_obj.arr = sortPoker(a_obj.arr);

	// 遍历牌组数据，进行点数与花色分离
	var temp = Array();
	for (var i = 0; i < a_obj.arr.length; i++) {
		console.log(a_obj.arr)
		temp.push(a_obj.arr[i].split('_'));
		temp[i][0] = parseInt(temp[i][0]);
	}

	// 通过数据长度来进行判断本次牌型
	switch (temp.length) {
		// 判断一张牌的情况
		case 1:
			a_obj.model = 1; // 设置牌型单张
			a_obj.contrast = temp[0][0]; // 设置单张的判断值

			break;
			// 判断两张牌的情况
		case 2:
			if (temp[0][0] != temp[1][0]) {
				a_obj.model = 0; // 设置为无效牌型
				a_obj.contrast = 0;
			} else {
				if (temp[0][0] == 14) {
					a_obj.model = 110; // 设置为王炸牌型
					a_obj.contrast = 14; // 设置王炸的判断值
					$('#audioR')[0].play();

					//炸弹动画
					$('.donghuaD').show();
					setTimeout(function() {
						$('.donghuaD').hide();
					}, 2000);
				} else {
					a_obj.model = 2; // 设置为对子
					a_obj.contrast = temp[0][0]; // 设置对子的判断值						
				}
			}
			break;
			// 判断三张牌的情况 
		case 3:
			if (temp[0][0] == temp[2][0]) {
				a_obj.model = 3; // 设置牌型为3张
				a_obj.contrast = temp[0][0];
			} else {
				a_obj.model = 0;
				a_obj.contrast = 0;
			}
			break;
			// 判断四张牌的情况
		case 4:
			if (temp[0][0] == temp[1][0] && temp[0][0] == temp[2][0] && temp[0][0] == temp[3][0]) {
				a_obj.model = 4; // 设置牌型为普通炸弹
				a_obj.contrast = temp[0][0]; // 设置普通炸弹的判断值
				$('#audioK')[0].play();
				//炸弹动画
				$('.donghuaA').show();
				setTimeout(function() {
					$('.donghuaA').hide();
				}, 2000);

			} else if (temp[0][0] == temp[2][0] || temp[1][0] == temp[3][0]) {
				a_obj.model = 5; // 设置牌型为3带1
				a_obj.contrast = temp[1][0]; // 设置3带1的判断值
				$('#audioL')[0].play();

			} else {
				a_obj.model = 0;
				a_obj.contrast = 0;
			}
			break;

			// 判断五张牌的情况
		case 5:
			if (checkStraight(temp)) {
				a_obj.model = 6; // 设置牌型为顺子
				a_obj.contrast = temp[0][0]; // 设置顺子的判断值
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);

			} else if (temp[0][0] == temp[1][0] && temp[1][0] == temp[2][0] && temp[3][0] == temp[4][0] || temp[0][0] == temp[1][0] && temp[2][0] == temp[3][0] && temp[3][0] == temp[4][0]) {
				a_obj.model = 7; // 设置牌型为三带二
				a_obj.contrast = temp[2][0]; // 设置3带2的判断值
				$('#audioM')[0].play();
			} else {
				a_obj.model = 0;
				a_obj.contrast = 0;
			}
			break;

			// 判断六张牌的情况
		case 6:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			} else if (continPair(temp)) {
				a_obj.model = 8; // 设置牌型为连对
				a_obj.contrast = temp[0][0]; // 设置连对的判断值
				$('#audioO')[0].play();

			} else if (fDieT(temp)) {
				a_obj.model = 9; // 设置牌型为四带2
				a_obj.contrast = temp[2][0]; // 设置4带2的判断值
				$('#audioP')[0].play();
			} else {
				a_obj.model = 0;
				a_obj.contrast = 0;
			}
			break;

			// 判断七张牌的情况
		case 7:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			} else {
				a_obj.model = 0;
				a_obj.contrast = 0;
			}
			break;

			// 判断八张牌的情况
		case 8:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			} else if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			} else if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];
				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
				setTimeout(function() {
					$('.donghuaB').hide();
				}, 1000);
			}
			break;
			//判断九张牌的情况
		case 9:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);

			}
			break;
			//判断10张牌的情况
		case 10:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			} else if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			} else if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];

				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
			}
			setTimeout(function() {
				$('.donghuaB').hide();
			}, 1000);
			break;
			//判断11张牌的
		case 11:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			}
			break;
			//判断12张牌的
		case 12:
			if (checkStraight(temp)) {
				a_obj.model = 6;
				a_obj.contrast = temp[0][0];
				$('#audioS')[0].play();
				//顺子动画
				$('.donghuaE').show();
				setTimeout(function() {
					$('.donghuaE').hide();
				}, 2000);
			} else if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			} else if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];

				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
			}
			setTimeout(function() {
				$('.donghuaB').hide();
			}, 1000);
			break;
			//判断13张牌的
		case 13:
			a_obj.model = 0;
			break;
			//判断14张牌的
		case 14:
			if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			}
			break;
			//判断15张牌的
		case 15:
			if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];

				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
				setTimeout(function() {
					$('.donghuaB').hide();
				}, 1000);
			}
			break;
			//判断16张牌的
		case 16:
			if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			} else if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];

				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
				setTimeout(function() {
					$('.donghuaB').hide();
				}, 1000);
			}
			break;
			//判断17张牌的
		case 17:
			a_obj.model = 0;
			break;
			//判断18张牌的
		case 18:
			if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			}
			break;
			//判断19张牌的
		case 19:
			a_obj.model = 0;
			break;
			//判断20张牌的
		case 20:
			if (continPair(temp)) {
				a_obj.model = 8;
				a_obj.contrast = temp[0][0];
				$('#audioO')[0].play();
			} else if (checkPlane(temp)) {
				a_obj.model = 10; // 设置牌型为飞机
				a_obj.contrast = temp[2][0];

				$('#audioJ')[0].play();
				setTimeout(function() {
					$('#audioN')[0].play();
				}, 500);
				//飞机动画
				$('.donghuaB').show();
				setTimeout(function() {
					$('.donghuaB').hide();
				}, 1000);
			}
			break;
		default:
			a_obj.model = 0;
			break;
	}
}

// 判断顺子的方法
function checkStraight(arr) {
	// 由于顺子中不能使用王与2所以只要有这两值在肯定不是顺子
	if (arr[0][0] == 14 || arr[0][0] == 13) {
		return false;
	}

	// 使用遍历方法把传进来的数据进行判断
	for (var i = 0; i < arr.length - 1; i++) {
		if (Number(arr[i][0]) != Number(arr[i + 1][0]) + 1) {
			return false;
		}
	}
	return true;
}

// 判断连对的方法
function continPair(arr) {
	// 只要王跟2出现了就不是连对
	if (arr[0][0] == 14 || arr[0][0] == 13) {
		return false;
	}

	// arr = [[5,1], [5,0], [4,2], [4,0], [3,3], [3,1]]
	for (var i = 0; i < arr.length - 2; i += 2) {
		if (arr[i][0] != arr[i + 1][0] || arr[i + 1][0] != arr[i + 2][0] + 1 || arr[i + 2][0] + 1 != arr[i + 3][0] + 1) {
			return false;
		}
	}
	return true;
}

// 判断4带2
function fDieT(arr) {
	if (arr[0][0] == arr[1][0] && arr[1][0] == arr[2][0] && arr[2][0] == arr[3][0]) {
		return true;
	} else if (arr[1][0] == arr[2][0] && arr[2][0] == arr[3][0] && arr[3][0] == arr[4][0]) {
		return true;
	} else if (arr[2][0] == arr[3][0] && arr[3][0] == arr[4][0] && arr[4][0] == arr[5][0]) {
		return true;
	} else {
		return false;
	}
}

// 判断飞机的方法
// arr = [[10,0],[8,2],[8,1],[8,0],[7,3],[7,2],[7,1],[3,1]]
function checkPlane(arr) {

	// 按牌的数量来进行分例处理
	if (arr.length == 8) {
		for (var i = 0; i < 3; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1) {
				return true;
			}
		}
		return false;
	}

	if (arr.length == 10) {
		for (var i = 0; i < 1; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1 && arr[i + 6][0] == arr[i + 7][0] && arr[i + 8][0] == arr[i + 9][0]) {
				return true;
			} else if (arr[i][0] == arr[i + 1][0] && arr[i + 2][0] == arr[i + 3][0] && arr[i + 4][0] == arr[i + 6][0] && arr[i + 6][0] == arr[i + 7][0] + 1 && arr[i + 7][0] + 1 == arr[i + 9][0] + 1) {
				return true;
			} else if (arr[i][0] == arr[i + 1][0] && arr[i + 2][0] == arr[i + 4][0] && arr[i + 4][0] == arr[i + 5][0] + 1 && arr[i + 5][0] + 1 == arr[i + 7][0] + 1 && arr[i + 8][0] == arr[i + 9][0]) {
				return true;
			}

		}
		return false;
	}

	if (arr.length == 12) {
		for (var i = 0; i < 4; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1 && arr[i + 5][0] + 1 == arr[i + 6][0] + 2 && arr[i + 6][0] + 2 == arr[i + 8][0] + 2) {
				return true;
			}
		}
		return false;
	}

	if (arr.length == 15) {
		for (var i = 0; i < 1; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1 && arr[i + 5][0] + 1 == arr[i + 6][0] + 2 &&
				arr[i + 6][0] + 2 == arr[i + 8][0] + 2 && arr[i + 9][0] == arr[i + 10][0] && arr[i + 11][0] == arr[i + 12][0] && arr[i + 13][0] == arr[i + 14][0]) {
				return true;
			} else if (arr[i][0] == arr[i + 1][0] && arr[i + 2][0] == arr[i + 3][0] && arr[i + 4][0] == arr[i + 5][0] && arr[i + 6][0] == arr[i + 8][0] &&
				arr[i + 8][0] == arr[i + 9][0] + 1 && arr[i + 9][0] + 1 == arr[i + 11][0] + 1 && arr[i + 11][0] + 1 == arr[i + 12][0] + 2 && arr[i + 12][0] + 2 == arr[i + 14][0] + 2) {
				return true;
			} else if (arr[i][0] == arr[i + 1][0] && arr[i + 2][0] == arr[i + 3][0] && arr[i + 4][0] == arr[i + 6][0] && arr[i + 6][0] == arr[i + 7][0] + 1 &&
				arr[i + 7][0] + 1 == arr[i + 9][0] + 1 && arr[i + 9][0] + 1 == arr[i + 10][0] + 2 && arr[i + 10][0] + 2 == arr[i + 12][0] + 2 && arr[i + 13][0] == arr[i + 14][0]) {
				return true;
			}

		}
		return false;
	}

	if (arr.length == 16) {
		for (var i = 0; i < 5; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1 && arr[i + 5][0] + 1 == arr[i + 6][0] + 2 && arr[i + 6][0] + 2 == arr[i + 8][0] + 2 && arr[i + 8][0] + 2 == arr[i + 9][0] + 3 &&
				arr[i + 9][0] + 3 == arr[i + 11][0] + 3) {
				return true;
			}
		}
		return false;
	}

	if (arr.length == 20) {
		for (var i = 0; i < 5; i++) {
			if (arr[i][0] == arr[i + 2][0] && arr[i + 2][0] == arr[i + 3][0] + 1 && arr[i + 3][0] + 1 == arr[i + 5][0] + 1 && arr[i + 5][0] + 1 == arr[i + 6][0] + 2 && arr[i + 6][0] + 2 == arr[i + 8][0] + 2 && arr[i + 8][0] + 2 == arr[i + 9][0] + 3 &&
				arr[i + 9][0] + 3 == arr[i + 11][0] + 3 && arr[i + 11][0] + 3 == arr[i + 12][0] + 4 && arr[i + 12][0] + 4 == arr[i + 14][0] + 4) {
				return true;
			}
		}
		return false;
	}
}