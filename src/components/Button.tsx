import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const themes = {
    primary: "bg-blue-600 hover:bg-blue-500",
    secondary: "bg-neutral-600 hover:bg-neutral-500",
    danger: "bg-red-600 hover:bg-red-500",
} as const;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    theme?: keyof typeof themes;
}

export default function Button(props: PropsWithChildren<Props>) {
    return (
        <button
            {...props}
            onClick={props.onClick}
            className={`${
                themes[props.theme ?? "primary"]
            } w-full duration-300 rounded-lg h-10 shadow-md disabled:opacity-50`}
        >
            {props.children}
        </button>
    );
}
