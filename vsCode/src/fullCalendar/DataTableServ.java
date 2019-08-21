package fullCalendar;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

@WebServlet("/DataTableServ")
public class DataTableServ extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DataTableServ() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());

		String action = request.getParameter("action");
		PrintWriter out = response.getWriter();
		CalendarDAO dao = new CalendarDAO();

		if (action == null || action.equals("")) {
			out.print("no action");

		} else if (action.equals("insert")) {
			int groupId = Integer.parseInt(request.getParameter("groupId"));
			String title = request.getParameter("title");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			DataTable dat = new DataTable();
			dat.setGroupId(groupId);
			dat.setTitle(title);
			dat.setStartDate(startDate);
			dat.setEndDate(endDate);

			dao.insertEvent(dat);

		} else if (action.equals("list")) {
			List<DataTable> list = dao.getEventList();
			out.print(JSONArray.fromObject(list).toString());

		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
