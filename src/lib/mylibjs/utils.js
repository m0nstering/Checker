function importScript(url)
{
	var script = document.createElement('script');
	script.src = "src/" + url;
	document.head.appendChild(script);
}

function extend(Child, Parent) {

    var F = function() { }

    F.prototype = Parent.prototype

    Child.prototype = new F()

    Child.prototype.constructor = Child

    Child.superclass = Parent.prototype
}

function dragAndDrop(o){
    var dx;
    var dy;
    o.addEventListener("mousedown", function(e){
                                            dx = e.stageX - e.target.x;
                                            dy = e.stageY - e.target.y;
                                        });
    o.addEventListener("pressmove", function(e){
                                        e.target.x = e.stageX - dx;
                                        e.target.y = e.stageY - dy;
                                        });
    o.addEventListener('pressup', function(e){console.log(e.target.x, e.target.y)})
};

function indexOf(mas, val){
    var ret = -1;
    for (var i = 0; i < mas.length; i++)
        if(mas[i] == val)
            ret = i;
    return ret;
};

function searchObjectWithPar(arr, pars){
    var ret = -1
    for(var i = 0; i< arr.length; i++){
        for(var a = 0; a< pars.length; a++){
            // console.log(typeof(arr[i][pars[a][0]]), arr[i][pars[a][0]], pars[a][1])
            if(typeof(arr[i][pars[a][0]]) == "number" || typeof(arr[i][pars[a][0]]) == "object")
                if(arr[i][pars[a][0]] == pars[a][1]){
                    // console.log("MINUS")
                    if(a == pars.length-1)
                        ret = i
                    else
                        continue
                }else{
                    break;
                }
        }
    }

    return ret
}

function distXY(x1, y1, x2, y2){
    return Math.sqrt((x2 - x1) * (x2 - x1) +(y2 - y1) * (y2 - y1))
};

function round(v){
    return Math.round(v * 100)/100
};

function radToDeg(v){
    return v * 180/Math.PI;
}

 
//Returns true if the circles are touching, or false if they are not
function circlesColliding(x1, y1, radius1, x2, y2, radius2){
    //compare the distance to combined radii
    var dx = x2 - x1;
    var dy = y2 - y1;
    var radii = radius1 + radius2;
    if ( ( dx * dx )  + ( dy * dy ) < radii * radii )
        return true;
    else
        return false;
}

// Деление нацело
function div(val, by){
    return (val - val % by) / by;
}


function ResizeGame() {
    window.scrollTo(0, 1);
    var newWidth = WIDTHGAME						// 
    var newHeight = HEIGHTGAME
/////////----- Canvas -----------/////////////
    var dWidth = __WIDTHBG - newWidth
    var dHeight = __HEIGHTBG - newHeight
////////--------------------//////////////////
	var widthArea = __WIDTHBG - dHeight									// Ширина игровой области
	var heightArea = __HEIGHTBG - dWidth									// Высота игровой области
    var releativeDisplay = window.innerWidth / window.innerHeight		// Отношение ширины экрана к высоте
    var releativeGame = __WIDTHBG / ((heightArea - dHeight))				// Отношение ширины игровой области к высоте
   	// Есои отношение > 1, то ориегтация ландшафтная, иначе - портретная
    var gameArea = document.getElementById('gameArea');                 // Игровая область
    var img = document.getElementById('imgl2p');                        // Игровая область
    var bg = document.getElementById('background');                     // Игровая область
    var game = document.getElementById('gameField');                    // Игровая область
    if(window.orientation != undefined)
    if (releativeDisplay > 1) {
    	// To do (если ориентация ландшафтная)
        bg.style.display = "none";
        game.style.display = "none";
    	img.style.display = "table-cell";
    	// return
    }else{
    	// To do (если ориентация портретная)
        bg.style.display = "block";
        game.style.display = "block";
	    img.style.display = "none"
    }
    ///////  Изменение размера области игры в соответствии с изменением размера окна ////////////////
    if (releativeDisplay > releativeGame) {
    	gameArea.style.height = (__HEIGHTBG) * window.innerHeight / (heightArea - dHeight) + "px"
    	gameArea.style.width = (__WIDTHBG) * window.innerHeight / (heightArea - dHeight) + "px"
    	gameArea.style.left = window.innerWidth/2 - (__WIDTHBG * window.innerHeight / (heightArea - dHeight) )/2 + "px"
        gameArea.style.top = -(dHeight/2) * window.innerHeight / (heightArea - dHeight) + "px"
    } else
    {
    	gameArea.style.height = heightArea * window.innerWidth / __WIDTHBG + "px"
    	gameArea.style.width = widthArea * window.innerWidth / widthArea + "px"
    	gameArea.style.top = window.innerHeight/2 - (__HEIGHTBG * window.innerWidth / __WIDTHBG)/2 + "px"
    	gameArea.style.left = "0px"
    }
}