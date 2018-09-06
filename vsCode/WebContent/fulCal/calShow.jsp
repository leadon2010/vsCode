<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel='stylesheet' href="../fullcalendar-3.9.0/fullcalendar.css" />
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
<script src="../fullcalendar-3.9.0/lib/jquery.min.js"></script>
<script src="../fullcalendar-3.9.0/lib/moment.min.js"></script>
<script src="../fullcalendar-3.9.0/fullcalendar.js"></script>
<script>
	$(function() {

		var param = {
			defaultView : 'month',
			height : 550,
			fixedWeekCount : false,
			//hiddenDays : [ 0 ],
			columnHeaderFormat : 'dddd',
			header : {
				left : 'title',
				center : 'month,agendaWeek,agendaDay',
				right : 'prevYear,prev today next,nextYear'
			},
			footer : {
				left : 'title',
				center : 'month,agendaWeek,agendaDay',
				right : 'prevYear,prev today next,nextYear'
			},
			buttonText : {
				today : 'Today',
				month : 'Month',
				week : 'Week',
				day : 'Day',
				list : 'List',
			},
			navLinks : true,
			navLinkDayClick : function(date, jsEvent) {
				console.log('day', date.format()); // date is a moment
				$("#calendar").fullCalendar('changeView', 'agendaWeek',
						date.format());
			},
			views : {
				month : {
					titleFormat : 'MMMM YYYY',
				},
				agendaWeek : {
					titleFormat : 'D MMM YYYY',
				},
				agendaDay : {
					titleFormat : 'D MMM YYYY',
				},
			},
			events : function(start, end, timezone, callback) {
				console.log("====" + start.format() + "  " + end.format() + "====");
				$.ajax({
					url : 'event.jsp?startD=' + start.format() + '&endD=' + end.format(),
					type : 'POST',
					dataType : 'json',
					data : {
						start : start.format(),
						end : end.format()
					},
					success : function(result) {
						var events = [];
						if (result) {
							$.map(result, function(r) {
								events.push({
									title : r.title,
									start : r.startDate,
									end : r.endDate,
									id : 1234,
									url : '/',
								});
							});
						}
						callback(events);
					},
				})// $.ajax call
			},
		};

		$("#calendar").fullCalendar(param);// fullcalendar

		var view = $("#calendar").fullCalendar('getView');
		//console.log(view);

		$("#prevBtn").click(function() {
			$("#calendar").fullCalendar('prev');
		});
		$("#todayBtn").click(function() {
			$("#calendar").fullCalendar('today');
		});
		$("#nextBtn").click(function() {
			$("#calendar").fullCalendar('next');
		});

	});//$(document).ready
</script>
</head>
<body>
	<h1 align="center">Full Calendar Show</h1>
	<p align="center">how to handle calendar</p>
	<hr>
	<div id="calendar"></div>
	<hr>
	<div align="center">
		<button id="prevBtn">Prev</button>
		<button id="todayBtn">Today</button>
		<button id="nextBtn">Next</button>
	</div>
</body>
</html>