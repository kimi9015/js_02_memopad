// <有酸素運動（エアロバイク）>

var msg;
var number;
var count = 0;
var timer_id;

function startShowing() {
   count = 0;
   number = document.getElementById("number").value;
   document.getElementById("startcount").disabled = true;
   countup();
}

function stopShowing() {
   count = 0;
   clearTimeout(timer_id);
   document.getElementById("startcount").disabled = false;
}

function countup() {
   count ++;
   document.getElementById("PassageArea").innerHTML = count;
   console.log(count % number);
   if(count % number == 0){
      sound1();
   }else{
      sound2();
   }
   timer_id = setTimeout(countup,1000);
}

function sound1(){
	var id = 'sound-file1';
	if( typeof( document.getElementById( id ).currentTime ) != 'undefined' ){
		document.getElementById( id ).currentTime = 0;
	}
	document.getElementById( id ).play() ;
}

function sound2(){
	var id = 'sound-file2';
	if( typeof( document.getElementById( id ).currentTime ) != 'undefined' ){
		document.getElementById( id ).currentTime = 0;
	}
	document.getElementById( id ).play() ;
}


// 「記録する！」を押したら、曜日・部位・エアロバイクの時間をテーブルに表示


$('#kirokusuru').click(function(){

   // セレクトボックスで選択した曜日
   const text = $('#checkbox_youbi option:selected').val();

   //  チェックボックスで選択した鍛えた部位
   const bui = [];
   $('input[name=bui]:checked').each(function(){
      bui.push($(this).val());
      $('#buihyouji').text(bui);
      });
   
   // エアロバイクを漕いだ時間を四捨五入（小数点第一位へ）
   const shishagonyuu = Math.round((timer_id /60)*10)/10;

   // データをオブジェクトで保存
   var datalist = {youbi:text, bui:bui, time:shishagonyuu}

   // JSONデータに変換して登録
   localStorage.setItem("setdata", JSON.stringify(datalist));

   // JSONデータに戻して取得
   var d = JSON.parse(localStorage.getItem("setdata"));

   // テーブルに表示
   const html = `
   <tr>
        <td>${text}</td>
        <td>${bui}</td>
        <td>${shishagonyuu}</td>
      </tr>`;
   $('#list').append(html);

});


// 「clear」を押したら最終行を削除
$('#kuriasuru').click(function(){
   localStorage.clear();
   $('tr:last').remove();
});
