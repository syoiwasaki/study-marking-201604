
	// 曜日 
 	var Sun = "日";
 	var Mon = "月";
 	var Tue = "火";
 	var Wed = "水";
 	var Thu = "木";
 	var Fri = "金";
 	var Sat = "土";
 	
 	// 言語(デフォルト：日本語)
 	var lang = "Ja";
 	
 	// エラーメッセージ(デフォルトメッセージ：日本語)
 	var ErrMsg = "ファイルの読み込みに失敗しました。";
 	
 	// クリック時メッセージ(デフォルトメッセージ：日本語)
 	var ClickMsg = "が選択されました。";
 	
 	// 1900年1月～2100年12月の範囲外でのエラーメッセージ
 	// (デフォルトメッセージ：日本語)
 	var RangErreMsg = "1900/1 ～ 2100/12 の範囲内で入力を行ってください。 ";
 	
$(document).ready(function() {

	try{
  // ----- Initialize.
   
   // 1900年1月～2100年12月の範囲内でない場合表示されない
    var OutOfYear = function() {
    	if((myYear > 2100) || (myYear < 1900)){
   			 $('#calendar THEAD').empty();
   			 $('#calendar TBODY').empty();
  			alert(RangeErrMsg);
  			//break;
  		}
  	}

	// 今日の日付データ取得
	var myDate = new Date(); 
	
	// 当日・当月・年をそれぞれ取得
	var myToday = myDate.getDate(); 
	var myYear = myDate.getFullYear(); 
	var myMonth = myDate.getMonth() + 1;

	// 月始め1日の曜日を取得 
	myDate.setDate(1);
	var myWeek = myDate.getDay();
	
	// 月の最終日を取得
	var lastDay = new Date(myYear, myMonth, 0); 
	var myLastDay = lastDay.getDate();
	
	// テーブルの行数
	var myTableLowNum = Math.ceil(myWeek + myLastDay) / 7;
	
	 // 言語表示関連処理
	 // 言語を変更する場合、ここに追加
 	if(lang == "Ja"){
 		// 曜日設定
 		Sun = "日";
 		Mon = "月";
 		Tue = "火";
 		Wed = "水";
 		Thu = "木";
 		Fri = "金";
 		Sat = "土";
 		
 		// メッセージ設定
 		ErrMsg = "ファイルの読み込みに失敗しました。";
 		ClickMsg = "が選択されました。";
	 }else if(lang == "Eng"){
	 	// 曜日設定
	 	Sun = "Sun";
 		Mon = "Mon";
 		Tue = "Tue";
 		Wed = "Wed";
 		Thu = "Thu";
 		Fri = "Fri";
 		Sat = "Sat";
 		
 		ErrMsg = "Error : File Read Failure.";
 		ClickMsg = " is Clicked.";
 		RangErreMsg = "Error : Beyond the limits of 1900/1 ～ 2100/12. ";
	 }

 	$('#calendar THEAD').append(
    	$('<tr>').append(
     	$('<th colspan="7">').text(myYear + "/" +  myMonth )
    	)
  	);

	//ヘッダー
	$('#calendar THEAD').append(
		$("<tr>").append(
		$("<th>").text(Sun).css({'color':'white','background-color':'red'}).attr('class', 'col-xs-1'),
		$("<th>").text(Mon).attr({'class':'col-xs-1'}),
		$("<th>").text(Tue).attr({'class':'col-xs-1'}),
		$("<th>").text(Wed).attr({'class':'col-xs-1'}),
		$("<th>").text(Thu).attr({'class':'col-xs-1'}),
		$("<th>").text(Fri).attr({'class':'col-xs-1'}),
		$("<th>").text(Sat).css({'color':'white','background-color':'blue'}).attr('class', 'col-xs-1')
		)
	);

//カレンダー
	var calendarDay = 0;
	for (var i = 0; i < myTableLowNum; i++) {
		var tr = $("<tr>");
		
		for (var j = 0; j < 7; j++) {

			//月初を指定
			if (i == 0 && j == myWeek) {
				calendarDay = 1;
			}
			
			if (calendarDay == 0 || calendarDay > myLastDay) {

				//1日以前、月末以降のセルにスペース登録
				var td = $("<td>").text("  ");
			} else {

				//クリックした日の登録
				//cssの追加
				var td = $("<td>").text(calendarDay++).attr('class', 'click');
			}
			
			if (calendarDay == myToday + 1) {

				//本日の背景色変更
				 $(td).css({'font-weight':'bold','background-color':'yellow'});
			}
			
			// 土日祝日の文字色変更
			if (j == 0) {
				$(td).css('color', 'red');
			} else if (j == 6) {
				$(td).css('color', 'blue');
			}
			tr.append(td);
		}
		$('#calendar TBODY').append(tr);
	}
	
	// クリックした日付を格納する変数
	var clickDay;
	
	// クリック時イベント（ボタンクリック時）
	$('.click').on('click', function () {
		clickDay = $(this).html();
		
		// 選択日付の曜日を取得 
		myDate.setDate(clickDay);
		myWeek = myDate.getDay();
		
		// その日の曜日を取得
		switch (myWeek) {
			case 0: myWeek = Sun;
				break;
			case 1: myWeek = Mon;
				break;
			case 2: myWeek = Tue;
				break;
			case 3: myWeek = Web;
				break;
			case 4: myWeek = Thu;
				break;
			case 5: myWeek = Fri;
				break;
			case 6: myWeek = Sat;
				break;
		}
		
		//出力
		alert(myYear + "/" + myMonth + "/" + clickDay + "(" + myWeek + ")" + ClickMsg );
	});
  // 年数が範囲外の場合、ダイアログ表示。
  OutOfYear();
  }
  catch(e){
  	// ファイルの読み込みに失敗した場合、メッセージ表示
    $('#calendar THEAD').empty();
   	$('#calendar TBODY').empty();
  	alert(ErrMsg);
  }
});
