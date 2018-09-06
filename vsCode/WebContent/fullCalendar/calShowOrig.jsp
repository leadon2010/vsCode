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
		var vEvents = [];
		$("#calendar").fullCalendar({
			defaultView : 'month',

			events : [ {
				title : 'event1',
				start : '2018-09-11'
			}, {
				title : 'event2',
				start : '2018-09-18',
				end : '2018-09-22'
			}, {
				title : 'event3',
				start : '2018-10-18',
				end : '2018-10-22'
			}, ]
		});
	});
</script>
</head>
<body>
	<div id="calendar"></div>
</body>
</html>