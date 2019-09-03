package employee;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DAO;;

public class BoardDAO {
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	public int getNewBoard() {
		System.out.println("getNewBoard call.");
		conn = DAO.getConnection();
		String sql = "select board_seq.nextval board_no from board";
		int newBoardNo = 0;
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				newBoardNo = rs.getInt("board_no");
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
		return newBoardNo;
	}

	public int insertBoard(BoardDTO board) {
		conn = DAO.getConnection();
		int r = 0;
		String sql = "insert into board (board_no, title, content, writer, create_date)"
				+ " values(?, ?, ?, 'test', sysdate)";
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, board.getBoardNo());
			pstmt.setString(2, board.getTitle());
			pstmt.setString(3, board.getContent());
			r = pstmt.executeUpdate();
			System.out.println(r + " row inserted.");

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

	public void deleteBoard(int boardNo) {
		conn = DAO.getConnection();
		String sql = "delete board where board_no = ?";
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, boardNo);
			int r = pstmt.executeUpdate();
			System.out.println(r + " deleted. ");

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

	public void updateBoard(BoardDTO board) {
		conn = DAO.getConnection();
		String sql = "update board set title=?, content=? where board_no = ?";
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, board.getTitle());
			pstmt.setString(2, board.getContent());
			pstmt.setInt(3, board.getBoardNo());
			int r = pstmt.executeUpdate();
			System.out.println(r + " updated. ");

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

	public List<BoardDTO> getBoardList() {
		conn = DAO.getConnection();
		String sql = "select * from board where parent_no is null order by 1";
		List<BoardDTO> list = new ArrayList<>();
		BoardDTO board = null;
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				board = new BoardDTO();
				board.setBoardNo(rs.getInt("board_no"));
				board.setTitle(rs.getString("title"));
				board.setContent(rs.getString("content"));
				board.setWriter(rs.getString("writer"));
				board.setCreationDate(rs.getString("create_date"));
				board.setParentNo(rs.getInt("parent_no"));
				list.add(board);
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

	public BoardDTO getBoard(int boardNo) {
		conn = DAO.getConnection();
		String sql = "select * from board where board_no = ?";
		BoardDTO board = null;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, boardNo);
			rs = pstmt.executeQuery();

			if (rs.next()) {
				board = new BoardDTO();
				board.setBoardNo(rs.getInt("board_no"));
				board.setTitle(rs.getString("title"));
				board.setContent(rs.getString("content"));
				board.setWriter(rs.getString("writer"));
				board.setCreationDate(rs.getString("create_date"));
				board.setParentNo(rs.getInt("parent_no"));
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
		return board;
	}
}
