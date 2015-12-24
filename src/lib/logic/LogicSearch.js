extend(LogicSearch, createjs.Container);

function LogicSearch(m, row, col, lvl)
{	
	this.initialize();
	var th = this
//--------------------------------//
	var _lvl = lvl ? lvl : 1
	var mas = m;
	var _col = col
	var _row = row
	var curColor
	var ratingsArr = new Array()

	// console.log(_lvl)
//// Поиск случайной свободной ячейки
	this.searchRandom = function(pm){
		var ranI;
		var ranJ;
		while(typeof(ranI) != "number" || typeof(ranJ) != "number" || mas[ranI][ranJ] || (pm && pm.length>0 && searchObjectWithPar(pm, [["i", ranI], ["j", ranJ]]) == -1) ) { //
			ranI = Math.round(Math.random() * (_row-1));
			ranJ = Math.round(Math.random() * (_col-1));
		};
		return {i: ranI, j:ranJ}
	}

//// Проверка на ничью
	this.checkOnTie = function(){

	}

/// Поиск оптимального хода
	this.searchOptimMove = function(player){
		var moves = findOptimMove(player)
		return moves
	}

// Поиск всех возможных ходов
	this.searchAllMoves = function(player, c_m){
		var cm = c_m ? c_m : copyMas(mas)
		var m = new Array()
		var bit = false
		var search_mas = [ [-1,-1], [-1,0], [-1,+1], [0,-1], [0,+1], [+1,-1], [+1,0], [+1,+1] ]
		for (var i = 0; i < _row; i++)
			for (var j = 0; j < _col; j++){
				if(cm[i][j] && cm[i][j].kind == player){
					var ar = searchMoves(i, j, player, copyMas(cm))
					// console.log(ar)
					m = m.concat(ar.o)
					if(ar.bit)
						bit = true
				}
			}

		if(bit)
			checkMoves(m)

		return m;
	}

	function findOptimMove(player){
		var c_m = copyMas(mas)
		var currentPlayer = player
		var ret = th.searchAllMoves(currentPlayer, c_m)
		ratingsArr = new Array()
		var bestIndex = new Array()
		// for(var a=0; a< ret.length; a++){
		// }
			searchRating(c_m, 0, "bot")
		var max = -1000
		for(var a=0; a<ratingsArr.length; a++){
			if(ratingsArr[a]>max)
				max = ratingsArr[a]
		}
		for(var a=0; a<ratingsArr.length; a++){
			if(ratingsArr[a]==max){
				bestIndex.push(a)
			}
		}
		shuffle(bestIndex)
		var ind = bestIndex[0] ? bestIndex[0] : 0
		// console.log(ind, ret)
		return ret[ind]
	}
// Минимаксный алгоритм оценки ходов
	function searchRating(_mas, _rat, _curPl, _count, _index){
		var curPlayer = _curPl
		var c_m = _mas
		var rating = _rat
		var k = _curPl == "bot" ? 1 : -1
		var currentCount = _count ? _count : 1
		if(currentCount > __config.levels[lvl-1]){
			// console.log(ratingsArr)
			if(ratingsArr[_index]){
				if(ratingsArr[_index]<rating)
					ratingsArr[_index]=rating
			}else
				ratingsArr[_index]=rating
			return
		}
		var ret = th.searchAllMoves(curPlayer, c_m)
		// if(!_index)
		// 	console.log("ret", ret.length)
		for(var a=0; a<ret.length; a++){
			var copy_mas = copyMas(c_m)
			var indexRat = typeof(_index) == "number" ? _index : a
			// console.log(ret[a].e_del.length)
			var rat = rating + ret[a].e_del.length * k
			// Сделать виртуальный ход
			// console.log(ret[a].end[ret[a].end.length-1])
			copy_mas[ret[a].end[ret[a].end.length-1].ei][ret[a].end[ret[a].end.length-1].ej] = copy_mas[ret[a].i][ret[a].j]	// WARNING!!!!
			copy_mas[ret[a].i][ret[a].j] = null
			// Удалить побитые шашки
			for(var b=0; b<ret[a].e_del.length; b++)
				copy_mas[ret[a].e_del[b].i][ret[a].e_del[b].j] = null		// WARNING!!!
			// Поменять активного игрока
			var curP = curPlayer == "bot" ? "user" : "bot"
			searchRating(copy_mas, rat, curP, currentCount+1, indexRat)
		}
	}
// Поиск возможных ходов для конкретной шашки
	function searchMoves(i, j, player, curMas, only_shoot){
		// console.log(i, j, curMas[i][j])
		var only_shoot = true
		if(curMas[i][j] && curMas[i][j].queen)
			only_shoot = false
		// console.log("rekur")
		var dir = player == "user" ? -1 : 1
		var bit = false
		var m = new Array()
		//--//
		var dir_side = 1
		var ret = checkMove(i, j, dir, dir_side, bit, player, null, curMas)
		m = m.concat(ret.o)
		bit = ret.bit

		dir_side = -1
		ret = checkMove(i, j, dir, dir_side, bit, player, null, curMas)
		m = m.concat(ret.o)
		bit = ret.bit
		dir = player == "user" ? 1 : -1
		dir_side = 1
		ret = checkMove(i, j, dir, dir_side, bit, player, only_shoot, curMas)
		m = m.concat(ret.o)
		bit = ret.bit

		dir_side = -1
		ret = checkMove(i, j, dir, dir_side, bit, player, only_shoot, curMas)
		m = m.concat(ret.o)
		bit = ret.bit

		if(bit)
			checkMoves(m)
		return {o: m, bit: bit}
	}

	// Проверка хода
		//-- copy_mas - массив для проверки хода
		//-- _m - массив возможных ходов -|	для множественного
		//-- cur_piece - текущая шашка	 -|	хода
	function checkMove(i, j, dir, dir_side, bit, player, only_shot, copy_mas){
		var m = new Array()
		var cur_piece
		var curMas = copy_mas ? copyMas(copy_mas) : []
		if(curMas.length == 0)
			curMas = copyMas(mas)

		if(i+1 * dir >= 0 && i+1 * dir <_row && j+1*dir_side>=0 && j+1*dir_side<_col){
			if(!curMas[i+1 * dir][j+1*dir_side] && !only_shot){
				var r = buildObj(i, j, i+1 * dir, j+1*dir_side)
				m.push(r)													// Обычный ход (на одну клетку){i: i, j: j, ei:i+1 * dir, ej:j+1*dir_side}
			}else if(i+2 * dir >=0 && i+2 * dir<_row && j+2*dir_side>=0 && j+2*dir_side<_col){
				// console.log("check", only_shot, curMas[i][j], i, j, i+2 * dir, j+2*dir_side)
				var nel = false
				if(player == "user" && dir>0 && only_shot)
					nel = true
				if(player == "bot" && dir<0 && only_shot)
					nel = true
				if(curMas[i+1 * dir][j+1*dir_side] && curMas[i+1 * dir][j+1*dir_side].kind != player && !curMas[i+2 * dir][j+2*dir_side] && !nel){
					// if(!copy_mas){
						var r = buildObj(i, j, i+2 * dir, j+2*dir_side, i+1 * dir, j+1*dir_side)
						m.push(r)											// Ход с ударом (через клетку){i: i, j: j, ei:i+2 * dir, ej:j+2*dir_side, del:{i: i+1 * dir, j: j+1*dir_side}}
					// }
					curMas[i+2 * dir][j+2*dir_side] = curMas[i][j]
					curMas[i][j] = null
					curMas[i+1 * dir][j+1*dir_side] = null

					// if(!cur_piece)
						cur_piece = {i: i, j: j}

					// console.log("CHECK", i, j, curMas[i+2 * dir][j+2*dir_side])
					var n = searchMoves(i+2 * dir, j+2*dir_side, player, copyMas(curMas), only_shot)
					if(n.bit){
						// console.log(n.o)
						for(var a=0; a<m.length; a++)
							if(cur_piece.i == m[a].i && cur_piece.j == m[a].j){
								if(n.o.length>1)
									for(var b=1; b<n.o.length; b++){
										var o = clone(m[a])
										o.end = o.end.concat(n.o[b].end)
										o.e_del = o.e_del.concat(n.o[b].e_del)
										// console.log("clone", o)
										m.push(o)
									}
								m[a].end = m[a].end.concat(n.o[0].end)
								m[a].e_del = m[a].e_del.concat(n.o[0].e_del)
								break
							}
					}
					// m = m.concat(n.o)
					bit = true
				}
			}
		}
		// console.log("check_move", m)
		return {o: m, bit: bit}
	}

// Оставить только бьющие ходы
	function checkMoves(m){
		for(var a=0; a<m.length; a++)
				if(m[a].del.length == 0){
					m.splice(a, 1)
					a--
				}
	}

// Построение оьъекта
	function buildObj(i, j, ei, ej, deli, delj, obj){
		var ret = obj ? obj : {}
		ret.i = ret.i ? ret.i : i
		ret.j = ret.j ? ret.j : j
		ret.del = ret.del ? ret.del :[]
		ret.e_del = ret.e_del ? ret.e_del :[]
		if(typeof(deli) == "number" && typeof(delj) == "number"){
			ret.del.push({i:deli, j:delj})
			ret.e_del.push({i:deli, j:delj})
		}
		ret.end = ret.end ? ret.end :[] 
		if(typeof(ei) == "number" && typeof(ej) == "number")
			ret.end.push({ei:ei, ej:ej})

		return ret
	}

// Копирование массива
	function copyMas(m) {
		var ret = new Array()		
		for(var a=0; a<m.length; a++)
				ret[a] = m[a].slice()
		return ret
	}

	function clone(obj){
	    if(obj == null || typeof(obj) != 'object')
	        return obj;
	    var temp = new obj.constructor(); 
	    for(var key in obj)
	        temp[key] = clone(obj[key]);
	    return temp;
	}

	///// shuffle /////
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
}