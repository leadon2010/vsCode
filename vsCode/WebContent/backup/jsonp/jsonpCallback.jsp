<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.List" %>
<%@page import="employee.EmpDAO" %>
<%@page import="employee.Employee" %>
<%@page import="net.sf.json.JSONArray" %>
<%
	//String data = "[{\"id\":1,\"first_name\":\"Adara\",\"last_name\":\"Yielding\",\"email\":\"ayielding0@msn.com\",\"gender\":\"Female\"},{\"id\":10,\"first_name\":\"Dara\",\"last_name\":\"Lovick\",\"email\":\"dlovick9@nytimes.com\",\"gender\":\"Female\"},{\"id\":1000,\"first_name\":\"Eve\",\"last_name\":\"Petch\",\"email\":\"epetchrr@arstechnica.com\",\"gender\":\"Female\"}]";
	EmpDAO dao = new EmpDAO();
	Employee emp = new Employee();
	List<Employee> data = dao.getEmplsList();
	out.print("myFunc(" + JSONArray.fromObject(data).toString() + ");");
%>