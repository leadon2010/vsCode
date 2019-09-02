<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script>
	var xhr;
	function deptList(){
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = deptListCallback;
		xhr.open("GET", "./server/deptControl.jsp?action=listjson");
		xhr.send();
	};
	function deptListCallback(){
		if ( xhr.readyState == 4 && xhr.status == 200 ){
			console.log(xhr.responseText);
			//var datas = eval("(" + xhr.responseText + ")");
			var datas = JSON.parse(xhr.responseText);
			console.log(datas);
			var div = document.getElementById("result");
			div.innerHTML += "<ul id='list'>";
			for(i=0;i<datas.length;i++){
				div.innerHTML += "<li>" + datas[i].departmentId + " " + datas[i].departmentName;
			}
			div.innerHTML += "</ul>";
		}
	};
	window.onload = deptList;
</script>
</head>
<body>
	<h3>부서등록</h3>
	<form>
		<input type="text" name="department_id" /> 
		<input type="text" name="department_name" /> 
		<input type="text" name="manager_id" /> 
		<input type="text" name="manager_id" /> 
		<input type="button" value="등록" onclick="deptIns()" />
	</form>

	<h3>부서목록</h3>
	<div id="result"></div>

</body>
</html>