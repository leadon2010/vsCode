<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.util.*"%>
<%@page import="employee.Employee"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	String jdbc_driver = "oracle.jdbc.driver.OracleDriver";
	String jdbc_url = "jdbc:oracle:thin:@localhost:1521:orcl";
	String user = "hr";
	String passwd = "hr";
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	try {
		Class.forName(jdbc_driver);
		conn = DriverManager.getConnection(jdbc_url, user, passwd);
	} catch (Exception e) {
		e.printStackTrace();
	}

	String action = request.getParameter("action");

	String empId = "";

	if (action.equals("insert")) {
		String sql = "select employees_seq.nextval emp_id from employees";
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				empId = rs.getString("emp_id");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String salary = request.getParameter("salary");
		String hireDate = request.getParameter("hireDate");
		String jobId = request.getParameter("jobId");
		String email = request.getParameter("email");

		sql = "insert into employees(employee_id, first_name, last_name, email, salary, hire_date, job_id) "
				+ " values(?, ?, ?, ?, ?, to_date(?,'yyyy-mm-dd'), ?)";
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, empId);
			pstmt.setString(2, firstName);
			pstmt.setString(3, lastName);
			pstmt.setString(4, email);
			pstmt.setString(5, salary);
			pstmt.setString(6, hireDate);
			pstmt.setString(7, jobId);
			int r = pstmt.executeUpdate();
			if (r > 0) {
				out.print(empId);
			} else {
				out.print("no insert");
			}

		} catch (Exception e) {
			out.print("exception");
			e.printStackTrace();

		} finally {
			conn.close();
		}

	} else if (action.equals("select")) {
		String sql = "select * from (select * from employees order by 1 desc) a where rownum < 10 order by 1";
		List<Employee> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
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

		} finally {
			conn.close();
		}
		out.print(JSONArray.fromObject(list).toString());
		/* out.print("[");
		int a = list.size();
		int b = 1;
		for(Employee emp: list) {
			out.print("{\"firstName\":\""+ emp.getFirstName() 
			+ "\",\"lastName\":\"" + emp.getLastName() 
			+ "\",\"emploeeId\":\"" + emp.getEmploeeId() 
			+ "\",\"salary\":\"" + emp.getSalary() 
			+ "\",\"hireDate\":\"" + emp.getHireDate()
			+ "\",\"jobId\":\"" + emp.getJobId()
			+ "\"}");
			
			if(a!=b){
				out.print(",");
			}
			b++;
		}
		out.print("]"); */

	} else if (action.equals("delete")) {
		String sql = "delete from employees where employee_id = ?";
		empId = request.getParameter("empid");
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, empId);
			int r = pstmt.executeUpdate();
			out.print(r);

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			conn.close();
		}
	}
%>