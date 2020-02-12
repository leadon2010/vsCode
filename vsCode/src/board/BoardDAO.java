package board;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BoardDAO {
	private static BoardDAO dao = new BoardDAO();

	Connection conn = null;
	ResultSet rs = null;
	PreparedStatement pstmt = null;

	private void getConnect() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl", "hr", "hr");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private BoardDAO() {
		getConnect();
	}

	public static BoardDAO getInstance() {
		return dao;
	}

	public List<Board> getBoardList() {
		String sql = "select * from board where parent_no is null order by 1";
		List<Board> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Board board = new Board();
				board.setBoardNo(rs.getInt("board_no"));
				board.setContent(rs.getString("content"));
				board.setCreateDate(rs.getString("create_date"));
				board.setParentNo(rs.getInt("parent_no"));
				board.setTitle(rs.getString("title"));
				board.setWriter(rs.getString("writer"));
				list.add(board);

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public Board getBoard(int boardNo) {
		String sql = "SELECT * FROM board WHERE board_no = ?";
		Board board = new Board();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, boardNo);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				board.setBoardNo(rs.getInt("board_no"));
				board.setContent(rs.getString("content"));
				board.setCreateDate(rs.getString("create_date"));
				board.setParentNo(rs.getInt("parent_no"));
				board.setTitle(rs.getString("title"));
				board.setWriter(rs.getString("writer"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;
	}

	public List<Board> getReplyList(int boardNo) {
		String sql = "select * from board where parent_no = ? order by 1";
		List<Board> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, boardNo);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Board board = new Board();
				board.setBoardNo(rs.getInt("board_no"));
				board.setContent(rs.getString("content"));
				board.setCreateDate(rs.getString("create_date"));
				board.setParentNo(rs.getInt("parent_no"));
				board.setTitle(rs.getString("title"));
				board.setWriter(rs.getString("writer"));
				list.add(board);

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

}
