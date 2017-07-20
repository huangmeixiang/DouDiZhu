function startAll() {
	start01();
	start02();
	setTimeout(function() {
		start03();
	}, 4200);
	setTimeout(function() {
		start04();
	}, 3450);

	setTimeout(function() {
		$('.all_new_poker').css({
			margin: '100px auto 0px'
		});
	}, 8000);

	function start01() {

		//生成临时的ul，方便洗牌动画。
		var u = '';
		for (var i = 0; i < 1; i++) {
			u += '<ul class="all_new_poker" >';
			for (j = 0; j < 54; j++) {
				u += '<li class="back" style="top:-' + j + 'px;"></li>';
			}
			u += '</ul>';
		}
		$('.mid_top').html(u);
		for (var i = 0; i < 54; i++) {
			$('.all_new_poker li').eq(i).animate({
				top: '-300px'
			}, (100 + i * 5));
		}
		for (var i = 0; i < 54; i++) {
			$('.all_new_poker li').eq(i).animate({
				top: -i + 'px'
			}, 20 + (i * 5));
		}
	}

	function start02() {
		var forever_poker = $('.mid_top').html();
		setTimeout(function() {
			$('.all_new_poker').remove();
		}, 670);
		setTimeout(function() {
			//生成临时的ul，方便洗牌动画。
			var u = '';
			for (var i = 0; i < 3; i++) {
				u += '<ul class="temp_poker" >';
				for (j = 0; j < 18; j++) {
					u += '<li class="back" style="top:-' + j + 'px;"></li>';
				}
				u += '</ul>';
			}
			$('.mid_top').html(u);

			//执行洗牌动画。
			//使生成的牌有个起始位置

			//使临时牌组
			$('.temp_poker').eq(0).animate({
				top: '0px'
			}, 300);
			$('.temp_poker').eq(1).animate({
				top: '250px'
			}, 500);
			$('.temp_poker').eq(2).animate({
				top: '500px'
			}, 700);
			setTimeout(function() {
				for (var i = 0; i < 18; i++) {
					var t = i % 2; //t是我自定义的一个变量，用来装偶数牌，如：第2，4，6...张牌.
					if (t == 0) {

						$('.temp_poker:eq(0) li').eq(i).animate({
							left: (i * 35) + 'px'
						}, 300);
						$('.temp_poker:eq(1) li').eq(i).animate({
							left: (i * 35) + 'px'
						}, 500);
						$('.temp_poker:eq(2) li').eq(i).animate({
							left: (i * 35) + 'px'
						}, 700);
					} else {
						$('.temp_poker:eq(0) li').css({
							transform: 'rotate(-720deg)'
						});
						$('.temp_poker:eq(0) li').css({
							transition: 'all 1s'
						});
						$('.temp_poker:eq(0) li').eq(i).animate({
							left: -(i * 35) + 'px'
						}, 300);

						setTimeout(function() {
							$('.temp_poker:eq(1) li').css({
								transform: 'rotate(-720deg)'
							});
						}, 250);
						$('.temp_poker:eq(1) li').css({
							transition: 'all 1s'
						});

						$('.temp_poker:eq(1) li').eq(i).animate({
							left: -(i * 35) + 'px'
						}, 500);

						setTimeout(function() {
							$('.temp_poker:eq(2) li').css({
								transform: 'rotate(-720deg)'
							});
						}, 300);
						$('.temp_poker:eq(2) li').css({
							transition: 'all 1s'
						});

						$('.temp_poker:eq(2) li').eq(i).animate({
							left: -(i * 35) + 'px'
						}, 700);
					}

				}
			}, 500)

			//收独立ul的动画
			setTimeout(function() {
				$('.temp_poker').eq(0).animate({
					top: '500px'
				}, 100);
				$('.temp_poker').eq(1).animate({
					top: '500px'
				}, 300);
				$('.temp_poker').eq(2).animate({
					top: '500px'
				}, 500);
			}, 1500);

			//收牌li的动画。
			setTimeout(function() {
				for (var i = 0; i < 18; i++) {
					for (var j = 0; j < 3; j++) {

						$('.temp_poker:eq(' + j + ') li').eq(i).animate({
							left: '0px'
						}, 50);
					}
				}
			}, 1490)

		}, 680);
		setTimeout(function() {
			$('.temp_poker').remove();
		}, 2680);
		setTimeout(function() {
			$('.mid_top').html(forever_poker);
		}, 2680);
	}

	function start03() {
		/*=======左边============*/
		for (var i = 26; i >= 0; i--) {
			$('.all_new_poker li').eq(i).css({
				transition: 'all 1s'
			});
			$('.all_new_poker li').eq(i).css({
				transformOrigin: 'center bottom',
				transform: 'rotate(' + (i - 23) * 4 + 'deg) translateY(' + (-i * 0.9) + 'px)'
			});
		}
		for (var i = 25; i < 54; i++) {
			$('.all_new_poker li').eq(i).css({
				transition: 'all 1s'
			});
			$('.all_new_poker li').eq(i).css({
				transformOrigin: 'center bottom',
				transform: 'rotate(' + (i - 23) * 4 + 'deg) translateY(' + (-i * 0.9) + 'px)'
			});
		}
		/*=======右边============*/
		setTimeout(function() {
			for (var i = 26; i >= 0; i--) {
				$('.all_new_poker li').eq(i).css({
					transition: 'all 0.5s'
				});
				$('.all_new_poker li').eq(i).css({
					transformOrigin: 'center bottom',
					transform: 'rotate(0deg) translateY(0px)'
				});
			}
			for (var i = 27; i < 54; i++) {
				$('.all_new_poker li').eq(i).css({
					transition: 'all 0.5s'
				});
				$('.all_new_poker li').eq(i).css({
					transformOrigin: 'center bottom',
					transform: 'rotate(0deg) translateY(0px)'
				});
			}
		}, 1000);
	} /*end*/
	//心形动画
	function start04() {
		var l = '';
		for (var i = 0; i < 54; i++) {
			l += '<li class="back" style="top:-' + (i * 0.5) + 'px;left:-' + (i * 0.3) + 'px;">' + i + '</li>';
			$('.all_new_poker li').eq(0).animate({
				left: (-i * 1.5) + 'px',
				top: (-i) + 'px'
			}, 10);
			$('.all_new_poker li').eq(2).animate({
				left: (-i * 2.5) + 'px',
				top: (-i * 2) + 'px'
			}, 10);
			$('.all_new_poker li').eq(4).animate({
				left: (-i * 3.5) + 'px',
				top: (-i * 3) + 'px'
			}, 10);
			$('.all_new_poker li').eq(6).animate({
				left: (-i * 4.5) + 'px',
				top: (-i * 4) + 'px'
			}, 10);
			$('.all_new_poker li').eq(8).animate({
				left: (-i * 5.5) + 'px',
				top: (-i * 5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(10).animate({
				left: (-i * 6.5) + 'px',
				top: (-i * 6) + 'px'
			}, 10);
			$('.all_new_poker li').eq(12).animate({
				left: (-i * 6.5) + 'px',
				top: (-i * 7) + 'px'
			}, 10);
			$('.all_new_poker li').eq(14).animate({
				left: (-i * 5.5) + 'px',
				top: (-i * 8) + 'px'
			}, 10);
			$('.all_new_poker li').eq(16).animate({
				left: (-i * 4.5) + 'px',
				top: (-i * 9) + 'px',
			}, 10);
			$('.all_new_poker li').eq(18).animate({
				left: (-i * 3.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(20).animate({
				left: (-i * 2.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(22).animate({
				left: (-i * 3.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(24).animate({
				left: (-i * 2.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(26).animate({
				left: (-i * 1.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(28).animate({
				left: (-i * 1) + 'px',
				top: (-i * 8.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(30).animate({
				left: (-i * 0.5) + 'px',
				top: (-i * 7.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(32).animate({
				left: (-i * 0) + 'px',
				top: (-i * 7.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(34).animate({
				left: (i * 0.5) + 'px',
				top: (-i * 7.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(36).animate({
				left: (i * 2) + 'px',
				top: (-i * 8.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(38).animate({
				left: (i * 2.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(40).animate({
				left: (i * 3.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(42).animate({
				left: (i * 4.5) + 'px',
				top: (-i * 9.5) + 'px'
			}, 10);
			$('.all_new_poker li').eq(44).animate({
				left: (i * 5.5) + 'px',
				top: (-i * 9) + 'px',
			}, 10);
			$('.all_new_poker li').eq(46).animate({
				left: (i * 6.5) + 'px',
				top: (-i * 8) + 'px',
			}, 10);
			$('.all_new_poker li').eq(48).animate({
				left: (i * 7.5) + 'px',
				top: (-i * 7) + 'px',
			}, 10);
			$('.all_new_poker li').eq(50).animate({
				left: (i * 7.5) + 'px',
				top: (-i * 6) + 'px',
			}, 10);
			$('.all_new_poker li').eq(52).animate({
				left: (i * 6.5) + 'px',
				top: (-i * 5) + 'px',
			}, 10);
			$('.all_new_poker li').eq(53).animate({
				left: (i * 5.5) + 'px',
				top: (-i * 4) + 'px',
			}, 10);
			$('.all_new_poker li').eq(51).animate({
				left: (i * 4.5) + 'px',
				top: (-i * 3) + 'px',
			}, 10);
			$('.all_new_poker li').eq(49).animate({
				left: (i * 3.5) + 'px',
				top: (-i * 2) + 'px',
			}, 10);
			$('.all_new_poker li').eq(47).animate({
				left: (i * 2.5) + 'px',
				top: (-i * 1) + 'px',
			}, 10);
			$('.all_new_poker li').eq(45).animate({
				left: (i * 1.5) + 'px',
				top: (-i * 0) + 'px',
			}, 10);
			$('.all_new_poker li').eq(43).animate({
				left: (i * 0.5) + 'px',
				top: (i * 1) + 'px',
			}, 10);
			$('.all_new_poker li').eq(41).animate({
				left: (-i * 0.5) + 'px',
				top: (-i * 0.5) + 'px',
			}, 10);

			setTimeout(function() {
				$('.all_new_poker li').eq(i).animate({
					left: '0px',
					top: '0px'
				}, 10);
			}, 500)
			setTimeout(function() {
				$('.all_new_poker').css({
					transform: 'rotateY(360deg)'
				});
				$('.all_new_poker').css({
					transition: 'all 0.7s'
				});
			}, 2500);
			//收牌
			setTimeout(function() {
				for (var i = 0; i < 54; i++) {
					$('.all_new_poker li').eq(i).animate({
						left: '0px',
						top: (-i) + 'px'
					}, 5);
				}
			}, 2500);
		}
		return l;
	}

}