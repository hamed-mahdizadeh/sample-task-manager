import { MenuItemProps, SelectProps } from "@mui/material";
import { ReactNode } from "react";

export interface Theme {
    name: 'dark' | 'light';
    main: string;
    secondary: string;
    border: string;
    background: string;
    boxShadow: string;
    secondaryBackground: string;
    tertiaryBackground: string;
    selected: string;
}


export type CustomSelectType = <Value>(
    props: SelectProps<Value> & { theme: Theme, children: ReactNode[]}
    ) => React.JSX.Element;

export type CustomSelectItemType = (props: MenuItemProps & {theme: Theme}) => React.JSX.Element;