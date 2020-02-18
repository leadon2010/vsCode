<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html> 
<head>
<title> JSP 웹 프로그램 서비스  </title></head> 
<body>
<H2> JSP 웹 프로그램 서비스 </H2>
<% 
   String myname="홍민성";
   String today = (new java.util.Date( )).toLocaleString( ); 
%>

<strong><%= myname %></strong> 홈페이지에 오신 것을 환영합니다. <br>
오늘은 : <%= today %> 입니다.
</p>
</body> 
</html> 
