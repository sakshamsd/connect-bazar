import { toast } from "react-toastify";

export default function showToastMessage(messageText, messageType = "I") {
	toast.dismiss();
	if (messageType === "S") {
		toast.success(messageText);
	}
	if (messageType === "I") {
		toast.info(messageText);
	}
	if (messageType === "E") {
		toast.error(messageText);
	}
	if (messageType === "W") {
		toast.warning(messageText);
	}
}
