package ajax.projectMini;

public class Issue {
	private String issueNo;
	private String issueVendor;
	private String issueItem;
	private int issueQty;
	private int issuePrice;
	private int issueAmount;
	private String issueSub;
	private String issueDate;

	Issue() {
	};

	Issue(String issueNo, String issueVendor, String issueItem, int issueQty, int issuePrice, int issueAmount,
			String issueSub) {
		this.issueNo = issueNo;
		this.issueVendor = issueVendor;
		this.issueItem = issueItem;
		this.issueQty = issueQty;
		this.issuePrice = issuePrice;
		this.issueAmount = issueAmount;
		this.issueSub = issueSub;
	}

	public String getIssueNo() {
		return issueNo;
	}

	public void setIssueNo(String issueNo) {
		this.issueNo = issueNo;
	}

	public String getIssueVendor() {
		return issueVendor;
	}

	public void setIssueVendor(String issueVendor) {
		this.issueVendor = issueVendor;
	}

	public String getIssueItem() {
		return issueItem;
	}

	public void setIssueItem(String issueItem) {
		this.issueItem = issueItem;
	}

	public int getIssueQty() {
		return issueQty;
	}

	public void setIssueQty(int issueQty) {
		this.issueQty = issueQty;
	}

	public int getIssuePrice() {
		return issuePrice;
	}

	public void setIssuePrice(int issuePrice) {
		this.issuePrice = issuePrice;
	}

	public int getIssueAmount() {
		return issueAmount;
	}

	public void setIssueAmount(int issueAmount) {
		this.issueAmount = issueAmount;
	}

	public String getIssueSub() {
		return issueSub;
	}

	public void setIssueSub(String issueSub) {
		this.issueSub = issueSub;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}

}
