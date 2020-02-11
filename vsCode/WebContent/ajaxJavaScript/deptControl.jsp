<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="dept.Departments"%>
<%@page import="dept.DeptDAO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	String action = request.getParameter("action");
	if (action.equals("listjson")) {
		Departments dept = new Departments();
		DeptDAO dao = new DeptDAO();
		List<Departments> list = new ArrayList<>();
		list = dao.getDeptList();
		out.print(JSONArray.fromObject(list).toString());

	} else if (action.equals("listxml")) {
		response.setContentType("text/xml; charset=utf-8");
		Departments dept = new Departments();
		DeptDAO dao = new DeptDAO();
		List<Departments> list = new ArrayList<>();
		list = dao.getDeptList();
		out.println("<departments>");
		for (Departments d : list) {
			out.println("<dept>");
			out.println("  <department_id>" + d.getDepartmentId() + "</department_id>");
			out.println("  <department_name>" + d.getDepartmentName() + "</department_name>");
			out.println("  <manager_id>" + d.getManagerId() + "</manager_id>");
			out.println("  <location_id>" + d.getLocationId() + "</location_id>");
			out.println("</dept>");
		}
		out.println("</departments>");

	} else if (action.equals("insert")) {

	} else if (action.equals("") || action == null) {

	}
%>