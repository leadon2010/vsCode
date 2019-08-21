package fullCalendar;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DbCon;

public class CalendarDAO {
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	public void insertEvent(DataTable dat) {
		conn = DbCon.connect();
		String sql = "insert into data_table values(?,?,?,?,sysdate)";
		int r = 1;

		try {
			String groupId = dat.getGroupId() == 0 ? null : "\"" + dat.getGroupId() + "\"";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(r++, groupId);
			pstmt.setString(r++, dat.getTitle());
			pstmt.setString(r++, dat.getStartDate());
			pstmt.setString(r++, dat.getEndDate());
			int cnt = pstmt.executeUpdate();
			System.out.println(cnt + " inserted.");

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

	public List<DataTable> getEventList() {
		conn = DbCon.connect();
		String sql = "select * from data_table";
		List<DataTable> list = new ArrayList<>();
		DataTable dat = null;

		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				dat = new DataTable();
				dat.setGroupId(rs.getInt("group_id"));
				dat.setTitle(rs.getString("title"));
				dat.setStartDate(rs.getString("start_date"));
				dat.setEndDate(rs.getString("end_date"));
				list.add(dat);

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
