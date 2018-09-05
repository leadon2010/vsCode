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
			events : function(start, end, timezone, callback) {
				$.ajax({
					url : 'event.jsp',
					type : 'POST',
					dataType : 'json',
					data : {
						start : start.format(),
						end : end.format()
					},
					success : function(result) {
						console.log(result);
						var events = [];
						if (result) {
							$.map(result, function(r) {
								events.push({
									title : r.title,
									start : r.startDate,
									end : r.endDate
								});
							});
						}
						callback(events);
					}
				})
			}
		});
	});
</script>
</head>
<body>
	<div id="calendar"></div>
</body>
</html>