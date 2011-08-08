// Mario JS
var mL = mR = mU = gU = mD = mB = uB = false;
var dTimeout;

(function( $ ){
  $.fn.Mario = function() {
  	
	$('<mario>').appendTo('playground');	
	var mario = $('mario');
	
	var moveL = function(){
		mario.toggleClass('walk').addClass('left').removeClass('right');
		mario.animate({ left: '-=15' },100);
	};
	
	var moveR = function(){		
		mario.toggleClass('walk').removeClass('left').addClass('right');
		mario.animate({ left: '+=15' },100);
	};
	
	var pushD = 0;
	var moveD = function(){
		//mL = mR = false
		if( !mB && pushD == 0  ){
			dTimeout = setTimeout(function(){ mB = true },150);
			pushD++;
		}
	}
	
	var minJ = 150;
	var maxJ = 200;
	var initJ = minJ;
	var jumpMario = function(){		
		var up = parseInt(mario.css('bottom'));
		
		if( up > minJ ){ mario.addClass('jump'); } else { mario.removeClass('jump');}
		
		if( gU ){ // Subir
			if(up<=maxJ){
				uB = true;
				initJ = ( initJ == 0 ) ? minJ : initJ;
				//mario.css({ 'bottom': initJ+'px' });
				mario.css({ bottom: initJ });
				initJ = initJ+1;
			} else {
				gU = false;	
			}
		} else if( !gU ) { // Bajar
			if (up>=minJ){
				mario.css({ bottom: initJ });
				initJ = initJ-1;
			} else {
				uB = false;
			}
		}
	};
	
	var moverMario = function(){
		
		// Mover a la Izquierda
		if( mL && !mR && !mB ){ moveL(); }
		// Mover a la Derecha	
		if( mR && !mL && !mB  ){ moveR(); }
		// Agacharse
		if( mD ){ moveD(); }		
		// Saltar!
		//if( mU ){ gU = true; }		
		
	};
	
	setInterval(function(){ moverMario(); },110);
	setInterval(function(){ jumpMario(); },0);
	
    this.keydown(function(event){
		switch(event.keyCode){
			case 37:
				mL = true;
				break;
			case 38:
				if( !uB ){ mU = gU = true; }
				break;
			case 39:
				mR = true;
				break;
			case 40:
				mario.addClass('down');
				mD = true;
				break;
		}
		return false;
	});
	
	
    this.keyup(function(event){
		switch(event.keyCode){
			case 37:
				mario.addClass('left').removeClass('right walk');
				mL = false;
				break;
			case 38:
				mU = false;
				break;
			case 39:				
				mario.removeClass('left walk').addClass('right');
				mR = false;
				break;
			case 40:	
				clearTimeout(dTimeout);
				mario.removeClass('down');
				mD = mB = false;
				pushD = 0;
				break;
		}		
		return false;
	});
	
  };
})( jQuery );