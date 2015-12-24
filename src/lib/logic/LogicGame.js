extend(LogicGame, createjs.Container);

function LogicGame(v, p)
{	
	this.initialize();
	var th = this
//--------------------------------//
	var time_move = 0; //__config.timeOnMove[v-1]
	var move_robot = __config.delayRobot[v-1]

	var currentPiece

	var _row = __config.sizeField.width
	var _col = __config.sizeField.height
	var _cols = __config.colors
	var numCheckers = p
	var players = ["user", "bot"]
	var colors = new Array();
	var _activePlayer
	var numMoveForTie

	var _obs = new Array()
	var masObj = new Array()
	for (var i = 0; i < _row; i++)
		masObj[i] = new Array()
	var _cellFinder = new LogicSearch(masObj, _row, _col, v)
	var move_d

//// Инициализация
	this.init = function(){
		// console.log(numCheckers)
		numMoveForTie = 0
		var top = numCheckers == 12 ? 3 : 2
		var bottom = numCheckers == 12 ? 4 : 5
		var m_c = new Array()
		for(var a=0; a<players.length; a++){
			// var r;
			// while(!r || indexOf(m_c, _cols[r]) != -1)
			// 	r = Math.round(Math.random() * (_cols.length-1))
			colors[players[a]] = _cols[a]
			m_c.push(colors[players[a]])
		}
		// for(var a=0; a<_matrix.field.length; a++)
		// 	for(var b=0; b<_matrix.field[a].length; b++){
		// 		var pl = null
		// 		if(_matrix.field[a][b] == 0)
		// 			continue
		// 		if(_matrix.field[a][b] == 1)
		// 			pl = "bot"
		// 		if(_matrix.field[a][b] == 2)
		// 			pl = "user"
		// 		var queen = null
		// 		if(_matrix.field[a][b] == 11){
		// 			pl = "bot"
		// 			queen = true
		// 		}
		// 		if(_matrix.field[a][b] == 22){
		// 			pl = "user"
		// 			queen = true
		// 		}

		// 		this.setСell(a, b, pl, false)
		// 		if(queen){
		// 			setToQueen(a, b)
		// 			for(var c=0; c<_obs.length; c++)
		// 				if(_obs[c].setQueen)
		// 					_obs[c].setQueen(a, b)
		// 		}
		// 	}
		for(var a=0; a<_col; a++)
			for(var b=0; b<_row; b++){
				var pl = null;
				if(a < top)
					pl = "bot"
				else if(a >bottom)
					pl = "user"
				if(pl)
					if((b % 2 == 0 && (a)%2 == 0) || ((b+1) % 2 == 0 && (a+1)%2 == 0))
						this.setСell(a, b, pl, false)
			}

		_activePlayer = Math.round(Math.random())
		this.switchPlayer()
	}
///// Наблюдатели за изменениями в модели
	this.registerObserver = function(v){
		if(indexOf(_obs, v) == -1)
			_obs.push(v)
	}
///// Установка иконки в ячейку /////
	this.setСell = function(i, j, player, t){
		if(masObj[i][j]){
			return true
		}
	// Оповещение наблюдателя об установки фрукта в ячейку
		for(var a=0; a<_obs.length; a++){
			if(_obs[a].setIconToCell)
				_obs[a].setIconToCell(i, j, colors[player], t)
			var user, bot
			// var winner = !user ? st_setYouWin(+st_getYouWin() + 1) : st_setBotWin(+st_getBotWin() + 1)
			// if(_obs[a].gameOver)
			// 	_obs[a].gameOver("bot")
		}
	// Логическое добавление элемента в массив и проверка на конец игры
		if(!t){
			masObj[i][j] = createCell(player)
			var end = null//checkEnd(i, j);
			var tie = _cellFinder.checkOnTie()
			if(end)
				return end
			if(tie){
				for(var b=0; b<_obs.length; b++)
					if(_obs[b].tie){
						_obs[b].tie()
					}
				return tie
			}
		}
	}

	this.checkPieceOnCell = function(i, j){
		// console.log("check", i, j)
		if(typeof(i) == "number" && typeof(j) == "number" && masObj[i][j])
			return true
	}

	var all_moves = new Array()
	var all_delete = new Array()
	this.movePiece = function(taps, player, curP, _end, _dels){
		if(taps[0] && typeof(taps[0].i) == "number" && typeof(taps[0].j) == "number" && masObj[taps[0].i][taps[0].j]){
			currentPiece = {i:taps[0].i, j:taps[0].j}
			// if(player == "user")
				for(var a=0; a<_obs.length; a++)
					if(_obs[a].glowPiece)
						_obs[a].glowPiece(taps[0].i, taps[0].j)
			// console.log("CHoise", taps)
			return {choise: true}
		}else{
			currentPiece = curP ? curP : currentPiece
			if(!currentPiece)
				return true
			var posMoves = _cellFinder.searchAllMoves(player)
			// console.log(taps.slice(), posMoves.slice())
			var ret = -1
			var unGlow = true
			// console.log("GO", posMoves.slice())
			for(var a=0; a<posMoves.length; a++){
				var num = posMoves[a].end.length
				for(var b=0; b<posMoves[a].end.length; b++){
					if(taps[b])
						if(typeof(taps[b].ei) == "number" && typeof(taps[b].ej) == "number"
							&& posMoves[a].end[b].ei == taps[b].ei && posMoves[a].end[b].ej == taps[b].ej
							&& posMoves[a].i == currentPiece.i && posMoves[a].j == currentPiece.j){
							unGlow = false
							num--
					}
				}
				if(typeof(taps[0].ei) == "number" && typeof(taps[0].ej) == "number"
					&& posMoves[a].end.length > 1
					&& posMoves[a].end[posMoves[a].end.length - 1].ei == taps[0].ei
					&& posMoves[a].end[posMoves[a].end.length - 1].ej == taps[0].ej
					&& posMoves[a].i == currentPiece.i && posMoves[a].j == currentPiece.j){
						for(var c=0; c<posMoves[a].end.length; c++){
							taps[c] = posMoves[a].end[c]
						}
						num = 0
					}
				if(num <= 0 && num != posMoves[a].end.length){
					ret = a
					break 
				}
			}
			for(var a=0; a<posMoves.length; a++){
				if(typeof(taps[0].ei) == "number" && typeof(taps[0].ej) == "number"
					&& posMoves[a].end[0].ei == taps[0].ei && posMoves[a].end[0].ej == taps[0].ej
					&& posMoves[a].i == currentPiece.i && posMoves[a].j == currentPiece.j){
								// console.log(taps.slice(), posMoves[a])
								for(var c=0; c<posMoves[a].end.length; c++){
										taps[c] = posMoves[a].end[c]
									}
								ret = a
								break 
				}
			}
			if(unGlow)
				for(var a=0; a<_obs.length; a++)
					if(_obs[a].glowPiecesOff)
						_obs[a].glowPiecesOff()
			// console.log("ret", ret)
			if(ret == -1){
				return true
			}

			var nextPiece = {i: taps[0].ei, j: taps[0].ej}
			all_moves.push({si:currentPiece.i, sj:currentPiece.j, ei:taps[0].ei, ej:taps[0].ej})	
			masObj[taps[0].ei][taps[0].ej] = masObj[currentPiece.i][currentPiece.j]
			masObj[currentPiece.i][currentPiece.j] = null
			currentPiece = null
			searchOnQueen(taps[0].ei, taps[0].ej)
			taps.splice(0, 1)

			var _del = _dels ? _dels.concat(posMoves[ret].del) : posMoves[ret].del 
			// console.log("DEL", _del)
			for(var a=0; a< _del.length;a++)
				masObj[_del[a].i][_del[a].j] = null

			if(taps.length > 0){
				th.movePiece(taps, player, nextPiece, _end, _del)
				return
			}
			
			// if(checkEnd())
			// 	return true
			// console.log(findNimCecks("user"), findNimCecks("bot"))
			if(findNimCecks("user") == 1 && findNimCecks("bot") == 1)
				numMoveForTie ++

			var go = null
			var tie = null
			if(numMoveForTie >=10)
				tie = true
			var pl = player == "user" ? "bot" : "user"
			if(_cellFinder.searchAllMoves(pl).length == 0)
				go = player

			for(var a=0; a<_obs.length; a++)
				if(_obs[a].movementPiece)
					_obs[a].movementPiece(all_moves, _del, notifySwitch, go, tie, player)


		}
	}

//// Смена активного игрока ////
	this.switchPlayer = function(){
		var listener;
		if(players[_activePlayer+1]){
			_activePlayer ++ 
			listener = false
		}else{
			_activePlayer = 0
			listener = true
		}
		if(_activePlayer == 0){
			var ms = _cellFinder.searchAllMoves(players[_activePlayer])
			if(ms && ms[0] && ms[0].del && ms[0].del.length>0){
				var masIJ = new Array()
				for(var a=0; a<ms.length; a++){
					var f = true
					for(var b=0; b<masIJ.length; b++){
						if(masIJ[b].i == ms[a].i && masIJ[b].j == ms[a].j){
							f = false
							break
						}
					}
					if(f){
						masIJ.push({i: ms[a].i, j: ms[a].j})
					}
				}
				// console.log(masIJ.length)
				if(masIJ.length<2){
					this.movePiece([{i:ms[0].i, j:ms[0].j, ei:ms[0].i, ej:ms[0].j}], "user")
				}else{
					for(var b = 0; b<masIJ.length; b++){
						for(var a=0; a<_obs.length; a++)
							if(_obs[a].glowPiece)
								_obs[a].glowPiece(masIJ[b].i, masIJ[b].j, true)
					}
				}
				
			}
			// console.log(ms)
		}
		// Включение или выключение слюшателей событий игрока
		for(var a=0; a<_obs.length; a++)
			if(_obs[a].setListeners)
				_obs[a].setListeners(listener)
	}
//// Искуственный интеллект ////
	this.moveRobot = function(){
		move_d = t_delayOn(move_robot, function(){
			var cell = _cellFinder.searchOptimMove("bot")
			if(cell)
				var set = th.movePiece(cell.end, "bot", {i: cell.i, j: cell.j}, cell.end)
			else
				console.log("err")
			// this.switchPlayer()
			// notifySwitch()
		})
	}

	this.pauseRobot = function(v){
		if(v){
			t_setPause(move_d)
			tw_pause()
		}else{
			t_delInPause(move_d)
			tw_unPause()
		}
	}

/// Получить цвета игроков 
	this.getColors = function(){
		return colors
	}
/// Получить начинающего
	this.getStarted = function(){
		return players[_activePlayer]
	}
/// Получить время для хода
	this.getTimeMove = function() {
		return time_move
	}

//// PRIVATE ////

	function notifySwitch(set){
		if(!set){
				for(var a=0; a<_obs.length; a++)
					if(_obs[a].switchPlayer)
						_obs[a].switchPlayer()
			}
	} 
/// Проверка условия окончания игры
	function checkEnd(i, j){
		// var user, bot, winner
		// for(var a=0; a< _row; a++)
		// 	for(var b=0; b<_col; b++){
		// 		if(masObj[a][b]){
		// 			if(masObj[a][b].kind == "user")
		// 				user = true
		// 			if(masObj[a][b].kind == "bot")
		// 				bot = true
		// 		}
		// 	}
		// if(!user)
		// 	winner = "user"
		// else if(!bot)
		// 	winner = "bot"

		// if(winner){
		// 	console.log("gameover", winner)
		// 	for(var b=0; b<_obs.length; b++)
		// 		if(_obs[b].gameOver)
		// 			_obs[b].gameOver(winner)
		// 	}
	};

/// Создание объекта для ячейки
	function createCell(kind){
		var o = {
			kind: kind
		}

		return o
	}
/// Преобразование в дамку
	function setToQueen(i, j){
		// console.log("SETTOQUEEN")
		masObj[i][j].queen = true
		// for(var a=0; a<_obs.length; a++)
		// 	if(_obs[a].queenPiece)
		// 		_obs[a].queenPiece(i, j)
	}
// Количество оставшихся шашек
	function findNimCecks(player){
		var num = 0
		for(var a=0; a< _row; a++)
			for(var b=0; b<_col; b++){
				if(masObj[a][b] && masObj[a][b].kind == player)
					num++
			}

		return num
	}

// Проверка на дамку
	function searchOnQueen(i, j){
		if(masObj[i][j]){
			// console.log("est'", masObj[i][j], i)
			if(masObj[i][j].kind == "user" && i == 0)
				setToQueen(i, j)
			if(masObj[i][j].kind == "bot" && i == _row-1)
				setToQueen(i, j)
		}
	}
};