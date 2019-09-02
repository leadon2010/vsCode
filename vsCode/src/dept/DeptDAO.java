package dept;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DbCon;

public class DeptDAO {
	public List<Departments> getDeptList() {
		DbCon con = new DbCon();
		PreparedStatement pstmt = null;
		Connection conn = con.connect();
		Departments dept = null;
		List<Departments> list = new ArrayList<>();
		String sql = "select department_id, department_name, manager_id, location_id from departments order by 1";
		try {
			pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				dept = new Departments();
				dept.setDepartmentId(rs.getInt("department_id"));
				dept.setDepartmentName(rs.getString("department_name"));
				dept.setManagerId(rs.getInt("manager_id"));
				dept.setLocationId(rs.getInt("location_id"));
				list.add(dept);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
