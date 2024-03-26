import Button from "../../components/Button";
import Input from "../../components/Input";
import PageLayout from "../../layouts/PageLayout";
import Select from "../../components/Select";
import { SearchingAlgorithms } from "../../data/Algorithms";
import useSearchingStore from "../../stores/useSearchingStore";

export default function SearchingPage() {
    const numberList = useSearchingStore((state) => state.numberList);
    const setNumberList = useSearchingStore((state) => state.setNumberList);

    const algorithm = useSearchingStore((state) => state.algorithm);
    const setAlgorithm = useSearchingStore((state) => state.setAlgorithm);

    function randomizeNumberList() {
        const numbers = Array.from({ length: 10 }, () =>
            Math.floor(Math.random() * 100)
        );

        setNumberList(numbers.join(","));
    }

    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Searching</h1>
            <p>
                Searching algorithms are used to find a specific item in a
                collection of items.
            </p>

            <div className="my-4" />

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 lg:col-span-1 grid grid-cols-5 items-end gap-2">
                    <Input
                        className="col-span-4"
                        label="Number List (comma separated)"
                        placeholder="e.g. 1,2,3,4,5"
                        onChange={setNumberList}
                        value={numberList}
                    />
                    <Button onClick={randomizeNumberList}>
                        <span className="text-white font-semibold">
                            Randomize
                        </span>
                    </Button>
                </div>
                <Select
                    className="col-span-3 lg:col-span-1"
                    value={algorithm}
                    label="Algorithm"
                    onChange={(value) =>
                        setAlgorithm(value as SearchingAlgorithms)
                    }
                    options={[
                        {
                            display: "Linear Search",
                            value: SearchingAlgorithms.Linear,
                        },
                        {
                            display: "Binary Search",
                            value: SearchingAlgorithms.Binary,
                        },
                    ]}
                />
            </div>
        </PageLayout>
    );
}
