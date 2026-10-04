import * as React from "react";
import type { Metadata } from "next";
// import type { Customer } from "@/components/dashboard/customer/customers-table";
import customers from "@/app/data/customer.json";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { config } from "@/config";
import { CustomersTable } from "@/components/dashboard/customer/customers-table";

export const metadata = { title: `Clients | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
	return (
		<Stack spacing={3}>
			<Stack spacing={0.5}>
				<Typography variant="h4">Clients</Typography>
				<Typography color="text.secondary" variant="body2">
					Three sample records for the starting UI. Real create, edit, search, and persistence will be built step by
					step.
				</Typography>
			</Stack>
			<CustomersTable rows={customers} />
		</Stack>
	);
}
