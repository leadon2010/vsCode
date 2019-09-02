<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%
	Map<String, String[]> map = request.getParameterMap();
	Iterator<String> keys = map.keySet().iterator();
	//while(keys.hasNext()){

	//}
	map.forEach((k, v) -> System.out.println(k + ": " + v));
	//System.out.println(map);
	out.println("end");
	//out.println(map.forEach(action));
%>