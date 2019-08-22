<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map"%>
<%@page import="login.MapTest"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	String userId = request.getParameter("user_id");
	String userPw = request.getParameter("user_pw");
	System.out.println(userId + ", " + userPw);
	MapTest tst = new MapTest();
	List<Map<String, Object>> list = tst.returnMap();
	for (Map<String, Object> m : list) {
		if (m.get("user_id").equals(userId) && m.get("user_pw").equals(userPw)) {
			out.print("{\"user_id\":\"" + m.get("user_id") + "\",\"user_name\":\"" + m.get("user_name")
					+ "\",\"user_pw\":\"" + m.get("user_pw") + "\"}");
			return;
		}
	}

	//if (userId.equals("korea") && userPw.equals("12345")) {
	//	out.print("{\"user_id\":\"korean\",\"user_name\":\"한국인\",\"user_pw\":\"12345\"}");
	//} else {
	//	out.print("{\"user_id\":\"\",\"user_name\":\"\",\"user_pw\":\"\"}");
	//}
%>

