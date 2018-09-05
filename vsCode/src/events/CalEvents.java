package events;

public class CalEvents {
	private String title;
	private String startDate;
	private String endDate;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "CalEvents [title=" + title + ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}

}
