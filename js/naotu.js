
String.prototype.getTextWH = function(style){//获取字符串宽度及高度

	var $span=$("<span>"+this+"</span>");

	$span.css($.extend({},style,{visibility:"hidden"}));

	$("body").append($span);

	var result={

		"w":$span.width(),

		"h":$span.height()

	};

	$span.remove();

	return result;

};


var nt={};

nt.nt_meta='{"name":"rootnode111","type":"0","detail":"I am rootnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515",'+
			'"leftson":[{"name":"subnode111","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"},'+
			'{"name":"subnode222","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"}],'+
			'"rightson":[{"name":"subnode666","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"}]}';

nt.root_h=$(window).width()/2;
nt.root_v=$(window).height()/2;

nt.h_interval=50;
nt.v_interval=10;

nt.max_chars=50;
nt.font_size_root=16;
nt.font_size_second=14;
nt.font_size_third=12;
nt.fill_color_root='rgb(115, 161, 191)';
nt.stroke_color="rgb(57, 80, 96)";

nt.func_make_ui_meta=function(){
	let obj = JSON.parse(nt.nt_meta);
}

nt.func_make_ui_meta_right=function(right_list){
	for(node in right_list){
		if('rightson' in node.keys() && lenth(node['rightson'])>0{
			nt.func_make_ui_meta_right(node['rightson']);
		}else{//叶子结点了
			//计算本叶子的宽高
		}
	}
}

nt.func_draw_naotu=function(){
	let obj = JSON.parse(nt.nt_meta);
	
	//先画根节点
	let root_name=obj['name'];
	g_root=nt.func_draw_root(root_name);
	
	//再画rightson
	if('rightson' in obj.keys()){
		let right_son=obj['rightson'];
		for(node in right_son){
			//如何定位node坐标呢？？？
		}
	}
	

	var svg_1='<g id="kity_g_8" transform="translate(0, 0)">'
				+	'<g id="minder1" text-rendering="optimize-speed" transform="translate( '+ nt.root_h + ' ' + nt.root_v +' )">'
				+       '<g id="minder_connect_group1">'
				+       '</g>'
				+		nt.func_draw_root(root_name)
				+	'</g>'
				+'</g>' ;
				
	$('#svg_1').html(svg_1);
};
nt.func_get_path_d=function(node_name,font_size){
	let wh=node_name.getTextWH({
		"fontSize" : ""+font_size+"px"
	});
	
	d="M";
	d=d+"-"+(wh.w/2+font_size)+",";
	d=d+"-"+font_size;
	d=d+' h'+(wh.w+font_size*2);
	if(font_size == 16){
		d=d+' a5,5,0,0,1,5,5';
	}else if(font_size == 14){
		d=d+' a3,3,0,0,1,3,3';
	}
	d=d+' v'+(font_size*2);
	if(font_size == 16){
		d=d+' a5,5,0,0,1,-5,5';
	}else if(font_size == 14){
		d=d+' a3,3,0,0,1,-3,3';
	}
	d=d+' h-'+(wh.w+font_size*2);
	if(font_size == 16){
		d=d+' a5,5,0,0,1,-5,-5';
	}else if(font_size == 14){
		d=d+' a3,3,0,0,1,-3,-3';
	}
	d=d+' v-'+(font_size*2);
	if(font_size == 16){
		d=d+' a5,5,0,0,1,5,-5';
	}else if(font_size == 14){
		d=d+' a3,3,0,0,1,3,-3';
	}
	d=d+' z';
	return d;
}
nt.func_draw_text=function(node_name,font_size){
	let wh=node_name.getTextWH({
		"fontSize" : ""+font_size+"px"
	});
	return '<g id="node_text1" transform="translate( -'+(wh.w/2)+' '+(font_size/2)+' )" fill="white">'
				+				'<text id="kity_text_22" text-rendering="inherit" dominant-baseline="text-before-edge" font-size="'+font_size+'" dy="0" y="0">'+node_name
				+				'</text>'
				+			'</g>';
}
nt.func_draw_root=function(root_name){

	return '<g id="root_node" transform="matrix( 1 0 0 1 0 0 )">'
				+			'<path id="node_outline1" fill="rgb(115, 161, 191)" stroke="rgb(57, 80, 96)" d="'+nt.func_get_path_d(root_name,nt.font_size_root)+'" stroke-width="3">'
				+			'</path>'
				+			nt.func_draw_text(root_name,nt.font_size_root)
				+		'</g>';
}
function func_draw_node(){
}
function func_draw_connect(){
}



nt.test=function(){
    var svg_1='<g id="kity_g_8" transform="translate(0.5, 0.5)">'
				+	'<g id="minder1" text-rendering="optimize-speed" transform="translate( 373 335 )">'
				+       '<g id="minder_connect_group1">'
				+       '</g>'
				+		'<g id="minder_node1" transform="matrix( 1 0 0 1 0 0 )">'
				+			'<path id="node_outline1" fill="rgb(115, 161, 191)" stroke="rgb(57, 80, 96)" d="M-19,-20h96a5,5,0,0,1,5,5v30a5,5,0,0,1,-5,5h-96a5,5,0,0,1,-5,-5v-30a5,5,0,0,1,5,-5z" stroke-width="3">'
				+			'</path>'
				+			'<g id="node_text1" transform="translate( 0 -2.4 )" fill="white">'
				+				'<text id="kity_text_22" text-rendering="inherit" dominant-baseline="text-before-edge" font-size="16" dy="0" y="-8">aaa'
				+				'</text>'
				+			'</g>'
				+		'</g>'
				+	'</g>'
				+'</g>' ;
				
	$('#svg_1').html(svg_1);

};