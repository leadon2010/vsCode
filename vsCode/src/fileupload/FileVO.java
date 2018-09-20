package fileupload;

public class FileVO {
	private int num;
	private String author;
	private String title;
	private String file;
	private String day;

	public FileVO(int num, String author, String title, String file, String day) {
		this.num = num;
		this.author = author;
		this.title = title;
		this.file = file;
		this.day = day;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	@Override
	public String toString() {
		return "FileVO [num=" + num + ", author=" + author + ", title=" + title + ", file=" + file + ", day=" + day
				+ "]";
	}

}
