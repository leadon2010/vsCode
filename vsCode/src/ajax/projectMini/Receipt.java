package ajax.projectMini;

public class Receipt {
	private String receiptNo;
	private String receiptVendor;
	private String receiptItem;
	private int receiptQty;
	private int receiptPrice;
	private int receiptAmount;
	private String receiptSub;
	private String receiptDate;

	public String getReceiptNo() {
		return receiptNo;
	}

	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}

	public String getReceiptVendor() {
		return receiptVendor;
	}

	public void setReceiptVendor(String receiptVendor) {
		this.receiptVendor = receiptVendor;
	}

	public String getReceiptItem() {
		return receiptItem;
	}

	public void setReceiptItem(String receiptItem) {
		this.receiptItem = receiptItem;
	}

	public int getReceiptQty() {
		return receiptQty;
	}

	public void setReceiptQty(int receiptQty) {
		this.receiptQty = receiptQty;
	}

	public int getReceiptPrice() {
		return receiptPrice;
	}

	public void setReceiptPrice(int receiptPrice) {
		this.receiptPrice = receiptPrice;
	}

	public int getReceiptAmount() {
		return receiptAmount;
	}

	public void setReceiptAmount(int receiptAmount) {
		this.receiptAmount = receiptAmount;
	}

	public String getReceiptSub() {
		return receiptSub;
	}

	public void setReceiptSub(String receiptSub) {
		this.receiptSub = receiptSub;
	}

	public String getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(String receiptDate) {
		this.receiptDate = receiptDate;
	}

}
