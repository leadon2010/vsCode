package dataTable;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import employee.EmpDAO;
import employee.Employee;

/**
 * Servlet implementation class EmpServlet
 */
@WebServlet("/EmpServlet")
public class EmpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public EmpServlet() {
		super();
	}

	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
//		response.getWriter().append("Served at: ").append(request.getContextPath());

		EmpDAO dao = new EmpDAO();
		List<Employee> list = dao.getEmplsList();
		JSONArray ary = null;
		JSONArray orig = new JSONArray();
		JSONObject obj = new JSONObject();
		for (Employee emp : list) {
			System.out.println(emp.getFirstName());
			ary = new JSONArray();
			ary.add(emp.getFirstName());
			ary.add(emp.getLastName());
			ary.add(emp.getJobId());
			ary.add(emp.getEmail());
			ary.add(emp.getHireDate());
			ary.add(emp.getSalary());
			orig.add(ary);
		}
		obj.put("data", orig);
		response.getWriter().print(obj.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
