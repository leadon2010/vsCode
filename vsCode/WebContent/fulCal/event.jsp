<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="events.CalEventDAO"%>
<%@page import="events.CalEvents"%>
<%@page import="java.util.List"%>
<%
	CalEventDAO dao = new CalEventDAO();
	List<CalEvents> list = dao.getEvents();
	for (CalEvents ev : list) {
		System.out.println(ev.getTitle());
	}
	out.print(JSONArray.fromObject(list).toString());
%>