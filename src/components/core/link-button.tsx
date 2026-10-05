"use client";

import * as React from "react";
import RouterLink from "next/link";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export function LinkButton(props: ButtonProps & { href: string }): React.JSX.Element {
	return <Button component={RouterLink} {...props} />;
}
