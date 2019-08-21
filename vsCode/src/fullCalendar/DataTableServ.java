package fullCalendar;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
			System.out.println("insert call.");
			int groupId = 0;
			if (request.getParameter("groupId") != null)
				groupId = Integer.parseInt(request.getParameter("groupId"));
			String title = request.getParameter("title");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			DataTable dat = new DataTable();
			dat.setGroupId(groupId);
			dat.setTitle(title);
			dat.setStartDate(startDate);
			dat.setEndDate(endDate);
			System.out.println(dat);

			dao.insertEvent(dat);

		} else if (action.equals("list")) {
			List<DataTable> list = dao.getEventList();
//			out.print(JSONArray.fromObject(list).toString());
			JSONArray ary = new JSONArray();
			JSONObject obj = null;

			for (DataTable data : list) {
				obj = new JSONObject();
				obj.put("groupId", data.getGroupId());
				obj.put("title", data.getTitle());
				obj.put("start", data.getStartDate());
				obj.put("end", data.getEndDate());
				ary.add(obj);
			}
			out.print(ary.toString());

		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
