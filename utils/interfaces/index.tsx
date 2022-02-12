import React from "react";

export interface LayoutInterface {
	children: React.ReactNode;
	type?: string;
	text?: string;
	exploring?: boolean;
}

export interface LayoutStateInterface {
	openDrawer: boolean;
}
