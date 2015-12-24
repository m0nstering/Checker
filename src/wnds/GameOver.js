extend(GameOver, createjs.Container);

function GameOver()
{	
	this.initialize();
	var th = this
	var i, count;
	var par
//--------------------------------//
	var t = new createjs.Container()
	// this.addChild(m)
	this.addChild(t)

	var anim_screen = new Array()
	var anin_score

	var coors = [[244, 177-100], [93, 270-100], [242, 312-100], [369, 270-100]]

	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("text_game_over")
	setCoor(title, 156, 8)

	var lose = new createjs.Sprite(jsons["JSON1"])
	lose.gotoAndStop("text_you_lose")
	setCoor(lose, 202, 230)

	var win = new createjs.Sprite(jsons["JSON1"])
	win.gotoAndStop("text_you_win")
	setCoor(win, 210, 285)

	var tie = new createjs.Sprite(jsons["JSON1"])
	tie.gotoAndStop("text_game_is_a_tie")
	setCoor(tie, 160, 233)
	// dragAndDrop(tie)

	var podl1 = new createjs.Sprite(jsons["JSON1"])
	podl1.gotoAndStop("game_over_robot")
	setCoor(podl1, 416, 332)

	var podl2 = new createjs.Sprite(jsons["JSON1"])
	podl2.gotoAndStop("game_over_you")
	setCoor(podl2, 51, 332)
	// dragAndDrop(podl1)
	// dragAndDrop(podl2)

	var crown = new createjs.Sprite(jsons["JSON1"])
	crown.gotoAndStop("crown")
	setCoor(crown, 186, 3)

	var win_user = new Text(jsons["JSON1"], "text_", "Center")
	var win_bot = new Text(jsons["JSON1"], "text_", "Center")
	win_user.scaleX = win_user.scaleY = .8
	win_bot.scaleX = win_bot.scaleY = .8

	setCoor(win_user, 185+3, 388+7)
	setCoor(win_bot, 443+3, 388+7)

	// dragAndDrop(crown)
	// dragAndDrop(win_bot)
	// dragAndDrop(m.getChanges())

	var but = new Button({pod: "btn_small", icon: "icon_reset"})
	setCoor(but, 525, 636)

    but.addEventListener("click", function(){
        TGS.Advertisement.DisplayInterstitialAd({
            closeCallback:   function () {

                    par.hideModal(th);
                    par.update();

            }
        })
    });

	var btnback = new Button({pod: "btn_small", i: "icon_house"});
	setCoor(btnback, 15, 636)
	btnback.addEventListener("click", function(){
        TGS.Advertisement.DisplayInterstitialAd({
            closeCallback:   function () {
                v_choiseLocation("menu");
            }
        })
	});

	// dragAndDrop(but)
	// dragAndDrop(but_menu)

	this.addChild(but)
	this.addChild(btnback)
	this.addChild(lose)
	this.addChild(win)
	this.addChild(tie)
	this.addChild(podl1)
	this.addChild(podl2)
	this.addChild(win_user)
	this.addChild(win_bot)
	this.addChild(crown)
	this.addChild(title)


	// dragAndDrop(crown)
	// dragAndDrop(but)
	// dragAndDrop(btnback)
	// dragAndDrop(lose)
	// dragAndDrop(win)
	// dragAndDrop(podl1)
	// dragAndDrop(podl2)
	// dragAndDrop(win_user)
	// dragAndDrop(win_bot)
	// dragAndDrop(crown)
	// dragAndDrop(title)
	
	this.update = function(p){
		if(p && p.par)
			par = p.par

		for (var i = 0; i < 4; i++) {
			anim_screen[i] = new createjs.Sprite(jsons["JSON2"], "anim_2")
			setCoor(anim_screen[i], coors[i][0], coors[i][1])
		};
		var f = function(){
			if(p.winner == "bot"){
				anin_score = new createjs.Sprite(jsons["JSON2"], "anim_1")
				anin_score.play()
				anin_score.addEventListener("animationend", function(e){
					e.target.stop()
				});
				// dragAndDrop(anin_score)
				setCoor(anin_score, 300, 260)
				th.addChild(anin_score)
				win_user.setText(+st_getYouWin())
				win_bot.setText(+st_getBotWin())
			}else if(p.winner == "user"){
				shuffle(anim_screen)
				i=0
				count = 0;
				var loop_f = function(){
					if(i>=4)
						return
					anim_screen[i].play()
					anim_screen[i].addEventListener("animationend", function(e){
						e.target.removeAllEventListeners()
						e.target.addEventListener("animationend", function(e){
							e.target.stop()
							count++
							if(count>=4){
								anin_score = new createjs.Sprite(jsons["JSON2"], "anim_1")
								anin_score.play()
								anin_score.addEventListener("animationend", function(e){
									e.target.stop()
								});
								// dragAndDrop(anin_score)
								if(p.winner == "user")
									setCoor(anin_score, 35, 260)
								if(p.winner == "bot")
									setCoor(anin_score, 300, 260)
								th.addChild(anin_score)
								win_user.setText(+st_getYouWin())
								win_bot.setText(+st_getBotWin())
							}
						})
						// dragAndDrop(anim_screen[i])
					});
					// setCoor(anim_screen, 244, 177)
					th.addChild(anim_screen[i])
					i++
					t_delayOn(.2, loop_f)
				}
				loop_f()
			}else{				
				win_user.setText(+st_getYouWin())
				win_bot.setText(+st_getBotWin())
			}
		}
		// m.slideFromTop(f)
		crown.visible = false
		lose.visible = false
		win.visible = false
		tie.visible = false

		if(p.winner == "user"){
			win.visible = true
			crown.visible = true 
			win_user.setText(+st_getYouWin()-1)
			win_bot.setText(+st_getBotWin())
		}else if(p.winner == "bot"){
			lose.visible = true
				// console.log(+st_getBotWin()-1)
			win_user.setText(+st_getYouWin())
			win_bot.setText(+st_getBotWin()-1)
		}else{
			tie.visible = true
		}
		f()

	}
	
///// shuffle /////
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
}