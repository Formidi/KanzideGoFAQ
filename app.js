/**
 * app.js
 * @version 20230912
 * @author akatsuki_yu 20230912 first commit
 */
const url = "./faq.md";

$(document).foundation();

/**
 * 
 * @param data fetchで読み込んだテキスト 
 */
function formatAndSetMd(data) {
	var navlistul = document.getElementById("nav-index");
	var faqbodyarticle = document.getElementById("faqbody");
	// console.log(data);

	// header1をすべて取得する
	var pattern = /(?<!#)# .+/g;
	var header1list = data.match(pattern);
	header1list.pop();

	// console.log(header1list);

	for (var i = 0 ; i < header1list.length; i++) {
		var tx = header1list[i].replace(/^# /,"");
		navlistul.insertAdjacentHTML("beforeend", 
		'<li><a href="#' + tx + '">' + tx + '</a></li>');
	}	

	var html = data;
	// Discord式記述パターンへの対応（下線のみ先に対応）
	var underlinepattern = /__(.+?)__/g;
	html = html.replace(underlinepattern, "<u>$1</u>");

	// Markdown → HTML parse
	html = marked.parse(html);

	// Discord式記述パターン（強調の残り）
	var strongpattern = /\*\*(.+?)\*\*/g;
	html = html.replace(strongpattern, '<strong>$1</strong>');

	// h1にidを付与
	var h1idpattern = /<h1>(.+?)<\/h1>/g;
	html = html.replace(h1idpattern, '<h1 id="$1">$1</h1>');

	// 外部ページへのanchorにtarget="_blank"を付与
	var anchorpattern = /<a href="(http|https):\/\/(.+?)">/g;
	html = html.replace(anchorpattern, '<a href="$1://$2" target="_blank">');

	// 回答日時リンクをsmallにする
	var anchorkaitoupattern = /<a href=(.+?)>回答日時：/g;
	html = html.replace(anchorkaitoupattern, '<a href=$1 class="small"><i class="fab fa-twitter"></i> 回答日時：');

	// imgにclass=thumbnailを付与、fancyboxする
	var imgpattern = /<img src="(.+?)" alt="(.+?)">/g;
	html = html.replace(imgpattern,
		'<a href="$1" data-fancybox="g1" data-caption="$2"><img src="$1" alt="$2" class="thumbnail" ></a>'
	);

	// bodyに埋め込み
	faqbodyarticle.insertAdjacentHTML("beforeend", html);
}

/**
 * ページロード時に実行
 */
window.addEventListener("load", ()=>{
	fetch(url)
		.then( response => response.text())
		.then( data => formatAndSetMd(data))
		// fetch結果を確認するためのソース
});

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});


jQuery(function($){

	//-- スムーズスクロール部分の記述 --
	// #で始まるアンカーをクリックした場合に処理
	// jquery3系は#に""が必要
	// https://qiita.com/Takuya_Kouyama/items/b815eb5e1f85d819b4d8
	$('a[href^="#"]').click(function() {
	  // スクロールの速度
	  var speed = 400; // ミリ秒
	  // アンカーの値取得
	  var href= $(this).attr("href");
	  // 移動先を取得
	  var target = $(href == "#" || href == "" ? 'html' : href);

	  // 移動先を数値で取得
	  var position = target.offset().top;
	  // スムーススクロール
	  $('body,html').animate({scrollTop:position}, speed, 'swing');
	  return false;
	});

		//ボタン[id:page-top]を出現させるスクロールイベント
	$(window).scroll(function(){
		// iPad（縦）よりwidthが大きい場合は消す必要がないので何もしない
		if ( $('body').width() > 640) {
			return;
		}

		//最上部から現在位置までの距離を取得して、変数[now]に格納
		var now = $(window).scrollTop();

		//最下部から現在位置までの距離を計算して、変数[under]に格納
		var under = $('body').height() - (now + $(window).height());

		if(under < 100){
			//フェードアウトする
			$('#MODORIBUTTON').fadeOut('slow');
		}else{
			//ゆっくりフェードインする
			$('#MODORIBUTTON').fadeIn('slow');
			if ( $('body').width() < 768) {
			}
		}
		return;
	});

	// ドロワーメニュー　https://tivel.jp/archives/11037
	$('#menutoggle').on('click',function(){
	if($(this).hasClass('active')){
		// ロード時に無かった属性を追加
		$('#MENULIST').css('transition','all .5s ease');

		$(this).removeClass('active');
		$('body').removeClass('open');
	} else {
		$(this).addClass('active');
		$('body').addClass('open');
	}
	});
	$('.overlay').on('click',function(){
	if($('body').hasClass('open')){
		$('body').removeClass('open');
		$('#menutoggle').removeClass('active');
	}
	});


});