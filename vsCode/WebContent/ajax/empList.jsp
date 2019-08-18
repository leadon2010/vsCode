<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.*"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="employee.Employee" %>

<%
	String jdbc_driver = "oracle.jdbc.driver.OracleDriver";
	String jdbc_url = "jdbc:oracle:thin:@localhost:1521:orcl";

	Connection conn = null;

	// DB연결 메서드
	try {
		Class.forName(jdbc_driver);
		conn = DriverManager.getConnection(jdbc_url, "hr", "hr");
	} catch (Exception e) {
		e.printStackTrace();
	}

	String sql = "select * from employees";
	List<Employee> list = new ArrayList<>();

	try {
		PreparedStatement pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();
		Employee emp = null;
		while (rs.next()) {
			emp = new Employee();
			emp.setEmployeeId(rs.getInt("employee_id"));
			emp.setFirstName(rs.getString("first_name"));
			emp.setLastName(rs.getString("last_name"));
			emp.setEmail(rs.getString("email"));
			emp.setSalary(rs.getInt("salary"));
			emp.setHireDate(rs.getString("hire_date"));
			emp.setJobId(rs.getString("job_id"));
			list.add(emp);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	out.print(JSONArray.fromObject(list).toString());
%>
