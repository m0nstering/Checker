function init()
{
	// __bg.initGame()
/////////// Чтение локального хранилища ///////////
	readStorage();
	st_setNumPlay(1)
	if(st_getNumPlay() % __config.add2home == 0){
		ADD_TO_HOME();
	}
////////// Создание Stage для игры //////////
	v_initLocations();
	// v_choiseLocation("splash");
	// t_delayOn(2, function(){
		MusicCTRL.on("sound", 1);
		MusicCTRL.on("music");
		MusicCTRL.play("music");
		v_choiseLocation("menu");
	// })
};