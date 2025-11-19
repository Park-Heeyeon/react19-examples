import type { ComponentType } from "react";

export type TabItem = {
  key: string;
  label: string;
  component?: ComponentType;
};
