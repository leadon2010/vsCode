package board;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class BoardServlet
 */
@WebServlet("/BoardServlet")
public class BoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BoardServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		List<Board> list = new ArrayList<>();
		BoardDAO dao = BoardDAO.getInstance();
		String bNo = request.getParameter("boardNo");
		int iNo = Integer.parseInt(bNo);
		Board board = dao.getBoard(iNo);
		list = dao.getReplyList(iNo);

		PrintWriter out = response.getWriter();
//		out.print(JSONArray.fromObject(list).toString());
		JSONArray objAry = new JSONArray();
		JSONObject inObj = new JSONObject();
		for (Board b : list) {
			inObj.put("bNo", b.getBoardNo());
			inObj.put("bcontent", b.getContent());
			inObj.put("bwriter", b.getWriter());
			inObj.put("bcreateDate", b.getCreateDate());
			objAry.add(inObj);
		}

		JSONObject obj = new JSONObject();
		obj.put("boardNo", board.getBoardNo());
		obj.put("title", board.getTitle());
		obj.put("content", board.getContent());
		obj.put("writer", board.getWriter());
		obj.put("createDate", board.getCreateDate());
		obj.put("replyList", objAry);

		out.print(obj);
	}
}
