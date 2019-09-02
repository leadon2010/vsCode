package ajax;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * Servlet implementation class AjaxParam
 */
@WebServlet("/AjaxParam")
public class AjaxParam extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AjaxParam() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		Map<String, String[]> map = request.getParameterMap();
		String res = getMap(map, request, response).toString();
		response.getWriter().println(res);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	@SuppressWarnings("unchecked")
	public JSONArray getMap(Map<String, String[]> map, HttpServletRequest req, HttpServletResponse res) {
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();

		map.forEach((k, v) -> {
			String[] args = req.getParameterValues(k);
			JSONArray inner = new JSONArray();
			for (int i = 0; i < args.length; i++) {
				inner.add(args[i]);
			}
			obj.put(k, inner);
		});
		ary.add(obj);
		System.out.println(ary);

		return ary;
	}

}
