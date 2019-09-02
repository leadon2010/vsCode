package ajax.projectMini;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DbCon;

public class OnhandDAO {
	Connection conn = DbCon.connect();
	PreparedStatement pstmt;

	public List<Map<String, Object>> getMostSoldChart() {
		List<Map<String, Object>> list = new ArrayList<>();
		String sql = "SELECT item_code ,(qty*-1) qty FROM  "
				+ " (SELECT item_code,SUM(txn_quantity) qty FROM receipt_issue_txn WHERE txn_quantity < 0 GROUP  BY item_code ORDER  BY 2 DESC)"
				+ " WHERE  ROWNUM <= 5 ";
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, Object> map = new HashMap<>();
				map.put("item", rs.getString("item_code"));
				map.put("qty", rs.getString("qty"));
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

	public List<Map<String, Object>> getOnhandChart() {
		List<Map<String, Object>> list = new ArrayList<>();
		String sql = "SELECT item_code ,qty FROM  "
				+ " (SELECT item_code,SUM(txn_quantity) qty FROM receipt_issue_txn GROUP  BY item_code ORDER  BY 2 DESC)"
				+ " WHERE  ROWNUM <= 5 ";
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, Object> map = new HashMap<>();
				map.put("item", rs.getString("item_code"));
				map.put("qty", rs.getString("qty"));
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
