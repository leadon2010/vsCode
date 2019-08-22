<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String jsonData = "{\"name\":\"John\", \"age\":30, \"city\":\"New York\"}";
	out.print("myFunc(" + jsonData + ")");
%>