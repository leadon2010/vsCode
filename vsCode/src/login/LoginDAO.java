package login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import common.DbCon;

public class LoginDAO {
	private static LoginDAO dao = new LoginDAO();

	private LoginDAO() {
	}

	public static LoginDAO getInstance() {
		return dao;
	}

	public boolean memberCheck(String id, String pass) {
		Connection conn = DbCon.connect();
		String sql = "select id, passwd from login_test where id=? and passwd=?";
		boolean idExist = false;
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, id);
			pstmt.setString(2, pass);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				idExist = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DbCon.disconnect();
		}
		return idExist;
	}
}
