var Level1_1 = function(){};

Level1_1.prototype = {
	
	column_id: 1,	
	// Crear Columnas
	createColumn: function(t,h,l){
		$('<column>').prop('id','column-'+this.column_id).addClass(t).css({ 'height': h, 'left': l }).appendTo('columns');
		for(var i = 0; i<=2; i++){				
			min_top = randomFromTo(10,15)*(i+1);
			max_top = randomFromTo(25,30)*(i+1);			
			$('<dot>')
				.css({
					'top': randomFromTo(min_top,max_top)+'%',
					'left': randomFromTo(10,80)+'%'
				})
				.appendTo('#column-'+this.column_id);
		}
		this.column_id++;			
	},
	
	// Crear Nubes
	cloud_id: 1,	
	createCloud: function(w,l,t){
		$('<cloud>').prop('id','cloud-'+this.column_id).css({ 'width': w, 'left': l, 'top': t }).appendTo('clouds');
		this.cloud_id++;			
	}
	
};