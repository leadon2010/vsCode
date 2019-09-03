package employee;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;

@WebServlet("/BoardServ")
public class BoardServ extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BoardServ() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");

		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		BoardDAO dao = new BoardDAO();

		if (action == null || action.equals("")) {
			System.out.println("invalid action");

		} else if (action.equals("list")) {
			List<BoardDTO> list = dao.getBoardList();
			out.print(JSONArray.fromObject(list).toString());

		} else if (action.equals("get")) {
			int boardNo = Integer.parseInt(request.getParameter("boardNo"));

			BoardDTO board = dao.getBoard(boardNo);
			out.print(JSONArray.fromObject(board).toString());

		} else if (action.equals("register")) {
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			int newBno = dao.getNewBoard();
			BoardDTO board = new BoardDTO();
			board.setBoardNo(newBno);
			board.setTitle(title);
			board.setContent(content);

			if (dao.insertBoard(board) > 0) {
				out.print(newBno);
			}

		} else if (action.equals("update")) {
			int boardNo = Integer.parseInt(request.getParameter("boardNo"));
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			BoardDTO board = new BoardDTO();
			board.setBoardNo(boardNo);
			board.setTitle(title);
			board.setContent(content);
			dao.updateBoard(board);

		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
