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

import net.sf.json.JSONArray;

@WebServlet("/IssueControl")
public class IssueControl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public IssueControl() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		String action = request.getParameter("action");
		PrintWriter out = response.getWriter();

		IssueDAO dao = new IssueDAO();

		if (action == null || action.equals("")) {
			out.println("no action.");

		} else if (action.equals("issueList")) {
			System.out.println();

		} else if (action.equals("issueTxn")) {
			String issueNo = request.getParameter("issueNo");
			dao.issueTxn(issueNo);
			response.sendRedirect("http://localhost:8080/javaScript/ajax/projectMini/issueList.jsp");

			System.out.println();
		} else if (action.equals("insertRow")) {
			String issueNo = request.getParameter("issueNo");
			String issueVendor = request.getParameter("issueVendor");
			String issueItem = request.getParameter("itemCode");
			int issueQty = Integer.parseInt(request.getParameter("issueQty"));
			int issuePrice = Integer.parseInt(request.getParameter("issuePrice"));
			int issueAmount = Integer.parseInt(request.getParameter("issueAmount"));
			String issueSub = request.getParameter("issueSub");
			Issue isu = new Issue(issueNo, issueVendor, issueItem, issueQty, issuePrice, issueAmount, issueSub);
			dao.insertRow(isu);

		} else if (action.equals("getIssueNo")) {
			out.print(dao.getIssueNo());

		} else if (action.equals("issueForm")) {
			List<Map<String, Object>> list = dao.getOnhandList();
			out.println(JSONArray.fromObject(list).toString());

		} else {
			out.println("invalid action.");

		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
