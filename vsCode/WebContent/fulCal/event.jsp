<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="events.CalEventDAO"%>
<%@page import="events.CalEvents"%>
<%@page import="java.util.List"%>
<%
	CalEventDAO dao = new CalEventDAO();
	String startDate = request.getParameter("startD");
	String endDate = request.getParameter("endD");
	List<CalEvents> list = dao.getEvents(startDate, endDate);
	for (CalEvents evnt : list) {
		System.out.println(evnt.getTitle());
	}
	System.out.println("=====end of =====");
	out.print(JSONArray.fromObject(list).toString());
%>