import { useRef } from "react";

interface Props {
    placeholder?: string;
    className?: string;
    label?: string;
    onChange: (value: string) => void;
    value: string;
}

export default function Input({ placeholder, className, label, onChange, value }: Props) {
    // Generate an ID for the input element
    const inputRef = useRef();

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={inputRef.current}
                    className="block font-semibold mb-1"
                >
                    {label}
                </label>
            )}
            <input
                placeholder={placeholder ?? ""}
                className="rounded-lg border border-neutral-400 h-10 ps-4 outline-none w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
