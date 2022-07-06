import React from "react";

export interface LayoutInterface {
  children: React.ReactNode;
  type?: string;
  text?: string;
  exploring?: boolean;
  toggle?: boolean;
}

export interface LayoutStateInterface {
  openDrawer: boolean;
}

export type StateProps = {
  propertyType: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  location?: string;
};
