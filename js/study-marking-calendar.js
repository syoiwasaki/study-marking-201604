
$(document).ready(function() {

  // ----- Initialize.
   
    var showOnloadMessage = function() {
  	// alert('読み込みました.');
  }

	// 今日の日付データ取得
	var myDate = new Date(); 
	
	var myToday = myDate.getDate(); 
	// 年を取得 
	var myYear = myDate.getFullYear(); 
	// 月を取得(0月～11月)
	var myMonth = myDate.getMonth() + 1;

	// 月始め1日の曜日を取得 
	myDate.setDate(1);
	var myWeek = myDate.getDay();
	
	// 月の最終日を取得
	var lastDay = new Date(myYear, myMonth, 0); 
	var myLastDay = lastDay.getDate();
	
	// テーブルの行数
	var myTableLowNum = Math.ceil(myWeek + myLastDay) / 7;

	//$("h1").text( myYear + "年" + myMonth + "月");
 	$('#calendar THEAD').append(
    	$('<tr>').append(
     	$('<th colspan="7">').text(myYear + "/" +  myMonth )
    	)
  	);


	//ヘッダー
	$('#calendar THEAD').append(
		$("<tr>").append(
		$("<th>").text("Sun").css({'color':'white','background-color':'red'}).attr('class', 'col-xs-1'),
		$("<th>").text("Mon").attr({'class':'col-xs-1'}),
		$("<th>").text("Tue").attr({'class':'col-xs-1'}),
		$("<th>").text("Wed").attr({'class':'col-xs-1'}),
		$("<th>").text("Thu").attr({'class':'col-xs-1'}),
		$("<th>").text("Fri").attr({'class':'col-xs-1'}),
		$("<th>").text("Sat").css({'color':'white','background-color':'blue'}).attr('class', 'col-xs-1')
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
			case 0: myWeek='日';
				break;
			case 1: myWeek='月';
				break;
			case 2: myWeek='火';
				break;
			case 3: myWeek='水';
				break;
			case 4: myWeek='木';
				break;
			case 5: myWeek='金';
				break;
			case 6: myWeek='土';
				break;
		}
		
		//出力
		alert(myYear + '/' + myMonth + '/' + clickDay + '(' + myWeek + ')' );
	});

  showOnloadMessage();
});
