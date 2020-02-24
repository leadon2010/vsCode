package post;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@WebServlet("/GetPopularPostServ")
public class GetPopularPostServ extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetPopularPostServ() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		service(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		service(request, response);
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PostDAO dao = PostDAO.getInstance();
		List<PopularPost> list = dao.getPostTop3();
		JSONArray ary = new JSONArray();
		for (PopularPost p : list) {
			JSONObject obj = new JSONObject();
			obj.put("postId", p.getPostId());
			obj.put("postTitle", p.getPostTitle());
			obj.put("postContent", p.getPostContent());
			obj.put("postImage", p.getPostImage());
			obj.put("creationDate", p.getCreationDate());
			obj.put("lastUpdateDate", p.getLastUpdateDate());
			obj.put("postCnt", p.getPostCnt());
			ary.add(obj);
		}
		PrintWriter out = response.getWriter();
		out.print(ary);
	}
}
