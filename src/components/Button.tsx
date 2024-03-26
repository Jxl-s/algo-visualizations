import type { PropsWithChildren } from "react";

const themes = {
    primary: "bg-blue-600 hover:bg-blue-500",
    secondary: "bg-neutral-600 hover:bg-neutral-500",
    danger: "bg-red-600 hover:bg-red-500",
} as const;

interface Props {
    onClick?: () => void;
    theme?: keyof typeof themes;
}

export default function Button({
    onClick,
    theme,
    children,
}: PropsWithChildren<Props>) {
    return (
        <button
            onClick={onClick}
            className={`${
                themes[theme ?? "primary"]
            } w-full duration-300 rounded-lg h-10 shadow-md`}
        >
            {children}
        </button>
    );
}
