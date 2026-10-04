import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: { city: string; country: string };
}

interface CustomersTableProps {
	rows?: Customer[];
}

export function CustomersTable({ rows = [] }: CustomersTableProps): React.JSX.Element {
	return (
		<Card>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 640 }}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Location</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow hover key={row.id}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.phone}</TableCell>
								<TableCell>
									{row.address.city}, {row.address.country}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Card>
	);
}
