package fileupload;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.DbCon;

public class FileDAO {
	// DB연결
	public void getConnection() {
	}

	// DB연결 종료
	public void close() {
	}

	// 파일업로드
	public int uploadFile(String author, String title, String file) {
		Connection conn = DbCon.connect();
		int r = 0;
		String sql = "insert into fileboard values((select nvl(max(num)+1,1) from fileboard), ?, ?, ?, to_char(sysdate,'YYYY-MM-DD'))";
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, author);
			pstmt.setString(2, title);
			pstmt.setString(3, file);
			r = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return r;
	}

	public ArrayList<FileVO> selectAll() {
		Connection conn = DbCon.connect();
		ArrayList<FileVO> list = new ArrayList<>();
		FileVO vo;
		String sql = "select num, author, title, filename, day from fileboard order by num";
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				vo = new FileVO(rs.getInt("num"), rs.getString("author"), rs.getString("title"),
						rs.getString("filename"), rs.getString("day"));
				list.add(vo);
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
