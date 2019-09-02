<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="employee.SEmployee"%>
<%@page import="employee.SEmpDAO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%
	String name = request.getParameter("name");
	SEmployee emp = new SEmployee();
	SEmpDAO dao = new SEmpDAO();
	List<SEmployee> list = new ArrayList<>();
	list = dao.getEmpList(name);
	out.print("<table border='1'><tr><th>FirstName</th><th>LastName</th><th>Salary</th></tr>");
	for (SEmployee empl : list) {
		//out.print("your info is " + empl.getFirstName() + ", " + empl.getLastName() + ", " + empl.getSalary() + "<br>");
		out.print("<tr><td>" + empl.getFirstName() + "</td><td>" + empl.getLastName() + "</td><td>"
		+ empl.getSalary() + "</td></tr>");
	}
	out.print("</table>");
%>