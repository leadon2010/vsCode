package post;

public class PostDAO {
	private static PostDAO dao = new PostDAO();

	private PostDAO() {
	}

	public static PostDAO getInstance() {
		return dao;
	}
	
}
