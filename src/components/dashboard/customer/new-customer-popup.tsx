import React from "react";

export function NewCustomerPopup(): React.JSX.Element {
	return (
		<form>
			<label>
				User Name:
				<input type="text" name="name" />
			</label>
			<label>
				Email:
				<input type="text" name="	Email" />
			</label>
			<label>
				Phone:
				<input type="text" name="tel" />
			</label>
			<label>
				Location:
				<input type="text" name="	Location" />
			</label>
		</form>
	);
}
