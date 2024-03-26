import { PropsWithChildren } from "react";
import { Pages, getActivePage } from "../data/Pages";
import { Link } from "react-router-dom";
import Button from "../components/Button";

interface Props {}

export default function PageLayout({ children }: PropsWithChildren<Props>) {
    return (
        <div className="p-10">
            <header>
                <Link to="/">
                    <h1 className="text-4xl font-bold text-center">
                        Algorithm Visualizations
                    </h1>
                </Link>

                <div className="my-6" />

                <ul className={`text-center grid grid-cols-3 gap-4`}>
                    {Pages.map((item, i) => (
                        <li
                            key={i}
                            className={`col-span-3 md:col-span-1`}
                        >
                            <Link to={item.href}>
                                <Button
                                    theme={
                                        getActivePage()?.name === item.name
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    <span className="text-white font-semibold">
                                        {item.name}
                                    </span>
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </header>
            <div className="my-4" />
            <main>{children}</main>
        </div>
    );
}
