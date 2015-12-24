var mas = new Array();
var paused = new Array();
var __freq = 30///__koefDisplay;
var time;

//-- Добавление функции в массив таймера
function t_addToTicker(func) {
	var ind = indexOf(mas, func)
	if(ind == -1)
		mas.push(func);
	else
		mas[ind] = func;
};
//-- Удаление функции из массива таймера
function t_delInTicker(func) {
	var ind = indexOf(mas, func)
	if(ind != -1)
		mas.splice(ind,1);
};

function t_delAllInTicker(){
	for (var i = 0; i < mas.length; i++) {
		if(mas[i]!=__mainTicker){
			t_delInTicker(mas[i])
			i--
		}
	};
}

//-- Добавление функции в массив паузы (функция не будет вызываться до вызова delInPause)
function t_setPause(f) {
	var ind = indexOf(paused, f)
	if(ind == -1)
		paused.push(f)
}
//-- Удаление функции из массива таймера
function t_delInPause(f) {
	var ind = indexOf(paused, f)
	if(ind != -1)
		paused.splice(f)
}
//-- Пауза всех функций
function t_allInPause(){
	for (var i = 0; i < mas.length; i++) {
		if(mas[i]!=__mainTicker)
			t_setPause(mas[i])
	};
}

function t_delAllInPause(){
	for (var i = 0; i < mas.length; i++) {
		t_delInPause(mas[i])
	};
}
//-- Старт тикера javascript
function t_startTicker() {
	time = setInterval(function(){
									for (var i = 0; i < mas.length; i++) {
										if(indexOf(paused, mas[i]) == -1)
											mas[i]();
									};
								}, 1000/__freq)
};
//-- Остановка таймера
function t_stopTicker() {
	clearInterval(time);
};
//-- Очистка массива функций
function t_removeAllTimers(){
	mas = new Array();
}
//-- Вызов функции с задержкой (Возвращает указатель на функцию)
function t_delayOn(val, callback, pars) {
	var t = 0;
	var f = function(){
						if(t>__freq*val){
							t_delInTicker(f);
							if(callback)
								callback.apply(null, pars);
							return;
						};
						t++;
					};
	t_addToTicker(f);

	return f;
}
//-- Периодический вызов функции(callback) с задержкой(val)
function t_intervalOn(val, callback, pars, time, after_full) {
	var ret;
	var loop = function (val, callback, pars) {
		var fun = function(pars){
			callback.apply(null, pars);
			loop(val, callback, pars)
		}
		ret = t_delayOn(val, fun, pars)
	}
	if(time){
		t_delayOn(time, function(){
			t_delInTicker(ret)
			if(after_full)
				after_full()
		})
	}
	loop(val, callback, pars)
	
	// return ret
}