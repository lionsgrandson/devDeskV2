"use client";

import * as React from "react";
import { useState } from "react";
// import type { Metadata } from "next";
import customers from "@/app/data/customer.json";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// import { config } from "@/config";
import { CustomersTable } from "@/components/dashboard/customer/customers-table";
import { NewCustomerPopup } from "@/components/dashboard/customer/new-customer-popup";

// export const metadata = { title: `Clients | ${config.site.name}` } satisfies Metadata;
export default function Page(): React.JSX.Element {
	const [showPopUp, setshowPopUp] = useState(true);
	const changePopupState = () => {
		setshowPopUp(!showPopUp);
	};
	return (
		<Stack spacing={3}>
			<Stack spacing={0.5}>
				<Typography variant="h4">Clients</Typography>
				<Typography color="text.secondary" variant="body2">
					Three sample records for the starting UI. Real create, edit, search, and persistence will be built step by
					step.
				</Typography>
			</Stack>
			<Button variant="contained" onClick={changePopupState}>
				New Customer
			</Button>
			{showPopUp ? null : <NewCustomerPopup />}
			<CustomersTable rows={customers} />
		</Stack>
	);
}
