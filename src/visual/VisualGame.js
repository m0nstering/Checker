extend(VisualGame, createjs.Container);

function VisualGame()
{	
	this.initialize();
	var th = this
//--------------------------------//
	
	var pieces = new Array()
	var _listeners = false
	var _obsToEvents = new Array()
	var txt
	var s = new createjs.Shape()
	s.graphics.beginFill("#ff0000").drawRect(0, 0, WIDTHGAME - 58/__koefDisplay, HEIGHTGAME - 163/__koefDisplay);
	s.alpha = .01
	s.x = 29/__koefDisplay
	// dragAndDrop(s)

	var temp = new createjs.Container()
	var exploid = new createjs.Container()
	var line_go = new createjs.Container()
	var _bord = new Border(0, 0, 80/__koefDisplay, 639/__koefDisplay, "#ffffff")

	this.addChild(temp)
	this.addChild(s);
	this.addChild(line_go)
///// Обработчики событий ////
	s.addEventListener("mousedown", function(e){ 
												if(!_listeners)
													return
												var point = e.target.globalToLocal(e.stageX, e.stageY)
												var j = div(point.x, __config.item.width);
												var i = div(point.y, __config.item.height);
												for(var a=0; a < _obsToEvents.length; a++){
													// if(_obsToEvents[a].mouseDown)
													// 	_obsToEvents[a].mouseDown(i, j)
												} 
											})
	s.addEventListener("pressmove", function(e){
												if(!_listeners)
													return 
												var point = e.target.globalToLocal(e.stageX, e.stageY)
												var j = div(point.x, __config.item.width);
												var i = div(point.y, __config.item.height);
												for(var a=0; a < _obsToEvents.length; a++){
													// if(_obsToEvents[a].pressMove)
													// 	_obsToEvents[a].pressMove(i, j)
												}
											})
	s.addEventListener("pressup", function(e){
												if(!_listeners)
													return
												var point = e.target.globalToLocal(e.stageX, e.stageY)
												var j = div(point.x, __config.item.width);
												var i = div(point.y, __config.item.height);
												for(var a=0; a < _obsToEvents.length; a++){
													if(_obsToEvents[a].pressUp)
														_obsToEvents[a].pressUp(i, j)
												}
											})


///// Наблюдатели за событиями от пользователя

	this.registerOnEvent = function(v){
		if(indexOf(_obsToEvents, v) == -1)
			_obsToEvents.push(v)
	}
///// Установка иконки в ячейку /////
	this.setIconToCell = function(i, j, kind, t){
		var f = new Fruit(kind)
		// f.addEventListener("click", function(){
		// 	for(var a=0; a < _obsToEvents.length; a++){
		// 		if(_obsToEvents[a].clickOnPiece)
		// 			_obsToEvents[a].clickOnPiece(i, j)
		// 	}
		// })

		f.scaleX = f.scaleY = .85
		var x = j * __config.item.width + 62/__koefDisplay
		var y = i * __config.item.height + 32/__koefDisplay
		f.x = x
		f.y = y
		pieces.push({o: f, i:i, j:j})
		// dragAndDrop(f)
		if(t){
			var user_glow = new createjs.Sprite(jsons["JSON1"])
			user_glow.gotoAndStop("fruit_glow")
			user_glow.x = x - 110/2/__koefDisplay + 1/__koefDisplay
			user_glow.y = y - 106/2/__koefDisplay + 0/__koefDisplay
			temp.addChild(user_glow)
			f.alpha = .7
			temp.addChild(f)
		}else{
			// MusicCTRL.play("sound1");
			this.addChild(f)
		}
	}

	this.movementPiece = function(arr, del, callback, go, tie, pl){
		var fun = function(arr){
			if(arr.length <=0){
				if(del.length>1 && pl && pl == "user")
					addText("nice")
				for(var b=0; b<del.length; b++)
					for(var c=0; c<pieces.length; c++)
						if(pieces[c].i == del[b].i && pieces[c].j == del[b].j){
							pieces[c].o.parent.removeChild(pieces[c].o)
							pieces.splice(c, 1)
							del.splice(b, 1)
							b--
							break
						}
				callback()
				checkEnd(go, tie)
				return
			}
			for(var a=0; a<pieces.length; a++)
				if(pieces[a].i == arr[0].si && pieces[a].j == arr[0].sj){
					pieces[a].i = arr[0].ei
					pieces[a].j = arr[0].ej
					pieces[a].o.parent.addChild(pieces[a].o)
					pieces[a].o.scaleX = pieces[a].o.scaleY = 1
					tw_tweenTo(pieces[a].o, {x: arr[0].ej * __config.item.width + 62/__koefDisplay, y: arr[0].ei * __config.item.height + 32/__koefDisplay, d: .5, call: function(){
						pieces[a].o.scaleX = pieces[a].o.scaleY = .85
						queenPiece(pieces[a])
						fun(arr)
					}})
					MusicCTRL.play("sound3");
					arr.splice(0, 1)
					unGlow()
					break
				}
		}
		fun(arr)
	}

	this.glowPiece = function(i, j, dont_off){
		for(var a=0; a<pieces.length; a++){
			if(!dont_off)
				pieces[a].o.setGlow(false)
			if(pieces[a].i == i && pieces[a].j == j && pieces[a].o.getKind() == "blue")
				pieces[a].o.setGlow(true)
		}
	}

	this.glowPiecesOff = function(){
		unGlow()
	}

	this.setQueen = function(i, j){
		for(var a=0; a<pieces.length; a++)
			if(pieces[a].i == i && pieces[a].j == j)
				pieces[a].o.setQueen()
	}

	function queenPiece(obj){
		if(obj.o.getKind() == "blue" && obj.i == 0){
			if(!obj.o.getQueen()){
				addText("great")
				obj.o.animQueenStart()
				MusicCTRL.play("sound4");
			}
			obj.o.setQueen()
		}
		if(obj.o.getKind() == "red" && obj.i == 7)
			if(!obj.o.getQueen()){
				obj.o.setQueen()
				obj.o.animQueenStart()
				MusicCTRL.play("sound4");
			}
	}

	function unGlow(){
		for(var a=0; a<pieces.length; a++){
			pieces[a].o.setGlow(false)
		}
	}

	function checkEnd(w, tie){
		var user, bot
		if(w){
			if(w == "user")
				user = true
			else
				bot = true
		}else{
			for(var a=0; a<pieces.length; a++){
				if(pieces[a].o.getKind() == "blue")
					user = true
				if(pieces[a].o.getKind() == "red")
					bot = true
			}
		}
		if(!user || !bot)
			var winner = !bot ? st_setYouWin(+st_getYouWin() + 1) : st_setBotWin(+st_getBotWin() + 1)
		if(!user)
			th.gameOver("bot")
		if(!bot)
			th.gameOver("user")
		if(tie)
			th.gameOver(null)
	}
	// this.swapPieces = function(f, s){
	// 	var buf, ind_f, ind_s
	// 	for(var a=0; a<pieces.length; a++){
	// 		if(pieces[a].i == f.i && pieces[a].j == f.j)
	// 			ind_f = a
	// 		if(pieces[a].i == s.i && pieces[a].j == s.j)
	// 			ind_s = a
	// 	}
	// 	if(ind)
	// }


//// Установка вертикальной рамки
	this.setBorder = function(j){
		temp.addChild(_bord)
		_bord.x = __config.item.width * j
	}
/// Удаление вертикальной рамки
	this.removeTemp = function(cell){
		temp.removeAllChildren()
		if(cell)
			temp.addChild(_bord)
	}

//// Конец игры
	this.gameOver = function(winner){
		// console.log(i_start, j_start, i_plus, j_plus)
		// var i = i_start
		// var j = j_start
		// for (var a = 0; a < num; a++) {
		// 	var start_x = j * __config.item.width + 40/__koefDisplay
		// 	var start_y = i * __config.item.height + 38/__koefDisplay
		// 	var req_x = (j + j_plus) * __config.item.width + 40/__koefDisplay
		// 	var req_y = (i + i_plus) * __config.item.height + 38/__koefDisplay
		// 	var user_glow = new createjs.Sprite(jsons["JSON1"])
		// 	user_glow.gotoAndStop("fruit_glow")
		// 	user_glow.x = start_x - 110/2/__koefDisplay + 1/__koefDisplay
		// 	user_glow.y = start_y - 106/2/__koefDisplay + 0/__koefDisplay
		// 	line_go.addChild(user_glow)
			
		// 	var sh = new createjs.Shape()
		// 	sh.graphics.moveTo(start_x, start_y)
		// 	sh.graphics.setStrokeStyle(10/__koefDisplay).beginStroke("#ffffff").lineTo(req_x, req_y);
		// 	if(a < num-1)
		// 		line_go.addChild(sh)

		// 	var anim = new createjs.Sprite(jsons["JSON2"], "anim_1")
		// 	anim.play()
		// 	anim.x = start_x - 310/2/__koefDisplay
		// 	anim.y = start_y - 310/2/__koefDisplay
		// 	anim.addEventListener("animationend", function(e){
		// 		e.target.stop()
		// 		e.target.play()
		// 		e.target.removeAllEventListeners()
		// 		e.target.addEventListener("animationend", function(e){e.target.stop()});
		// 	});
		// 	exploid.addChild(anim)
		// 	i += i_plus
		// 	j += j_plus
		// };
		// anim.addEventListener("animationend", function(e){
		// 	e.target.stop()
		// 	e.target.play()
		// 	e.target.removeAllEventListeners()
		// 	e.target.addEventListener("animationend", function(e){
		// 		e.target.stop()
				for(var a=0; a < _obsToEvents.length; a++)
					if(_obsToEvents[a].createModal)
						_obsToEvents[a].createModal( "gameOver", {winner: winner} )
				if(winner == "bot")
					MusicCTRL.play("sound1");
				else if(winner == "user")
					MusicCTRL.play("sound2");
		// 	});
		// })
		// this.addChild(exploid)	

		for(var a=0; a < _obsToEvents.length; a++)
			if(_obsToEvents[a].stop){
				_obsToEvents[a].stop()
			}
	}
	
//// Переключение игроков
	this.switchPlayer = function(v) {
		for(var a=0; a < _obsToEvents.length; a++){
			if(_obsToEvents[a].switchPlayers)
				_obsToEvents[a].switchPlayers()
		}
	}
//// переключение слушателей событий
	this.setListeners = function(v){
		_listeners = v
	}

//// Ничья 
	this.tie = function() {
		for(var a=0; a < _obsToEvents.length; a++){
			if(_obsToEvents[a].createModal)
				_obsToEvents[a].createModal("tie")
		}
		// MusicCTRL.play("sound2");
	}
//// Всплывающие надписи
	function addText(v){
		if(txt && txt.parent){
			tw_removeTween(txt)
			txt.parent.removeChild(txt)
		}
		txt = new createjs.Sprite(jsons["JSON1"])
		txt.gotoAndStop("text_" + v)
		txt.x = WIDTHGAME/2 - txt.getBounds().width/2


		th.addChild(txt)
		// dragAndDrop(txt)
		t_delayOn(1, function(){
			tw_tweenTo(txt, {x: txt.x, y: txt.y, alpha: .01, call: function(o){
				if(o.parent)
					o.parent.removeChild(o)
			}, pars: [txt]})
			
		})
	}
};