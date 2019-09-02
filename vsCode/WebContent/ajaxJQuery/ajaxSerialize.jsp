<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script src="jquery/jquery-3.3.1.min.js"></script>
	<script>
		$(function () {
			$("#frm1").on("submit", function (e) {
				//e.preventDefault();
				console.log($("#frm1").serializeArray());
				$.ajax({
					url: $("#frm1").attr("action"),
					type:"post",
					data: $("#frm1").serializeArray(),
					success: function () {
						console.log("good");
					}
				})
			})
		})
	</script>
</head>

<body>
	<form id="frm1" action="<%=request.getContextPath()%>/AjaxParam">
		<input type="text" name="firstName" value="myfirst"/><br>
		<input type="text" name="salary" value=300 /><br>
		<select name="hobby">
			<option value="book1" selected>Book1</option>
			<option value="book2">Book2</option>
			<option value="book3">Book3</option>
			<option value="book4">Book4</option>
		</select><br>Favorite:<br>
		<input type="checkbox" name="favorite" value="apple" checked="checked"/>apple<br>
		<input type="checkbox" name="favorite" value="banana" checked="checked" />banana<br>
		<input type="checkbox" name="favorite" value="melon" checked="checked" />melon<br>
		<input type="submit" value="Submit" />
	</form>
</body>

</html>