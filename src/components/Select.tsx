import { useRef } from "react";

interface Props extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">{
    className?: string;
    label?: string;
    onChange: (value: string) => void;
    value: string;
    options: { display: string; value: string }[];
}

export default function Select(props: Props) {
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
            <select
                {...props}
                className="rounded-lg border border-neutral-400 h-10 ps-4 outline-none w-full"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            >
                {props.options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>
        </div>
    );
}
