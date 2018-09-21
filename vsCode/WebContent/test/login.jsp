<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String userId = request.getParameter("user_id");
	String userPw = request.getParameter("user_pw");

	if (userId == "korean" && userPw == "12345") {
		out.print("{\"user_id\":\"korean\",\"user_pw\":\"12345\"");
	} else {
		out.print("{\"user_id\":\"korean\",\"user_pw\":\"12345\"");
	}
%>

