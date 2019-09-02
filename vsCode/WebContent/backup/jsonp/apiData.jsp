<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="../js/jquery-3.3.1.min.js"></script>
<script>
	$(function() {
		var $http = "https://api.flightstats.com/flex/schedules/rest/v1/json/from/GMP/to/HND/departing/2018/09/15?appId=6d442315&appKey=301aa216b58dee04e31de0f4d5733590";
		$.ajax({
			url : $http,
			success : function(result) {
				console.log(result);
				var datas = JSON.stringify(result);
				console.log("myFunc(" + datas + ");");
				var returnStr = "myFunc(" + datas + ");";
				$("#dataShow").text(returnStr);
			}
		});
	});
</script>
</head>
<body>
	<div id="dataShow"></div>
</body>
</html>