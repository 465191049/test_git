var nt_meta='{"name":"rootnode111","type":"0","detail":"I am rootnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515",'+
			'"leftson":[{"name":"subnode111","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"},'+
			'{"name":"subnode222","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"}],'+
			'"rightson":[{"name":"subnode666","type":"0","detail":"I am subnode","comment":"no opinion","author":"rd_jingqing_xie","time":"23432541515"}]}';

var root_x=250;
var root_y=300;
var h_interval=50;
var v_interval=10;
var max_chars=50;
var font_size_root=16;
var font_size_second=14;
var font_size_third=12;
var fill_color_root='rgb(115, 161, 191)';
var stroke_color="rgb(57, 80, 96)";

function func_draw_naotu(t){
	let obj = JSON.parse(t);
	let root_name=obj['name'];
	let str_svg='aaa';
};
function func_draw_root(){
}
function func_draw_node(){
}
function func_draw_connect(){
}
function func_draw_text(){
}
function get_path_d(){
}
var nt={};
nt.h_interval=50;
nt.v_interval=10;

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