<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>insertMember</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.js"></script>
	<script>
		$(function () {
			getData();
			$("#btn").on("click", function () {
				var sendData = $("#frm").serialize();
				console.log(sendData);
				$.ajax({
					url: "<%=request.getContextPath()%>/MiniControl",
					type: "post",
					data: sendData,
					success: function () {
						console.log("sc");
						callbackInsert();
					}
				})
			})
		});
		function callbackInsert() {
			var ids = $("#id").val();
			$("#memberlist").append($("<tr>").append($("<td>").text($("#id").val()),
				$("<td>").text($("#uname").val()),
				$("<td>").text($("#phone").val()),
				$("<td>").text($("#address").val()),
				$("<td>").html($("<button>").attr("id", "del" + ids).text("Del").click(deleteRow))));
		}

		function getData() {
			$.ajax({
				url: "<%=request.getContextPath()%>/MiniControl",
				type: "get",
				data: { "action": "select" },
				success: function (result) {
					var datas = JSON.parse(result);
					var $table = $("<table>").attr({ "border": "1", "id": "memberlist" });
					$table.append($("<th>").text("ID"), $("<th>").text("Name"), $("<th>").text("Phone"),
						$("<th>").text("Address"), $("<th>").text("Opt."));
					for (x in datas) {
						var $tr = $("<tr>").append($("<td>").text(datas[x].id),
							$("<td>").text(datas[x].name),
							$("<td>").text(datas[x].phone),
							$("<td>").text(datas[x].address),
							$("<td>").html($("<button>").attr({ "type": "button", "id": "del" + datas[x].id }).text("Del").click(deleteRow)));
						$table.append($tr);
					}
					$("#result").append($table);
				}
			})
		}

		function deleteRow(e) {
			var id = $(this).parent().parent().children().eq(0).text();
			$.ajax({
				url: "<%=request.getContextPath()%>/MiniControl",
				type: "post",
				data: { "action": "delete", "id": id },
				success: function (result) {
					clearRow(e);
				}
			});
		}

		function clearRow(e) {
			console.log(e.target.id);
			var id = e.target.id;
			$("#" + id).parent().parent().remove();

		}
	</script>
</head>

<body>
	<form id="frm">
		<input type="hidden" name="action" value="insert">
		<h1>멤버 등록</h1>
		<table id="list" border = 1>
			<tr>
				<th>ID</th>
				<th>Passwd</th>
				<th>Name</th>
				<th>Phone</th>
				<th>Address</th>
				<th>Opt.</th>
			</tr>
			<tr>
				<td><input type="text" name="id" id="id" value="1234"></td>
				<td><input type="password" name="pw" id="pw" value="1234"></td>
				<td><input type="text" name="uname" id="uname" value="good"></td>
				<td><input type="text" name="phone" id="phone" value="1111-1111"></td>
				<td><input type="text" name="address" id="address" value="Daejeon, Korea"></td>
				<td><button type="button" id="btn">Send</button></td>
			</tr>
		</table>
	</form>

	<div id="result">
		<h1>Member List</h1>
	</div>
</body>

</html>