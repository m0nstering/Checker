var m_tweem = new Array();
var delay = __freq;
var __pause;
// Запуск программной анимации объекта
// значения параметров:
// x - целевая координата x
// y - целевая координата y
// d - время анимации
// alpha - целевое значение alpha
// scaleX - целевое значение scaleX
// scaleY - целевое значение scaleY
// rotate - целевое значение rotation
// call - функция, вызывающаяся по завершению
// pars - параметры функции, вызывающейся по завершению
// everyTick - функция, вызывающаяся при кождом тике
// pet - параметры функции, вызывающейся при кождом тике
// impR - значение импульса для вращения объекта
// mass - масса (объект становится физичесим)
// nonStop - если true. то анимация зацикливается

// Функция запуска анимации
function tw_tweenTo(o, pars){
	if(o.x == pars.x && o.y == pars.y && o.alpha == pars.alpha && o.scaleX == pars.scaleX && o.scaleY == pars.scaleY)
		return;
	var fl;
	var de = pars.d ? pars.d : 1;							// Время
	var al = pars.alpha ? round(pars.alpha) : o.alpha;	// альфа
	var scaleX = pars.scaleX ? round(pars.scaleX) : o.scaleX;	// альфа
	var scaleY = pars.scaleY ? round(pars.scaleY) : o.scaleY;	// альфа
	var rotate = pars.rotate ? round(pars.rotate) : o.rotation;
	var callBack = pars.call ? pars.call : null;			// Callback)
	var p = pars.pars;								// Параметры
	pars.x = pars.x ? pars.x : o.x;
	pars.y = pars.y ? pars.y : o.y;
	var speedX = (pars.x - o.x)/(delay * de);
	var speedY = (pars.y - o.y)/(delay * de);
	var speedRot = (rotate - o.rotation)/(delay * de);
	var speedScX = (scaleX - o.scaleX)/(delay * de);
	var speedScY = (scaleY - o.scaleY)/(delay * de);
	var speedAlpha = (al - o.alpha)/(delay * de);
	// console.log(speedX, speedY);
	// var rRot = rot ? round(rot + o.rotation) : o.rotation;
	var impulsRot = pars.impR ? round(pars.impR) : 0;
	var obj = {
		o:o,
		nonSt: pars.nonStop,
		//----- Альфа -----//
		rAl: al,
		sA: speedAlpha,
		//---- Координаты -----//
		rX:pars.x,
		rY:pars.y,
		sX: speedX,
		sY: speedY,
		mass: pars.mass,
		time: 0,
		//---- Scale -----//
		rScX:scaleX,
		rScY:scaleY,
		sScX: speedScX,
		sScY: speedScY,
		//---- Rotation ----//
		impuls: impulsRot,
		rRotate: rotate,
		speedRot: speedRot,
		// ---- Callback ---- //
		cb: callBack,
		p: p,
		et: pars.everyTick,
		pet: pars.pet
	};
	// console.log(scaleX)
	for(var a=0; a< m_tweem.length; a++)
		if(m_tweem[a].o == o){
			m_tweem[a] = obj;
			fl = true;
		};
	if(!fl)
		m_tweem.push(obj);

	// if(jele)
	// 	o.scaleX-=.2;
	t_addToTicker(to);
};
// Функция остановки анимации
function tw_removeTween(v){
	for(var i=0; i < m_tweem.length; i++)
		if(m_tweem[i].o == v)
			m_tweem.splice(i, 1);
};
// Функция остановки всех анимаций
function tw_removeAllTweens(){
	m_tweem = new Array();
	t_delInTicker(to);
};

function tw_pause(){
	t_setPause(to)
}

function tw_unPause(){
	t_delInPause(to)
}

var to = function(){
	if(__pause)
		return;
	var f;
	// console.log(m.length);
	for (var i = 0; i < m_tweem.length; i++) {
		if(Math.abs(m_tweem[i].rX-m_tweem[i].o.x)<Math.abs(m_tweem[i].sX) && !m_tweem[i].nonSt)
			m_tweem[i].sX = m_tweem[i].rX-m_tweem[i].o.x;
		if(Math.abs(m_tweem[i].rY-m_tweem[i].o.y)<Math.abs(m_tweem[i].sY) && !m_tweem[i].nonSt)
			m_tweem[i].sY = m_tweem[i].rY-m_tweem[i].o.y;
		//-----Scale -------//
		if(Math.abs(m_tweem[i].rScX-m_tweem[i].o.scaleX)<Math.abs(m_tweem[i].sScX))
			m_tweem[i].sScX = m_tweem[i].rScX-m_tweem[i].o.scaleX;
		if(Math.abs(m_tweem[i].rScY-m_tweem[i].o.scaleY)<Math.abs(m_tweem[i].sScY))
			m_tweem[i].sScY = m_tweem[i].rScY-m_tweem[i].o.scaleY;
		//-----Alpha-------//
		if(Math.abs(m_tweem[i].rAl-m_tweem[i].o.alpha)<Math.abs(m_tweem[i].sA))
			m_tweem[i].sA = m_tweem[i].rAl-m_tweem[i].o.alpha;

		// setCoor(m_tweem[i].o, m_tweem[i].o.x + m_tweem[i].sX, m_tweem[i].o.y + m_tweem[i].sY)
		if(m_tweem[i].mass) {
			m_tweem[i].sY = m_tweem[i].time// (m_tweem[i].o.y - (m_tweem[i].o.y + m_tweem[i].sY))/(delay*.03)
			m_tweem[i].time+=m_tweem[i].mass//*= .98//
		}
		m_tweem[i].o.x = m_tweem[i].o.x + m_tweem[i].sX;
		m_tweem[i].o.y = m_tweem[i].o.y + m_tweem[i].sY;
		m_tweem[i].o.scaleX = m_tweem[i].o.scaleX + m_tweem[i].sScX;
		m_tweem[i].o.scaleY = m_tweem[i].o.scaleY + m_tweem[i].sScY;
		m_tweem[i].o.alpha = m_tweem[i].o.alpha + m_tweem[i].sA;

		if(m_tweem[i].impuls){
			m_tweem[i].o.rotation = m_tweem[i].o.rotation + m_tweem[i].impuls;
			if(Math.abs(m_tweem[i].impuls) > .1){
				var ddd = m_tweem[i].impuls * .98//  m_tweem[i].F/100
				m_tweem[i].impuls = ddd;
			}else if(m_tweem[i].impuls){
				m_tweem[i].impuls = false;
			}
		}else if(m_tweem[i].speedRot){
			m_tweem[i].o.rotation = m_tweem[i].o.rotation + m_tweem[i].speedRot;
		}
		// if(m_tweem[i].impuls)
		// 	console.log(round(m_tweem[i].o.rotation), round(m_tweem[i].rR));

		if(m_tweem[i].et)
			m_tweem[i].et.apply(null, m_tweem[i].pet);
		if(m_tweem[i])
			if(round(m_tweem[i].o.x)==round(m_tweem[i].rX) && (round(m_tweem[i].o.y)==round(m_tweem[i].rY) || (m_tweem[i].mass && round(m_tweem[i].o.y)>=round(m_tweem[i].rY)))
			 && round(m_tweem[i].o.alpha)==round(m_tweem[i].rAl)
			  && round(m_tweem[i].o.rotation)==round(m_tweem[i].rRotate)
			  && round(m_tweem[i].o.scaleX)==round(m_tweem[i].rScX) && round(m_tweem[i].o.scaleY)==round(m_tweem[i].rScY)
			  && !m_tweem[i].impuls 
			   && !m_tweem[i].nonSt){
				if(m_tweem[i].mass && round(m_tweem[i].o.y)>=round(m_tweem[i].rY)){
					m_tweem[i].o.y = m_tweem[i].rY
				}
			   	// console.log(m_tweem[i].nonSt)
				var func;
				var params;
				if(m_tweem[i].cb){
					func = m_tweem[i].cb;
					params = m_tweem[i].p;
				};
				m_tweem.splice(i, 1);
				i--;
				if(func)
					func.apply(null, params);
			};
	};
	if(m_tweem.length == 0)
		t_delInTicker(to);
};
