<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel='stylesheet' href="../fullcalendar-3.9.0/fullcalendar.css" />
<script src="../fullcalendar-3.9.0/lib/jquery.min.js"></script>
<script src="../fullcalendar-3.9.0/lib/moment.min.js"></script>
<script src="../fullcalendar-3.9.0/fullcalendar.js"></script>
<script>
	$(function() {
		var vEvents = [];
		$.ajax({
			url : "event.jsp",
			success : function(result) {
				var datas = JSON.parse(result);
			}
		})
		$("#calendar").fullCalendar({
			defaultView : 'month',
			events : [ {
				title : 'event1',
				start : '2018-09-12'
			}, {
				title : 'event2',
				start : '2018-09-20',
				end : '2018-09-25'
			} ]
		});
	})
</script>
</head>
<body>
	<div id="calendar"></div>
</body>
</html>