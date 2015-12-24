extend(ProgressBar, createjs.Container)

function ProgressBar(sheet, empty, full, pars)
{	
	this.initialize();
//---------------------------//
	var p;
	var p_b;
	if(sheet){
		if(empty){
			p_b = jsons[sheet + __disSuffiks] ? new createjs.Sprite(jsons[sheet + __disSuffiks]) : new createjs.Bitmap(images[empty]);										// подложка прогрессас
			if(p_b.gotoAndStop)
				p_b.gotoAndStop(empty);
			if(pars.alphaPodl)
				p_b.alpha = pars.alphaPodl;
			this.addChild(p_b);
		};									
		p = jsons[sheet + __disSuffiks] ? new createjs.Sprite(jsons[sheet + __disSuffiks]) : new createjs.Bitmap(images[full]);;											// прогрес
		if(p.gotoAndStop)
			p.gotoAndStop(full);
		this.addChild(p);
		
	}else{
		p = full;
		p_b = empty;
	};

	p.x = typeof(pars.xf) == "number" ? pars.xf/__koefDisplay : p_b.getBounds().width/__koefDisplay/2 - p.getBounds().width/__koefDisplay/2;					// координаты прогресса
	p.y = typeof(pars.yf) == "number" ? pars.yf/__koefDisplay : p_b.getBounds().height/__koefDisplay/2 - p.getBounds().height/__koefDisplay/2;

	var fullVall = p.getBounds().width;													// Маска (если прогресс горизонтальный)
	var m = new createjs.Shape();
	m.graphics.beginFill("#000000").drawRect(0, 0, fullVall, this.getBounds().height);
	// m.alpha = .5
	setCoor(m, -fullVall + p.x)
	m.x = -fullVall + p.x;
	p.mask = m;
	// this.addChild(m);


	this.setLvl = function(val){
		if(val>100)
			val = 100;
		var v = fullVall * val/100;
		// setCoor(m, (-fullVall + p.x) + v)
		m.x = (-fullVall + p.x) + v;
	};

	this.gotoLvl = function(val, cb){
		if(val>100)
			val = 100;
		var v = fullVall * val/100;
		// console.log(round((-fullVall + p.x) + v), m.x);
		tw_tweenTo(m, round((-fullVall + p.x) + v), m.y, null, cb);
	};
};