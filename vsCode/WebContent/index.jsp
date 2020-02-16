<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
	<%
		String fname = request.getParameter("fname");
		String lname = request.getParameter("lname");
	%>
	<h1>fName : <%=fname %></h1>
	<h1>lName : <%=lname %></h1>
</body>
</html>