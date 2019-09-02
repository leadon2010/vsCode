package ajax.projectMini;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DbCon;

public class MemberDAO {
	Connection conn = DbCon.connect();
	PreparedStatement pstmt;

	public String receiptTxn(String receiptNo) {
		String retVal = "";
		try {
			CallableStatement cstmt = conn.prepareCall("{call receipt_txn(?,?)}");
			cstmt.setString(1, receiptNo);
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

	public List<Receipt> getReceiptInfoList() {
		String sql = "select * from receipt_info where receipt_flag = 'N' order by 1";
		List<Receipt> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Receipt rct = new Receipt();
				rct.setReceiptNo(rs.getString("receipt_no"));
				rct.setReceiptVendor(rs.getString("receipt_vendor"));
				rct.setReceiptItem(rs.getString("receipt_item"));
				rct.setReceiptQty(rs.getInt("receipt_qty"));
				rct.setReceiptPrice(rs.getInt("receipt_price"));
				rct.setReceiptAmount(rs.getInt("receipt_amount"));
				rct.setReceiptSub(rs.getString("receipt_sub"));
				rct.setReceiptDate(rs.getString("receipt_date"));
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

	public String getNewReceiptNo() {
		String retVal = "";
		try {
			CallableStatement cstmt = conn.prepareCall("{? = call create_receipt_no()}");
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

	public void createReceiptInfo(String receiptNo, String itemCode, String receiptPrice, String receiptQty,
			String salePrice, String receiptAmount, String receiptSub, String receiptVendor) {

		String sql = "insert into receipt_info values(?,?,?,?,?,?,?,Sysdate,'N')";
		try {
			pstmt = conn.prepareStatement(sql);
			int r = 0;
			pstmt.setString(++r, receiptNo);
			pstmt.setString(++r, receiptVendor);
			pstmt.setString(++r, itemCode);
			pstmt.setString(++r, receiptQty);
			pstmt.setString(++r, receiptPrice);
			// pstmt.setString(++r, salePrice);
			pstmt.setString(++r, receiptAmount);
			pstmt.setString(++r, receiptSub);
			pstmt.executeUpdate();

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

	public String deleteRow(String id) {
		String sql = "delete from mini_member where id = ?";
		int r = 0;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, id);
			r = pstmt.executeUpdate();
			System.out.println(r + " 건이 삭제되었습니다.");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (r > 0)
			return "OK";
		else
			return "NG";
	}

	public List<Member> getMemberList() {
		String sql = "select * from mini_member order by 1";
		List<Member> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				Member mem = new Member();
				mem.setId(rs.getString("id"));
				mem.setPw(rs.getString("pw"));
				mem.setName(rs.getString("name"));
				mem.setPhone(rs.getString("phone"));
				mem.setAddress(rs.getString("address"));
				list.add(mem);

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

	public void insertMember(Member memb) {
		String sql = "insert into mini_member(id, pw, name, phone, address) values(?,?,?,?,?)";
		int r = 0;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(++r, memb.getId());
			pstmt.setString(++r, memb.getPw());
			pstmt.setString(++r, memb.getName());
			pstmt.setString(++r, memb.getPhone());
			pstmt.setString(++r, memb.getAddress());

			int row = pstmt.executeUpdate();
			System.out.println(row + " 건 입력되었습니다.");

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
}
