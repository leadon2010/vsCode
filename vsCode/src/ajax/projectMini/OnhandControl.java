package ajax.projectMini;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@WebServlet("/OnhandControl")
public class OnhandControl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public OnhandControl() {
		super();
	}

	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		OnhandDAO dao = new OnhandDAO();

		if (action == null || action.equals("")) {
			out.println("no action.");

		} else if (action.equals("onhandChart")) {
			List<Map<String, Object>> list = dao.getOnhandChart();
			JSONArray ary = new JSONArray();
			for (Map<String, Object> map : list) {
				JSONObject obj = new JSONObject();
				obj.put("name", map.get("item"));
				obj.put("data", map.get("qty"));
				ary.add(obj);
			}
			out.println(ary.toString());

		} else if (action.equals("mostChart")) {
			List<Map<String, Object>> list = dao.getMostSoldChart();
			JSONArray ary = new JSONArray();
			for (Map<String, Object> map : list) {
				JSONObject obj = new JSONObject();
				obj.put("name", map.get("item"));
				obj.put("data", map.get("qty"));
				ary.add(obj);
			}
			out.println(ary.toString());

		} else {
			out.println("invalid action.");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
