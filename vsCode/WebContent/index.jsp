<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="login.LoginDAO"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
	<%
		String id = request.getParameter("uname");
		String passwd = request.getParameter("psw");

		LoginDAO dao = LoginDAO.getInstance();
		if (dao.memberCheck(id, passwd)) {
			session.setAttribute("userId", id);
		} else {
			response.sendRedirect("index.html");
		}
	%>

</body>
</html>