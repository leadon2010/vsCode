package fullCalendar;

public class DataTable {
	private int groupId;
	private String title;
	private String startDate;
	private String endDate;

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

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
		return "DataTable [groupId=" + groupId + ", title=" + title + ", startDate=" + startDate + ", endDate="
				+ endDate + "]";
	}

}
