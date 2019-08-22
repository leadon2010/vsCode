package control;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import employee.SEmpDAO;
import employee.SEmployee;

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
		
		//String uri = req.getRequestURI();
		//String conPath = req.getContextPath();
		//String com = uri.substring(conPath.length());

		if (action == null || action.isEmpty()) {
			System.out.println("no action");

		} else if (action.equals("insertEmp")) {
			SEmpDAO dao = new SEmpDAO();
			SEmployee emp = new SEmployee();
			emp.setLastName(request.getParameter("lastName"));
			emp.setEmail(request.getParameter("email"));
			emp.setHireDate(request.getParameter("hireDate"));
			emp.setJobId(request.getParameter("jobId"));

			dao.insertEmp(emp);

			//response.sendRedirect("ajax/empList.jsp");
			request.getRequestDispatcher("ajax/empList.jsp").forward(request, response);
			
			/*
			 if(com.equals("/searchResultView.sv")) {
				svc = new SearchViewMainCommand();
				System.out.println("searchResultView 호출");
				svc.execute(req, res);
				viewPage = "searchResultView/searchView.jsp";
			}
			RequestDispatcher dispatcher = req.getRequestDispatcher(viewPage);		
			dispatcher.forward(req, res);
			*/
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
