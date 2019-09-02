<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>출고관리</title>
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
			width: 75%;
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
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
	<script>
		$(function () {

			$.ajax({
				url: "<%=request.getContextPath()%>/IssueControl?action=issueForm",
				dataType: "json",
				success: function (result) {
					console.log(result);
					for (x in result) {
						var $tr = $("<tr>").attr("class", "tr");
						$tr.append($("<td>").html($("<input>").attr("type", "checkbox")),
							$("<td>").text(result[x].item_code),
							$("<td>").text(result[x].onhand_qty),
							$("<td>").html($("<input>").attr("type", "text")),
							$("<td>").text(1000),
							$("<td>").text(1000 * 10),
							$("<td>").text('AAA'),
							$("<td>").text('CUSTOMER01')
						)
						$("#issue_list").append($tr);
					}
				}
			});

			// 판매정보 생성 버튼 클릭시..
			$("#issue_frm").on("submit", function (e) {
				e.preventDefault();
				$("#issue_list .tr").each(function (i, o) {
					if ($(o).find("input").is(":checked")) {
						//console.log($(o).find("td").eq(1).text());
						createIssueInfo(o);
					}
				})
			})
		});

		function createIssueInfo(obj) {
			$.ajax({
				url: "<%=request.getContextPath()%>/IssueControl?action=getIssueNo",  // issue_no
				success: function (issue_no) {
					//console.log($(obj).find("td").eq(3) );
					var item_code = $(obj).find("td").eq(1).text();
					var issue_qty = $(obj).find("td").eq(3).children().eq(0).val();
					var issue_price = $(obj).find("td").eq(4).text();
					var issue_amount = $(obj).find("td").eq(5).text();
					var issue_sub = $(obj).find("td").eq(6).text();
					var issue_vendor = $(obj).find("td").eq(7).text();
					//console.log(issue_no, item_code, issue_qty, issue_price, issue_amount, issue_sub, issue_vendor)
					insertIssueRow(issue_no, item_code, issue_qty, issue_price, issue_amount, issue_sub, issue_vendor);
				}
			})
		}

		function insertIssueRow(issue_no, item_code, issue_qty, issue_price, issue_amount, issue_sub, issue_vendor) {
			$.ajax({
				url: "<%=request.getContextPath()%>/IssueControl",
				data: { "action": "insertRow", "issueNo": issue_no, "itemCode": item_code, "issueQty": issue_qty, "issuePrice": issue_price, "issueAmount": issue_amount, "issueSub": issue_sub, "issueVendor": issue_vendor },
				success: function (result) {
					console.log(result);
				}
			})
		}
	</script>
</head>

<body>

	<header>
		<h2>출고 관리 화면</h2>
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
			<h1>출고</h1>
			<a href="issueList.jsp">판매정보</a>
			<br><br>
			<div id="issue_no">판매번호#</div>
			<form id="issue_frm" action="">
				<table border='1' id="issue_list">
					<tr>
						<td>선택</td>
						<td>품명코드</td>
						<td>재고수량</td>
						<td>출고수량</td>
						<td>판매단가</td>
						<td>판매금액</td>
						<td>출고창고</td>
						<td>판매업체</td>
					</tr>
				</table>
				<br><br>
				<div class="center">
					<input type="submit" value="판매정보생성" />
				</div>
			</form>
		</article>
	</section>

</body>

</html>