<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd";>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h2>author list</h2>
	<table border='1'>
		<tr>
			<th>author</th>
			<th>title</th>
		</tr>
		<c:forEach items="${list }" var="l">
			<tr>
				<td>${l.author }</td>
				<td>${l.title }</td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>


