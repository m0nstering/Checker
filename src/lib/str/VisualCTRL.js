var __stageGame				// Сцена игры
var __stageBG					// Сцена фона
var __arrBG = new Array();	// Массив фонов 
var __arrLoc = new Array();	// Массив локаций
var __arrMod = new Array();	// Массив модальных окон
var __mainTicker


//------------- Запуск и отображение прелоадера и инициализация сцен -----------//
function v_startPreloader(){
	// -------- ФОН -------------//
	__stageBG = document.getElementById(canvases.bg)
	__arrBG[bgImgs[0].name] = createBgImg(bgImgs[0].url)// images["img_other_bg"];
	__stageBG.appendChild(__arrBG[bgImgs[0].name]);
	//------- Игровая сцена ---------//
	__stageGame = createStage(canvases.game, 0, (__HEIGHTBG - HEIGHTGAME)/2)
	__arrLoc["preloader"] =  new Preloader();
	__mainTicker = function(){__stageGame.update();}
	t_addToTicker(__mainTicker);
	//-------------------------------//
	v_choiseLocation("preloader");
	return __arrLoc["preloader"];
}
//-------------- Инициализация локация и фонов ------------//
function v_initLocations(){
	//----- ФОНЫ ------//
	for (var i = 1; i < bgImgs.length; i++) {
		__arrBG[bgImgs[i].name] = createBgImg(bgImgs[i].url)//images["img_game_bg"];
		__stageBG.appendChild(__arrBG[bgImgs[i].name]);
	};
	//-------ЛОКАЦИИ -------//
	__arrLoc["game"] =  new Game();
	__arrLoc["menu"] =  new Menu();
	__arrLoc["setting"] =  new Setting();
	__arrLoc["about"] =  new About();
	__arrLoc["instructions"] =  new Instructions();
	__arrLoc["chlevel"] =  new ChoiseLevel();
	__arrLoc["splash"] =  new SplashScreen();
	__arrLoc["whoStart"] =  new WhoStart();
	__arrLoc["playWith"] =  new PlayWith();
	__arrLoc["gameOver"] =  new GameOver();
}
//--------------- Переключение между локациями --------------------//
function v_choiseLocation(val, par){
	if(!__arrLoc[val])
		return;

	if(val == "game")							// Обновление фона (если требуется)
		updateBg(bgImgs[1].name);
	else if(val == "preloader")
		updateBg(bgImgs[0].name);
	else
		updateBg(bgImgs[2].name);

	__stageGame.removeAllChildren();				// Обновление сцены
	__stageGame.addChild(__arrLoc[val]);

	if(__arrLoc[val].update)
		__arrLoc[val].update(par);				// Функция обновления окна при переключении на него

	return __arrLoc[val]
};

//-------------- Активация модального окна ---------------//
function activeModal(v){
	if(_currentLocation.deleteAllListeners)
		_currentLocation.deleteAllListeners()
	if(__arrMod[v]){
		if(__arrMod[v].setParent)
			__arrMod[v].setParent(_currentLocation)
		_currentLocation.addChild(__arrMod[v])
	}
}
//------------ Деактивация модального окна ------------//
function deactivateModal(v){
	if(_currentLocation.addAllListeners)
		_currentLocation.addAllListeners()
	if(__arrMod[v] && __arrMod[v].parent)
		__arrMod[v].parent.removeChild(__arrMod[v])
}

//----------- Установка координат -------------//
 function setCoor(o, x, y){
 	if(typeof(x) == "number")
 		o.x = x/__koefDisplay;
 	if(typeof(y) == "number")
 		o.y = y/__koefDisplay;
 };

/////////-- PRIVATE --//////////
////////////////////////////////
var updateBg = function(name){
	for (var i = 0; i < bgImgs.length; i++)
		if(__arrBG[bgImgs[i].name] && __arrBG[bgImgs[i].name].parentNode)
			__stageBG.removeChild(__arrBG[bgImgs[i].name]);
	__stageBG.appendChild(__arrBG[name]);
};

var createStage = function(nameCanvas, x, y) {
	canvasInit(nameCanvas)
	var newCan = document.getElementById(nameCanvas);
	var newStage = new createjs.Stage(newCan);
	createjs.Touch.enable(newStage);
	newStage.x = x;
	newStage.y = y;
	return newStage
};

var createBgImg = function(o) {
	var ret;
	if(images[o])
		ret = images[o];
	else{
		ret = document.createElement("div");
		ret.style.background = "linear-gradient(to bottom, #003366 0%, #003366 50%, #003366 100%)";
		ret.style.width = "100%";
		ret.style.height = "100%";
	}
	ret.id="bg";
	return ret;
};
///--- Инициализация первоначальных размеров canvas'а перед scal'ом ---///
var canvasInit = function (name)
{
	var can = document.getElementById(name)
	can.width = __WIDTHBG
	can.height = __HEIGHTBG
};

bgImgs = [
			{name:"preloader", url:"img_loading"},
			{name:"game", url:"img_game_bg"},
			{name:"other", url:"img_bg_stars"}
		];

__WIDTHBG = 640/__koefDisplay			// Ширина бэкграунда и всех канвасов
__HEIGHTBG = 960/__koefDisplay			// Высота бэкграунда и всех канвасов

WIDTHGAME = 640/__koefDisplay				// Габариты
HEIGHTGAME = 744/__koefDisplay			// игры
canvases = {
				game: "gameField",
				bg: "background"
			}
