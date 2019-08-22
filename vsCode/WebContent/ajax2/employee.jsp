<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="employee.SEmpDAO"%>
<%@page import="employee.SEmployee"%>
<%@page import="java.util.List"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	SEmpDAO dao = new SEmpDAO();
	List<SEmployee> list = dao.getEmplsList();
	out.print(JSONArray.fromObject(list).toString());
%>