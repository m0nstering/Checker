var lvls = new Array();
var __open = new Array();
var flag = new Array();
var numPlay, numLvl, you_win, bot_win;
var obs = new Array();
// Чтение данных из local storage
function readStorage(){
	// flag[0] = false;
	// __open = JSON.parse(window.localStorage.getItem("__open")) ? JSON.parse(window.localStorage.getItem("__open")) : new Array();
	// flag = window.localStorage.getItem("flag") ? JSON.parse(window.localStorage.getItem("flag")) : flag;
	numLvl = window.localStorage.getItem("tf_numLvl") ? +window.localStorage.getItem("tf_numLvl") : 0;
	numPlay = window.localStorage.getItem("tf_numPlay") ? +window.localStorage.getItem("tf_numPlay") : 0;
	you_win = window.localStorage.getItem("tf_you_win") ? +window.localStorage.getItem("tf_you_win") : 0
	bot_win = window.localStorage.getItem("tf_bot_win") ? +window.localStorage.getItem("tf_bot_win") : 0
};

function st_getYouWin(){
	return you_win
}

function st_getBotWin(){
	return bot_win
}
function st_getNumPlay(){
	return numPlay
}

function st_getNumLvl(){
	return numLvl
}

// setters

function st_setNumPlay(v){
	numPlay += v
	window.localStorage.setItem("tf_numPlay", numPlay)
}

function st_setNumLvl(v){
	numLvl += v
	window.localStorage.setItem("tf_numLvl", numLvl)
}

function st_setYouWin(v){
	you_win = v
	window.localStorage.setItem("tf_you_win", you_win)
}

function st_setBotWin(v){
	bot_win = v
	window.localStorage.setItem("tf_bot_win", bot_win)
}
//------ Наблюдатель ------//
function observerStorage(o){
	obs.push(o);
}