<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>입고관리</title>
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

			$("#receipt_btn").on("click", function () {
				var $item_code = $("#receipt_table [name=item_code]").val();
				var $receipt_qty = $("#receipt_table [name=receipt_qty]").val();
				var $receipt_price = $("#receipt_table [name=receipt_price]").val();
				var $sale_price = $("#receipt_table [name=sale_price]").val();
				var $receipt_sub = $("#receipt_table [name=receipt_sub]").val();
				var $receipt_vendor = $("#receipt_table [name=receipt_vendor]").val();
				$tr = $("<tr class='tr'>").append($("<td>").text($item_code),
					$("<td>").text($receipt_qty),
					$("<td>").text($receipt_price),
					$("<td>").text($sale_price),
					$("<td>").text($receipt_price * $sale_price),
					$("<td>").text($receipt_sub),
					$("<td>").text($receipt_vendor),
					$("<td>").html($("<button>").text("제외").click(removeRow))
				)
				$("#receipt_list").append($tr);
			});

			$("#receipt_frm").on("submit", function (e) {
				e.preventDefault();
				createReceiptInfo();
			})
		});

		function createReceiptInfo() {
			$.ajax({
				url: "<%=request.getContextPath()%>/MiniControl?action=receiptNo",
				success: function (receiptNo) {
					$("#receipt_list .tr").each(function (i, o) {
						insertRow(receiptNo
							, $(o).children().eq(0).text()
							, $(o).children().eq(1).text()
							, $(o).children().eq(2).text()
							, $(o).children().eq(3).text()
							, $(o).children().eq(4).text()
							, $(o).children().eq(5).text()
							, $(o).children().eq(6).text());
					})
				}
			});
		}

		function insertRow(no, a, b, c, d, e, f, g) {
			$.ajax({
				url: "<%=request.getContextPath()%>/MiniControl",
				data: { "action": "receipt", "receiptNo": no, "itemCode": a, "receiptPrice": b, "receiptQty": c, "salePrice": d, "receiptAmount": e, "receiptSub": f, "receiptVendor": g },
				success: function (result) {
					console.log("ok");
				}
			})
		}

		function removeRow() {
			$(this).parent().parent().remove();
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
			<h1>입고</h1>
			<a href="receiptList.jsp">주문정보</a>
			<table border='1' id="receipt_table">
				<tr>
					<th>상품코드</th>
					<th>주문수량</th>
					<th>구입단가</th>
					<th>판매가</th>
					<th>창고</th>
					<th>구매업체</th>
					<th></th>
				</tr>
				<tr>
					<td><input type="text" name="item_code" value="A00001" /></td>
					<td><input type="text" name="receipt_qty" value=10 /></td>
					<td><input type="text" name="receipt_price" value=1000 /></td>
					<td><input type="text" name="sale_price" value=2000 /></td>
					<td><input type="text" name="receipt_sub" value="AAA" /></td>
					<td><input type="text" name="receipt_vendor" value="VENDOR0001" /></td>
					<td><input type="button" value="품목추가" id="receipt_btn" /></td>
				</tr>
			</table>
			<br><br>
			<div id="receipt_no">주문번호#</div>
			<form id="receipt_frm" action="">
				<table border='1' id="receipt_list">
					<tr>
						<td>품명코드</td>
						<td>입고단가</td>
						<td>입고수량</td>
						<td>판매단가</td>
						<td>입고금액</td>
						<td>입고창고</td>
						<td>구매업체</td>
						<td>구분</td>
					</tr>
				</table>
				<br><br>
				<div class="center">
					<input type="submit" value="주문정보생성" />
				</div>
			</form>
		</article>
	</section>

</body>

</html>