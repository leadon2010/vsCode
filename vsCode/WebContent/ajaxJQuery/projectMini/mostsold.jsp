<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>CSS Template</title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>7.1 [Pie Chart] basic</title>
	<link rel="stylesheet" type="text/css" href="dist/tui-chart.css" />
	<link rel='stylesheet' type='text/css'
		href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.css' />
	<link rel='stylesheet' type='text/css'
		href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/addon/lint/lint.css' />
	<link rel='stylesheet' type='text/css'
		href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/theme/neo.css' />
	<link rel='stylesheet' type='text/css' href='./css/example.css' />
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
	</style>
</head>

<body>

	<header>
		<h2>재고 조회 화면</h2>
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
			<h1>판매순위</h1>
			<a href="onhand.jsp">재고순위</a>
			<div class='wrap'>
				<div class='code-html' id='code-html'>
					<div id='chart-area'></div>
				</div>
				<div class='custom-area'>
					<div id='error-dim'>
						<span id='error-text'></span>
						<div id='error-stack'></div>
						<span id='go-to-dev-tool'>For more detail, open browser's developer tool and check it
							out.</span>
					</div>
				</div>
			</div>
			<!--Import chart.js and dependencies-->
			<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js'></script>
			<script type='text/javascript'
				src='https://uicdn.toast.com/tui.code-snippet/v1.5.0/tui-code-snippet.min.js'></script>
			<script type='text/javascript' src='https://uicdn.toast.com/tui.chart/latest/raphael.js'></script>
			<script src='dist/tui-chart.js'></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
			<script class='code-js' id='code-js'>
				var container = document.getElementById('chart-area');
				$.ajax({
					url: "http://localhost:8080/javaScript/OnhandControl?action=mostChart",
					dataType: "json",
					success: function (result) {
						var data = {
							categories: ['품목순위'],
							series: result
						};
						var options = {
							chart: {
								width: 660,
								height: 560,
								title: '판매 순위'
							},
							tooltip: {
								suffix: 'EA'
							}
						};
						var theme = {
							series: {
								colors: [
									'#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
									'#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
								]
							}
						};
						tui.chart.pieChart(container, data, options);
					}
				})
			</script>
		</article>
	</section>

	<footer>
		<p>Footer</p>
	</footer>

</body>

</html>