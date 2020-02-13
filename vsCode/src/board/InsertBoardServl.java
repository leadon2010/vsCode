package board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class InsertBoardServl
 */
@WebServlet("/InsertBoardServl")
public class InsertBoardServl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public InsertBoardServl() {
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
		String writer = request.getParameter("writer");
		String title = request.getParameter("title");
		String content = request.getParameter("content");

		BoardDAO dao = BoardDAO.getInstance();
		Board brd = new Board();
		brd.setTitle(title);
		brd.setContent(content);
		brd.setWriter(writer);

		dao.insertBoard(brd);
	}
}
