<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="employee.Employee"%>
<%@page import="net.sf.json.JSONArray" %>
<jsp:useBean id="emp" class="employee.Employee" />
<jsp:setProperty name="emp" property="*" />
<jsp:useBean id="dao" class="employee.EmpDAO"></jsp:useBean>
<jsp:setProperty property="*" name="dao" />
<%
	String action = request.getParameter("action");
	if (action.equals("list")) {
		List<Employee> list = new ArrayList<>();
		list = dao.getEmpList("");
		out.print(JSONArray.fromObject(list).toString());
	}
%>