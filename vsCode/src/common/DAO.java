package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DAO {
	static Connection conn = null;

	public static Connection getConnection() {
		String jdbc_driver = "oracle.jdbc.driver.OracleDriver";
		String jdbc_url = "jdbc:oracle:thin:@localhost:1521:orcl";
		// String jdbc_url = "jdbc:oracle:thin:@localhost:1521:xe";
		String user = "hr";
		String passwd = "hr";

		try {
			Class.forName(jdbc_driver);
			conn = DriverManager.getConnection(jdbc_url, user, passwd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}

	public static void disconnect() {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
