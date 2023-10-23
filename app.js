/**
 * app.js
 * @version 1.01
 * @author akatsuki_yu 1.01 urlパラメータにより読み込むファイルを変更する
 */
const defaultfilename = "faq";

// https://qiita.com/s-takayama/items/349d6bd414bc2f76a423
/**
 * fadeIn function
 * フェードイン
 *
 * @param	{Element} element		セレクター（DOM要素を指定）
 * @param	{number}	duration	 トランジッションの実行にかかる所要時間
 */
const fadeIn = (element, duration) => {
	if (element.style.opacity == '0.75') return;

	element.style.cssText = 'display: block; opacity: 0; transition: opacity ' + duration + 'ms;';

	setTimeout(() => {
		element.style.opacity = 0.75;
	}, 1);
}

/**
 * fadeOut function
 * フェードアウト
 *
 * @param	{Element} element		セレクター（DOM要素を指定）
 * @param	{number}	duration	 トランジッションの実行にかかる所要時間
 */
const fadeOut = (element, duration) => {
	if (element.style.opacity == '0') return;

	element.style.cssText = 'opacity: 0.75; transition: opacity ' + duration + 'ms;';

	setTimeout(() => {
		element.style.opacity = 0;
	}, 1);

	setTimeout(() => {
		element.style.display = 'none';
	}, duration + 10);
}





/**
 * 
 * @param data fetchで読み込んだテキスト 
 */
function formatAndSetMd(data) {
	var h1title = document.getElementById("pagetitle");
	var navlistul = document.getElementById("nav-index");
	var faqbodyarticle = document.getElementById("faqbody");
	// console.log(data);

	// fetchでエラーとなっている場合、HTML内にエラー表示があるので、throwしておく
	if (data.match("<title>Error</title>")) {
		const searchParams = new URLSearchParams(window.location.search);
		var err = data.match(/(?<=<pre>).+?(?=<\/pre>)/);
		throw new Error(
			"formatAndSetMd\n" + 
			err.pop());
	}

	// タイトル設定
	var titlepat = /(?<=<!-- *).+?(?= *-->)/;	// 1つめに出現したコメントをページタイトルとして使うので、mdファイルの先頭に必ずタイトルを入れておくこと
	var title = data.match(titlepat);

	if (title != null) {
		// var t = title[0].replace(/<!-- (.+?) -->/, "$1");
		document.title = '漢字でGO! - ' + title[0];
		h1title.insertAdjacentHTML("beforeend", title[0]);
	} else {
		document.title = '漢字でGO!';
	}

	// header1をすべて取得する
	var pattern = /(?<!#)# .+/g;
	var header1list = data.match(pattern);

	// console.log(header1list);

	for (var i = 0; i < header1list.length; i++) {
		var tx = header1list[i].replace(/^# /,"");
		navlistul.insertAdjacentHTML("beforeend", 
		'<li><a href="#' + tx + '">' + tx + '</a></li>');
	}	

	var html = data;

	// Discord式記述パターンへの対応（下線のみ先に対応）
	var underlinepattern = /__(.+?)__/g;
	html = html.replace(underlinepattern, "<u>$1</u>");

	/* *** Markdown → HTML parse *** */
	html = marked.parse(html);

	// h1にidを付与
	var h1idpattern = /<h1>(.+?)<\/h1>/g;
	html = html.replace(h1idpattern, '<h1 id="$1">$1</h1>');

	// Discord式記述パターン（強調の残り）
	var strongpattern = /\*\*(.+?)\*\*/g;
	html = html.replace(strongpattern, '<strong>$1</strong>');

	// 外部ページへのanchorにtarget="_blank"を付与
	var anchorpattern = /<a href="(http|https):\/\/(.+?)">/g;
	html = html.replace(anchorpattern, '<a href="$1://$2" target="_blank">');

	// twitterリンクのみの行をクラスtwitterにする
	var twitterpattern = /(?<=<(p|br)>(<[^\/]+?>)*)<a href="https*:\/\/(twitter|vxtwitter|x)\.com\/(.+?)"/g;
	html = html.replace(twitterpattern, '<a href="https://$3.com/$4" class="twitter"');

	// Twitterとこのページ以外でURLのみの行をクラスexternalにする
	var exclude = [
		window.location.host,
		'twitter\.com',
		'vx\.twitter',
		'x\.com',
		'forms.gle'
	].join("|");
	var externalpattern = new RegExp('(?<=<(p|br)>(<[^\/]+?>)*<a href="https*:\/\/)(?!(' + exclude + '))(.+?)"',"g");
	html = html.replace(externalpattern, '$4" class="external"');


	// imgにclass=thumbnailを付与、fancyboxする
	var imgpattern = /<img src="(.+?)" alt="(.+?)">/g;
	html = html.replace(imgpattern,
		'<a href="$1" data-fancybox="g1" data-caption="$2"><img src="$1" alt="$2" class="thumbnail" ></a>'
	);

	// bodyに埋め込み
	faqbodyarticle.insertAdjacentHTML("beforeend", html);

	// ページ内リンク全てにスムーススクロールを付与
	const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
	// console.log(smoothScrollTrigger);
		for (let i = 0; i < smoothScrollTrigger.length; i++){
			smoothScrollTrigger[i].addEventListener('click', (e) => {
				e.preventDefault();
				let href = smoothScrollTrigger[i].getAttribute('href');
				let targetElement = document.getElementById(href.replace('#', ''));
				const rect = targetElement.getBoundingClientRect().top;
				const offset = window.pageYOffset;
				const gap = 60;
				const target = rect + offset - gap;
				window.scrollTo({
					top: target,
					behavior: 'smooth',
				});

				// ロード時に無かった属性を追加
				document.getElementById("nav-index").classList.add("menumove");
				document.getElementById('menutoggle').classList.remove('active');
				document.getElementsByTagName('body')[0].classList.remove('open');
			});
		}
}

/**
 * ページロード時に実行
 */
window.addEventListener("DOMContentLoaded", ()=> {
	// デバッグ：windowサイズ取得
	// alert(
	// 	"screen.width: " + screen.width + "\n" +
	// 	"window.innerWidth: " + window.innerWidth + "\n\n" +

	// 	"screen.height: " + screen.height + "\n" +
	// 	"window.innerHeight: " + window.innerHeight
	// );

	/* reference : https://maku77.github.io/js/web/search-params.html */
	const searchParams = new URLSearchParams(window.location.search);
	var filename = "./md/{filename}.md";	// defaulturl
	var url = filename.replace(/{filename}/, defaultfilename);
	if (searchParams.has('p')) {
		url = filename.replace(/{filename}/, searchParams.get('p'));
	}

	// 本文取得
	fetch(url)
		.then( response => response.text())
		.then( data => formatAndSetMd(data))
		.catch(
			(err) => {
				console.error(`${err}`);
				url = filename.replace(/{filename}/, defaultfilename);
				fetch(url)
					.then( response => response.text())
					.then( data => formatAndSetMd(data))
			}
		)
});

/**
 * ボタン[id:move-page-top]を画面下部でフェードアウトさせる
 * のVanilla JS版
 */
window.addEventListener("scroll", (event) => {
	var body = document.getElementsByTagName('body')[0];

	// iPad（縦）よりwidthが大きい場合は消す必要がないので何もしない
	if (body.clientWidth > 640) {
		return;
	}

	//最上部から現在位置までの距離を取得して、変数[now]に格納
	var now = document.scrollingElement.scrollTop;

	//最下部から現在位置までの距離を計算して、変数[under]に格納
	var under = body.clientHeight - (now + window.innerHeight);
	var movepagetop = document.getElementById('move-page-top');
	var menutoggle = document.getElementById('menutoggle');

	if(under < 100){
		fadeOut(movepagetop, 500);
		fadeOut(menutoggle, 500);
	}else{
		fadeIn(movepagetop, 500);
		fadeIn(menutoggle, 500);
	}
	return;
});

// ドロワーメニュー　https://tivel.jp/archives/11037
// のVanilla JS版
document.getElementById("menutoggle")
	.addEventListener("click", function () {
		if (this.classList.contains('active')) {
			// ロード時に無かった属性を追加
			document.getElementById("nav-index").classList.add("menumove");
			this.classList.remove('active');
			document.getElementsByTagName('body')[0].classList.remove('open');

		} else {
			this.classList.add('active');
			document.getElementsByTagName('body')[0].classList.add('open');
		}
	}
);
document.getElementById("overlay")
	.addEventListener("click", function () {
		var body = document.getElementsByTagName('body')[0];
		if(body.classList.contains('open')){
			body.classList.remove('open');
			document.getElementById('menutoggle').classList.remove('active');
		}
	}
);



// Fancybox起動
Fancybox.bind("[data-fancybox]", {
	// Your custom options
});


// jQuery(function($){

// 	//-- スムーズスクロール部分の記述 --
// 	// #で始まるアンカーをクリックした場合に処理
// 	// jquery3系は#に""が必要
// 	// https://qiita.com/Takuya_Kouyama/items/b815eb5e1f85d819b4d8
// 	$('a[href^="#"]').click(function() {
// 		// スクロールの速度
// 		var speed = 400; // ミリ秒
// 		// アンカーの値取得
// 		var href= $(this).attr("href");
// 		// 移動先を取得
// 		var target = $(href == "#" || href == "" ? 'html' : href);

// 		// 移動先を数値で取得
// 		var position = target.offset().top;
// 		// スムーススクロール
// 		$('body,html').animate({scrollTop:position}, speed, 'swing');
// 		return false;
// 	});


// });
$(document).foundation();