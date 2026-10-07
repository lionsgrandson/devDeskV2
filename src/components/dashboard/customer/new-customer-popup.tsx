import React from "react";

import "@/styles/new-customer-popup.css";

export function NewCustomerPopup(): React.JSX.Element {
	return (
		<div className="popupFormDiv">
			<form className="formClientPopUp">
				<div className="outderLableDiv">
					<label>
						Name:
						<input type="text" name="name" placeholder="Name" />
					</label>
					<label>
						Email:
						<input type="text" name="email" placeholder="Email" />
					</label>
					<label>
						Phone:
						<input type="string" name="phone" placeholder="Phone" />
					</label>
					<label>
						Location:
						<input type="text" name="location" placeholder="Location" required />
					</label>
					<input type="submit" className="submitBTN" />
				</div>
			</form>
		</div>
	);
}
