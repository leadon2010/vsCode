<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.io.PrintWriter"%>
<%
	String fname = request.getParameter("fname");
	String lname = request.getParameter("lname");

	//PrintWriter p = response.getWriter();
	out.println("fname is " + fname + ", lname is " + lname);
%>