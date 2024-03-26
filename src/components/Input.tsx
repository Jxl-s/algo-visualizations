import { useRef } from "react";

interface Props
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    placeholder?: string;
    label?: string;
    onChange: (value: string) => void;
    value: string;
}

export default function Input(props: Props) {
    // Generate an ID for the input element
    const inputRef = useRef();

    return (
        <div className={props.className}>
            {props.label && (
                <label
                    htmlFor={inputRef.current}
                    className="block font-semibold mb-1"
                >
                    {props.label}
                </label>
            )}
            <input
                {...props}
                className="rounded-lg border border-neutral-400 h-10 px-4 outline-none w-full disabled:opacity-50"
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}
