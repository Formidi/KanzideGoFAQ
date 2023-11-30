# 教えて！ 漢字でGO!
## 膨大な問題／解説は手作業で記述していますか？
RPGツクールMVのイベント欄に、直接コマンドを入力したりマクロを使用してシステムを製作しております。

[回答日時：2023年8月30日 午前1:05](https://twitter.com/KanzideGo/status/1696554660612505795?s=20)

</br>
</br>

## プログラムはどうしている？
上の回答や画像の通りです。ツクールがJavaScript専用なのでjsを使用しています。

開発者はコードを読んだり書いたりできる！というわけではないので、自分ができないような仕組みは有志の方と協力しつつ組み立てています。

![Tips画面の処理](./images/kanzidego_event.png)  
- 『条件分岐：所持金 ≧ 0』としているのはイベントをまとめて移動するフォルダ代わりです。本ゲームでは所持金の概念がないので

</br>
</br>

## プログラムを全て開示してほしい

DL版のフォルダを漁ることで.jsファイル諸々を閲覧することができます。

また、原則として<strong class="strong large">誤解を防ぐため、本ゲームの問題やコードを改変した作品を二次配布することは一切禁じます。</strong>

</br>
</br>

## アニメーションやエフェクトはどう作っている？

ペイントツールでパーツを描いたあと、[Live2D](https://www.live2d.com/)と[AviUtl](https://spring-fragrance.mints.ne.jp/aviutl/)で動かしています。

エフェクトはAviUtlで比較的簡単に付けられます。

![AviUtlの操作画面](./images/kanzidego_anm.png)  

</br>
</br>

## ゲーム中の使用フォントが知りたい
基本フォント：[わんぱくルイカ](https://www.type-labo.jp/)  
解説などのフォント：[Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans+JP)  
漢字のフォント：[セイビタカナワ(B)](https://designpocket.jp/font/detail/3205)

</br>
</br>

## ステージや敵キャラの名前の由来が知りたい

ステージ名はあんまり考えずにフィーリングで付けてます。
例外として、銀始圏の世界だけ[閔子騫](https://ja.wikipedia.org/wiki/%E9%96%94%E5%AD%90%E9%A8%AB)です。

### キャンドリー
飴(candy) + 鳥

![キャンドリー](./images/Enm01A.png)  

</br>

### 古典インク
[没食子インク](https://ja.wikipedia.org/wiki/%E6%B2%A1%E9%A3%9F%E5%AD%90%E3%82%A4%E3%83%B3%E3%82%AF)の別名

![古典インク](./images/Enm02A.png)  

</br>

### VT-lvk01S
[真空管(vacuum tube)](https://ja.wikipedia.org/wiki/%E7%9C%9F%E7%A9%BA%E7%AE%A1) + Lvk(漢字でGO!専用フォルダの、問題を入れているフォルダ名) + 01(初期型) + S(サブドローン)

![VT-lvk01S](./images/Enm03A.png)  

</br>

### 破損データ
フィーリング

![破損データ](./images/Enm04A.png)  

</br>

### アッシュ
ヒトデの学名(Asteroidea)

![アッシュ](./images/Enm01B.png)  

</br>

### シデンクラゲ
紫電 + クラゲ

![シデンクラゲ](./images/Enm02B.png)  

</br>

### 覇流鬼華丹亜
[ハルキゲニア](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%AB%E3%82%AD%E3%82%B2%E3%83%8B%E3%82%A2)

![覇流鬼華丹亜](./images/Enm03B.png)  

</br>

### ミジンコ
[ミジンコ](https://ja.wikipedia.org/wiki/%E3%83%9F%E3%82%B8%E3%83%B3%E3%82%B3)
- ネーミングが安直な理由は、正面を向いたミジンコが初見だと分かりづらいため

![ミジンコ](./images/Enm04B.png)  

</br>

### ピョコまる
ピョコピョコ(擬音) + 人名の『～まる』 & 丸

![ピョコまる](./images/Enm01C.png)  

</br>

### レイピオス
[アスクレピオスの杖](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%AF%E3%83%AC%E3%83%94%E3%82%AA%E3%82%B9%E3%81%AE%E6%9D%96)

![レイピオス](./images/Enm02C.png)  

</br>

### UF-lvk67A
UFO + Lvk(漢字でGO!専用フォルダの、問題を入れているフォルダ名) + ドラゴンの頭2文字(**DR** + A)がなんちゃって[leet表記](https://ja.wikipedia.org/wiki/Leet)
- 6 → ちょっと崩すとDに見えなくもない
- 7 → 反転すると小文字のrっぽい

![UF-lvk67A](./images/Enm03C.png)  

</br>

### ツミノカブト
[ツミ](https://ja.wikipedia.org/wiki/%E3%83%84%E3%83%9F) & 罪 + 兜

![ツミノカブト](./images/Enm04C.png)  

</br>

### マイス（パラレルワールド）
『ADMIN』という、昔作ろうとして[エターなった](https://dic.nicovideo.jp/a/%E3%82%A8%E3%82%BF%E3%83%BC%E3%83%8A%E3%82%8B)ゲームに出てくるキャラクター…の、並行世界線の存在という設定

![マイス(パラレルワールド)](./images/EnmB.png)  

<details>
<summary>マイス（ADMIN）について</summary>
由来は『物質的実行編集ユニット(**M**aterial **I**mplement **C**ompil**e**r unit)』から

画像はハメコミ合成

![ADMINデモ画像01（ハメコミ）](./images/Demo53.png)
![ADMINデモ画像02（ハメコミ）](./images/Demo56.png)   

</details>

</br>
</br>


# ゲーム制作関係
## ゲームの作者について
- ゲーム構想：Micelle
- 開発：Micelle
- 一部システム開発：アカツキユウ、chuukunn
- BGM：Micelle
- SE：Micelle／OtoLogic
- 作画：Micelle
- アニメーション：Micelle
- 作問：Micelle／問題募集を送って下さった皆様

基本開発、ビジュアル作成、お問い合わせ回答、Twitter運営など、**大体みせる（Micelle）がワンオペで行っております**。

</br>
</br>

### **みせる（Micelle）**@[t3n3bra3](https://twitter.com/t3n3bra3) 
- 普段はヘンな動画を作ったり、BMSを制作していたりします。
- [漢検準一級](https://twitter.com/t3n3bra3/status/1598226797211942913)です。

</br>
</br>

### BGMも？
上記の通りみせる（Micelle）が作曲いたしました。  
YouTubeでは、デフォルト／アクア／スカイのBGM集を投稿しています。  
[<i class="fab fa-youtube"></i> 漢字でGO! ステージBGM集](https://youtu.be/pnc5hXPWmc4?si=pdYG-Nw0xaMNepRY)

</br>
</br>

## クレジットに記載されているスタッフは何をした人？
出題内容のデバッグ（校正）やプログラミングの補助、アドバイス等をいただきました。  

</br>
</br>