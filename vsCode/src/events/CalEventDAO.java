package events;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DbCon;

public class CalEventDAO {
	public List<CalEvents> getEvents() {
		PreparedStatement pstmt = null;
		Connection conn = DbCon.connect();
		CalEvents evnt = null;
		List<CalEvents> list = new ArrayList<>();
		String sql = "select title, start_date, end_date from calevents";
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				evnt = new CalEvents();
				evnt.setTitle(rs.getString("title"));
				evnt.setStartDate(rs.getString("start_date"));
				evnt.setEndDate(rs.getString("end_date"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;

	}
}
