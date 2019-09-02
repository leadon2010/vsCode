<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="ajax.projectMini.Issue"%>
<%@page import="ajax.projectMini.IssueDAO"%>
<%@page import="java.util.List"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>출하정보 리스트</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			font-family: Arial, Helvetica, sans-serif;
		}

		/* Style the header */
		header {
			background-color: #666;
			padding: 30px;
			text-align: center;
			font-size: 35px;
			color: white;
		}

		/* Create two columns/boxes that floats next to each other */
		nav {
			float: left;
			width: 25%;
			height: 500px;
			/* only for demonstration, should be removed */
			background: #ccc;
			padding: 20px;
		}

		/* Style the list inside the menu */
		nav ul {
			list-style-type: none;
			padding: 0;
		}

		article {
			float: left;
			padding: 20px;
			width: 60%;
			background-color: #f1f1f1;
			height: auto;
			/* only for demonstration, should be removed */
		}

		/* Clear floats after the columns */
		section:after {
			content: "";
			display: table;
			clear: both;
		}

		/* Style the footer */
		footer {
			background-color: #777;
			padding: 10px;
			text-align: center;
			color: white;
		}

		/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
		@media (max-width : 600px) {

			nav,
			article {
				width: 100%;
				height: auto;
			}
		}

		.center {
			display: "block";
			margin-left: auto;
			margin-right: auto;
			width: 20%;
		}
	</style>
	<script>
		function issueTxn(issueNo) {
			window.location.href = "http://localhost:8080/javaScript/IssueControl?action=issueTxn&issueNo=" + issueNo;
			console.log("txn");
		}
	</script>
</head>

<body>

	<header>
		<h2>입고 관리 화면</h2>
	</header>

	<section>
		<nav>
			<ul>
				<li><a href="receipt.jsp">입고관리화면</a></li>
				<li><a href="issue.jsp">출고관리화면</a></li>
				<li><a href="onhand.jsp">재고조회화면</a></li>
			</ul>
		</nav>

		<article>
			<h1>Issue List</h1>
	<%
		IssueDAO dao = new IssueDAO();
		List<Issue> list = dao.getIssueInfoList();
		out.println("<table border=1>");
		out.println(
				"<tr><th>ReceiptNo</th><th>ReceiptItem</th><th>ReceiptQty</th><th>ReceiptPrice</th><th>ReceiptAmt</th><th>ReceiptSub</th><th>Vendor</th><th width=150>ReceiptTxn</th></tr>");
		for (Issue rt : list) {
			out.println("<tr><td>");
			out.println(rt.getIssueNo() + "</td><td>");
			out.println(rt.getIssueItem() + "</td><td>");
			out.println(rt.getIssueQty() + "</td><td>");
			out.println(rt.getIssuePrice() + "</td><td>");
			out.println(rt.getIssueAmount() + "</td><td>");
			out.println(rt.getIssueSub() + "</td><td>");
			out.println(rt.getIssueVendor() + "</td><td align='center'>");
			out.println("<button onclick=\"issueTxn(\'"+rt.getIssueNo()+"\')\">출고</button>" + "</td></tr>");
		}
		out.println("</table>");
	%>
		</article>
	</section>

	<footer>
		<p>Footer</p>
	</footer>

</body>

</html>