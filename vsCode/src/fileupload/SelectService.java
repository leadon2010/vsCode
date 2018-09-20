package fileupload;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SelectService
 */
@WebServlet("/SelectService")
public class SelectService extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SelectService() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		service(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// DB에 저장된 file정보를 모두 검색해서 jsp로 전송
		FileDAO dao = new FileDAO();

		try {
			ArrayList<FileVO> list = dao.selectAll();

			if (list != null) {
				request.setAttribute("list", list);

			} else {
				System.out.println("비었습니다");
			}

			RequestDispatcher dis = request.getRequestDispatcher("./fileupload/board.jsp");
			dis.forward(request, response);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
