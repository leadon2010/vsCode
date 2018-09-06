package control;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import employee.EmpDAO;
import employee.Employee;

/**
 * Servlet implementation class ControlTest
 */
@WebServlet("/ControlTest")
public class ControlTest extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ControlTest() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		request.setCharacterEncoding("UTF-8");
		String action = request.getParameter("action");
		if (action == null || action.isEmpty()) {
			System.out.println("no action");

		} else if (action.equals("insertEmp")) {
			EmpDAO dao = new EmpDAO();
			Employee emp = new Employee();
			emp.setLastName(request.getParameter("lastName"));
			emp.setEmail(request.getParameter("email"));
			emp.setHireDate(request.getParameter("hireDate"));
			emp.setJobId(request.getParameter("jobId"));

			dao.insertEmp(emp);

			response.sendRedirect("ajax/empList.jsp");
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
