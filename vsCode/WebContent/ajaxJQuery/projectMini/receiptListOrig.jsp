<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="ajax.projectMini.Receipt"%>
<%@page import="ajax.projectMini.MemberDAO"%>
<%@page import="java.util.List"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문정보 리스트</title>
</head>
<body>
	<h1>Receipt List</h1>
	<%
		MemberDAO dao = new MemberDAO();
		List<Receipt> list = dao.getReceiptInfoList();
		out.println("<table border=1>");
		out.println(
				"<tr><th>ReceiptNo</th><th>ReceiptItem</th><th>ReceiptQty</th><th>ReceiptPrice</th><th>ReceiptAmt</th><th>ReceiptSub</th><th>Vendor</th></tr>");
		for (Receipt rt : list) {
			out.println("<tr><td>");
			out.println(rt.getReceiptNo() + "</td><td>");
			out.println(rt.getReceiptItem() + "</td><td>");
			out.println(rt.getReceiptQty() + "</td><td>");
			out.println(rt.getReceiptPrice() + "</td><td>");
			out.println(rt.getReceiptAmount() + "</td><td>");
			out.println(rt.getReceiptSub() + "</td><td>");
			out.println(rt.getReceiptVendor() + "</td><td></tr>");
		}
		out.println("</table>");
	%>
</body>
</html>