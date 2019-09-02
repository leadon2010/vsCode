<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.*"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="employee.Employee"%>

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

	String action = request.getParameter("action");

	if (action.equals("list")) {

		String sql = "select * from employees where rownum<=10";
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

	} else if (action.equals("insert")) {
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String email = request.getParameter("email");
		String salary = request.getParameter("salary");
		String hireDate = request.getParameter("hireDate");
		String jobId = request.getParameter("jobId");

		String sql = "insert into employees(employee_id, first_name, last_name, email, salary, hire_date, job_id) "
		+ " values((select max(employee_id)+1 from employees), ?, ?, ?, ?, to_date(?,'yyyy-mm-dd'), ?) ";

		try {
	PreparedStatement pstmt = conn.prepareStatement(sql);
	pstmt.setString(1, firstName);
	pstmt.setString(2, lastName);
	pstmt.setString(3, email);
	pstmt.setString(4, salary);
	pstmt.setString(5, hireDate);
	pstmt.setString(6, jobId);
	int r = pstmt.executeUpdate();
	System.out.println(r + " 건 입력됨.");
	if (r > 0) {
		out.print("ok");
	} else {
		out.print("fail");
	}

		} catch (Exception e) {
	out.print("exception");
	e.printStackTrace();
		}
	}
%>
