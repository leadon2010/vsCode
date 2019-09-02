<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script>
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = callback;
	xhttp.open("GET", "deptControl.jsp?action=listjson");
	xhttp.send();
	
	function callback(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var datas = JSON.parse(xhttp.responseText);
			console.log(datas);
			var p = document.getElementById('demo');
			p.innerHTML += "<ul>";
			for(i=0; i<datas.length;i++){
				p.innerHTML += "<li>" + datas[i].departmentId + " " + datas[i].departmentName + "</li>";
			}
			p.innerHTML += "</ul>";
		}
	}
	
	
</script>
</head>
<body>
	<h3>부서목록</h3>
	<div id="demo">
		<table id=>
			<tr><td>111</td></tr>
			<tr><td>222</td></tr>
		</table>
	</div>
</body>
</html>