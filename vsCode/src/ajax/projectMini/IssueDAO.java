package ajax.projectMini;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DbCon;

public class IssueDAO {
	Connection conn = DbCon.connect();
	PreparedStatement pstmt;

	public String issueTxn(String issueNo) {
		String retVal = "";
		try {
			CallableStatement cstmt = conn.prepareCall("{call issue_txn(?,?)}");
			cstmt.setString(1, issueNo);
			cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
			cstmt.execute();
			retVal = cstmt.getString(2);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return retVal;
	}

	public List<Issue> getIssueInfoList() {
		String sql = "select * from issue_info where issue_flag = 'N' order by 1";
		List<Issue> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Issue rct = new Issue();
				rct.setIssueNo(rs.getString("issue_no"));
				rct.setIssueVendor(rs.getString("issue_vendor"));
				rct.setIssueItem(rs.getString("issue_item"));
				rct.setIssueQty(rs.getInt("issue_qty"));
				rct.setIssuePrice(rs.getInt("issue_price"));
				rct.setIssueAmount(rs.getInt("issue_amount"));
				rct.setIssueSub(rs.getString("issue_sub"));
				rct.setIssueDate(rs.getString("issue_date"));
				list.add(rct);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;

	}

	public void insertRow(Issue isu) {
		String sql = "insert into issue_info values(?,?,?,?,?,?,?,Sysdate,'N')";
		try {
			pstmt = conn.prepareStatement(sql);
			int r = 0;
			pstmt.setString(++r, isu.getIssueNo());
			pstmt.setString(++r, isu.getIssueVendor());
			pstmt.setString(++r, isu.getIssueItem());
			pstmt.setInt(++r, isu.getIssueQty());
			pstmt.setInt(++r, isu.getIssuePrice());
			// pstmt.setString(++r, salePrice);
			pstmt.setInt(++r, isu.getIssueAmount());
			pstmt.setString(++r, isu.getIssueSub());
			int cnt = pstmt.executeUpdate();
			System.out.println(cnt + " row inserted.");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

	public String getIssueNo() {
		String retVal = "";
		try {
			CallableStatement cstmt = conn.prepareCall("{? = call create_issue_no()}");
			cstmt.registerOutParameter(1, java.sql.Types.VARCHAR);
			cstmt.execute();
			retVal = cstmt.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		System.out.println(retVal);
		return retVal;
	}

	public List<Map<String, Object>> getOnhandList() {
		List<Map<String, Object>> list = new ArrayList<>();
		String sql = "select item_code, sum(txn_quantity) as onhand_qty from receipt_issue_txn group by item_code order by 1";
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, Object> map = new HashMap<>();
				map.put("item_code", rs.getString("item_code"));
				map.put("onhand_qty", rs.getString("onhand_qty"));
				list.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}

}
