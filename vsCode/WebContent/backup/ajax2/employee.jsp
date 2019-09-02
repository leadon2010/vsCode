<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="employee.EmpDAO"%>
<%@page import="employee.Employee"%>
<%@page import="java.util.List"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	EmpDAO dao = new EmpDAO();
	List<Employee> list = dao.getEmplsList();
	out.print(JSONArray.fromObject(list).toString());
%>