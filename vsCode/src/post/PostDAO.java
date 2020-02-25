package post;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import common.DbCon;

public class PostDAO {
	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;

	private static PostDAO dao = new PostDAO();

	private PostDAO() {
	}

	public static PostDAO getInstance() {
		return dao;
	}

	public List<PopularPost> getPostTop3() {
		conn = DbCon.connect();
		String sql = "select * from (select * from popular_post order by post_cnt desc) where rownum <= 3";
		List<PopularPost> list = new ArrayList<>();
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				PopularPost p = new PopularPost();
				p.setPostId(rs.getInt("post_id"));
				p.setPostTitle(rs.getString("post_title"));
				p.setPostContent(rs.getString("post_content"));
				p.setPostImage(rs.getString("post_image"));
				p.setCreationDate(rs.getString("creation_date"));
				p.setLastUpdateDate(rs.getString("last_update_date"));
				p.setPostCnt(rs.getInt("post_cnt"));
				list.add(p);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DbCon.disconnect();
		}
		return list;

	}
}
