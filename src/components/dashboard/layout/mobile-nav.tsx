"use client";

import * as React from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";

import { navItems } from "./config";
import { navIcons } from "./nav-icons";

export interface MobileNavProps {
	onClose?: () => void;
	open?: boolean;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
	const pathname = usePathname();

	return (
		<Drawer
			slotProps={{
				paper: {
					sx: {
						"--MobileNav-background": "var(--mui-palette-neutral-950)",
						"--MobileNav-color": "var(--mui-palette-common-white)",
						"--NavItem-color": "var(--mui-palette-neutral-300)",
						"--NavItem-active-background": "var(--mui-palette-primary-main)",
						"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
						"--NavItem-icon-color": "var(--mui-palette-neutral-400)",
						"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
						bgcolor: "var(--MobileNav-background)",
						color: "var(--MobileNav-color)",
						display: "flex",
						flexDirection: "column",
						maxWidth: "100%",
						width: "var(--MobileNav-width)",
					},
				},
			}}
			onClose={onClose}
			open={open}
		>
			<Box sx={{ p: 3 }}>
				<Box
					component={RouterLink}
					href={paths.dashboard.overview}
					onClick={onClose}
					sx={{ color: "inherit", display: "inline-flex", textDecoration: "none" }}
				>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>
						DevDesk
					</Typography>
				</Box>
			</Box>
			<Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
			<Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
				{renderNavItems({ pathname, items: navItems, onClose })}
			</Box>
		</Drawer>
	);
}

function renderNavItems({
	items = [],
	pathname,
	onClose,
}: {
	items?: NavItemConfig[];
	pathname: string;
	onClose?: () => void;
}): React.JSX.Element {
	return (
		<Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
			{items.map(({ key, ...item }) => (
				<NavItem key={key} pathname={pathname} onClose={onClose} {...item} />
			))}
		</Stack>
	);
}

interface NavItemProps extends Omit<NavItemConfig, "items"> {
	pathname: string;
	onClose?: () => void;
}

function NavItem({
	disabled,
	external,
	href,
	icon,
	matcher,
	pathname,
	title,
	onClose,
}: NavItemProps): React.JSX.Element {
	const active = isNavItemActive({ disabled, external, href, matcher, pathname });
	const Icon = icon ? navIcons[icon] : null;

	return (
		<li>
			<Box
				{...(href
					? {
							component: external ? "a" : RouterLink,
							href,
							target: external ? "_blank" : undefined,
							rel: external ? "noreferrer" : undefined,
							onClick: onClose,
						}
					: { role: "button" })}
				sx={{
					alignItems: "center",
					borderRadius: 1,
					color: "var(--NavItem-color)",
					cursor: disabled ? "not-allowed" : "pointer",
					display: "flex",
					gap: 1,
					p: "6px 16px",
					textDecoration: "none",
					whiteSpace: "nowrap",
					...(active && { bgcolor: "var(--NavItem-active-background)", color: "var(--NavItem-active-color)" }),
				}}
			>
				<Box sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
					{Icon ? (
						<Icon
							fill={active ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
							fontSize="var(--icon-fontSize-md)"
							weight={active ? "fill" : undefined}
						/>
					) : null}
				</Box>
				<Typography
					component="span"
					sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}
				>
					{title}
				</Typography>
			</Box>
		</li>
	);
}
