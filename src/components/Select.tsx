import { useRef } from "react";

interface Props {
    className?: string;
    label?: string;
    onChange: (value: string) => void;
    value: string;
    options: { display: string; value: string }[];
}

export default function Select({
    className,
    label,
    onChange,
    value,
    options,
}: Props) {
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
            <select
                className="rounded-lg border border-neutral-400 h-10 ps-4 outline-none w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>
        </div>
    );
}
