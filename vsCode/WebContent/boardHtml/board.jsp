<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String bNo = request.getParameter("boardNo");
	%>
	<script>
		var brdNo = <%=bNo%>;
		showBoard();
        function showBoard() {
            var xhtp = new XMLHttpRequest();
            xhtp.onreadystatechange = function () {
                if (xhtp.readyState == 4 && xhtp.status == 200) {
                    getBoard(this);
                }
            }
            xhtp.open('get', '../BoardServlet?boardNo='+brdNo);
            xhtp.send();
        }
        function getBoard(obj) {
            var result = JSON.parse(obj.responseText);
            console.log(result);
        }
    </script>
</body>
</html>