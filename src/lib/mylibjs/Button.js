extend(Button, createjs.Container);

// Параметры Button:
// pod - подложка
// icon - иконка
// font - шрифт надписи
// txt - текст надписи
// txtX - координата Х надписи
// txtY - координата Y надписи
// on - иконка для включенного состояния
// off - иконка для выключенного состояния
// i - иконка2
function Button(p)
{
	this.initialize();
//---------------------//
	var podl = p.pod ? p.pod : null
	var currentAnimation
	if(podl){
		var pp = new createjs.Sprite(jsons["JSON1"]);
		pp.gotoAndStop(podl);
		this.addChild(pp);
	}

	var nam = p.icon ? p.icon : null
	if(nam){
		var b = new createjs.Sprite(jsons["JSON1"]);
		// b.x = this.getBounds().width/2 - b.getBounds().width/2
		// b.y = this.getBounds().height/2 - b.getBounds().height/2
		b.gotoAndStop(nam);
	this.addChild(b);
	}

	var text = p.font ? new FontText(p.font, "Center") : null
	var t = p.txt ? p.txt : null
	if(text && t){
		text.setText(t)
		text.x = p.txtX ? p.txtX/__koefDisplay : this.getBounds().width/2
		text.y = p.txtY ? p.txtY/__koefDisplay : this.getBounds().height/2 - text.getBounds().height
		// dragAndDrop(text)
		this.addChild(text)
	}

	var _on, _off;
	if(p.on){
		_on = new createjs.Sprite(jsons["JSON1"]);
		_on.gotoAndStop(p.on);
		_on.x = p.onX ? p.onX/__koefDisplay : 0
		_on.y = p.onY ? p.onY/__koefDisplay : 0
		this.addChild(_on)
		// dragAndDrop(_on)
		if(p.off){
			_off = new createjs.Sprite(jsons["JSON1"]);
			_off.gotoAndStop(p.off);
			_off.x = p.offX ? p.offX/__koefDisplay : 0
			_off.y = p.offY ? p.offY/__koefDisplay : 0
			this.addChild(_off)
			// dragAndDrop(_off)
		}
	}

	var _icon;
	if(p.i){
		_icon = new createjs.Sprite(jsons["JSON1"]);
		_icon.gotoAndStop(p.i);
		_icon.x = p.iconX ? p.iconX/__koefDisplay : 0
		_icon.y = p.iconY ? p.iconY/__koefDisplay : 0
		_icon.scaleX = p.iconScaleX ? p.iconScaleX/__koefDisplay : 1
		_icon.scaleY = p.iconScaleY ? p.iconScaleY/__koefDisplay : 1
		// dragAndDrop(_icon)
		this.addChild(_icon)
	}


// Установка v состояния кнопки
	this.changeFrame = function(v){
		if(v == "off"){
			// if(_icon && _off && _on){
			if(_icon)
				_icon.alpha = .5
				// _off.alpha = 1
				// _on.alpha = 0
			// }
			currentAnimation = "off"
		}else{
			// if(_icon && _off && _on){
			if(_icon)
				_icon.alpha = 1
				// _off.alpha = 0
				// _on.alpha = 1
			// }
			currentAnimation = "on"
		}
	};
	// this.changeFrame("off")

// Переключение между состояниями кнопки
	this.changeBeetweenAnim = function(a1, a2){
		if(currentAnimation == "off") {
			this.changeFrame("on");
			return "on";
		}else{
			this.changeFrame("off");
			return "off"
		}
	}

	this.changeIcon = function(p){
		if(_icon.parent)
			_icon.parent.removeChild(_icon)

		_icon = new createjs.Sprite(jsons["JSON1"]);
		_icon.gotoAndStop(p.i);
		_icon.x = p.iconX ? p.iconX/__koefDisplay : 0
		_icon.y = p.iconY ? p.iconY/__koefDisplay : 0
		_icon.scaleX = p.iconScaleX ? p.iconScaleX/__koefDisplay : 1
		_icon.scaleY = p.iconScaleY ? p.iconScaleY/__koefDisplay : 1
		// dragAndDrop(_icon)
		this.addChild(_icon)
	}
}