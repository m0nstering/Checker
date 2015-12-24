extend(Game, createjs.Container);

function Game()
{	
	this.initialize();
	var th = this
//--------------------------------//
	var currentCol, currentRow, timer; 
	var _vis, _log, _iface;
	var _modal = new Array()
	var activeLvl = 1;
	var numCheckers = 12
	var taps = new Array()
	var active_piece = false
	// _modal["pause"] = new Modal("big", 0.01)
	// _modal["pause"] = new Pause(_modal["pause"], this)


/// клик на поле
	this.pressUp = function(i, j) {
		if(!_vis.mouseChildren)
			return
		_vis.removeTemp()
		taps.push({i:i, j:j, ei:i, ej:j})
		if(_log.checkPieceOnCell(i, j)){
			t_delInTicker(timer)
			_log.movePiece([{i:i, j:j, ei:i, ej:j}] , "user")
			taps = new Array()
		}else{
			t_delInTicker(timer)
			// timer = t_delayOn(.3, function(){
				_log.movePiece(taps , "user")
				// taps = new Array()
			// })
		}		
	}

//// Нажатие на экран
	this.mouseDown = function(i, j) {
		if(!_vis.mouseChildren)
			return
		_vis.removeTemp()
		_vis.setBorder(j)
		_log.setСell(i, j, "user", true)
		currentCol = j
		currentRow = i
	}
//// 
	this.pressMove = function(i, j) {
		if(!_vis.mouseChildren)
			return
		if(!currentCol || currentCol != j){
			_vis.removeTemp()
			_vis.setBorder(j)
			_log.setСell(i, j, "user", true)
			currentCol = j
		}
		if(!currentRow || currentRow != i){
			_vis.removeTemp(true)
			_log.setСell(i, j, "user", true)
			currentRow = i
		}
	}
	this.clickOnPiece = function(i, j){
		// console.log(i, j)
	}

/// Переключение игроков
	this.switchPlayers = function() {
		this.hideModal()
		this.playAndSwitch()
		// this.createModal("turn", {turn: _log.getStarted()})
	}

	this.playAndSwitch = function() {
		_log.switchPlayer()
		this.start()
	}
/// вызов модального окна
	this.createModal = function(v, pars) {
		// console.log("raz_", v)
			if(v == "gameOver"){
				pars.par = th
				v_choiseLocation("gameOver", pars)
			}else if(v == "whoStart"){
				// _modal[v] = new Modal(null, 0.01)
				// _modal[v] = new WhoStart(_modal[v], this)
				pars.par = th
				v_choiseLocation("whoStart", pars)
			}else if(v == "turn"){
				_modal[v] = new Modal(null, 0.01)
				_modal[v] = new Turn(_modal[v], this)
			}else if(v == "timeisup"){
				_modal[v] = new Modal(null, 0.01)
				_modal[v] = new TimeIsUp(_modal[v], this)
			}else if(v == "pause"){
				pars = pars ? pars : {}
				pars.par = th
				v_choiseLocation("setting", pars)
			}else if(v == "tie"){
				_modal[v] = new Modal(null, 0.01)
				_modal[v] = new Tie(_modal[v], this)
			}else if(v == "confirm"){
				_modal[v] = new Modal(null, 0.01)
				_modal[v] = new Confirmation(_modal[v], this)
				if(_modal[v].update)
					_modal[v].update(pars)
				this.addChild(_modal[v]);
			}
		this.stop()
		// if(_modal[v].update)
		// 	_modal[v].update(pars)
		// this.addChild(_modal[v]);
	}
/// Скрытие модального окна
	this.hideModal = function(mod) {
		if(mod && mod.parent)
			mod.parent.removeChild(mod)
		v_choiseLocation("game", {dont_update: true})
		_vis.mouseChildren = true
		_iface.mouseChildren = true
	}

/// Вызывается при активизации окна (инициализация игры)
	this.update = function(v) {
		if(v && v.dont_update)
			return
		st_setNumLvl(1)
		if(st_getNumLvl() % __config.facebook == 0){
			FB_GO()
		}

///////////////////////////////////////////
		this.removeAllChildren()
		t_delAllInTicker()
		tw_removeAllTweens()

		activeLvl = v && v.lvl ? v.lvl : activeLvl
		numCheckers = v && v.num_checkers ? v.num_checkers : numCheckers

		// console.log("update", activeLvl, numCheckers)

		_vis = new VisualGame()
		_log = new LogicGame(activeLvl, numCheckers)

		_vis.y = 163/__koefDisplay

		_vis.registerOnEvent(this)		// контроллер следит за событиями от пользователя
		_log.registerObserver(_vis)		// представление следит за моделью
		_log.init()
		if(_iface)
			_iface.delInTimer()
		_iface = null
		 // console.log("_iface", _iface)
		_iface = new Interface({colors: _log.getColors(), timeMove: _log.getTimeMove()}, this)
		_iface.update()

		this.addChild(_vis)
		this.addChild(_iface)


		th.createModal("whoStart", {colors: _log.getColors(), started: _log.getStarted()})
	}
/// Начало игры
	this.start = function() {
		if(_log.getStarted() == "user"){
			_iface.setActivePlayer("user")
			_iface.slideTurn("user")
		}
		if(_log.getStarted() == "bot"){
			_iface.setActivePlayer("bot")
			_iface.slideTurn("bot")
		}
		_log.pauseRobot(false)
		_iface.setActivePlayer(_log.getStarted())
		_iface.startTimer()
		if(_log.getStarted() == "bot"){
			_log.moveRobot()
		}
		// t_delAllInPause()
	}

	this.stop = function(){
		// console.log("stop")
		_vis.removeTemp()
		_vis.mouseChildren = false
		_iface.mouseChildren = false
		_iface.stopTimer()
		_iface.update()
		_log.pauseRobot(true)
		// t_allInPause()
	}

/// Возвращение в Игру
	this.resume = function(){
		_iface.resumeTimer()
	} 

	this.getLvl = function(argument) {
		// body...
		return activeLvl
	}
};