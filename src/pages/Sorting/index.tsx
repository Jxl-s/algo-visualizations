import Select from "../../components/Select";
import PageLayout from "../../layouts/PageLayout";
import { SortingAlgorithms } from "../../data/Algorithms";
import ArrayInput from "../../components/array/ArrayInput";

export default function SortingPage() {
    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Sorting</h1>
            <p>
                Sorting algorithms are used to rearrange a collection of items
                in a specific order.
            </p>
            <div className="my-4" />
            <div className="grid grid-cols-3 gap-4">
                <ArrayInput onChange={() => {}} />
                <Select
                    className="col-span-3 lg:col-span-1"
                    label="Algorithm"
                    options={[
                        {
                            display: "Selection Sort",
                            value: SortingAlgorithms.Selection,
                        },
                        {
                            display: "Insertion Sort",
                            value: SortingAlgorithms.Insertion,
                        },
                        {
                            display: "Bubble Sort",
                            value: SortingAlgorithms.Bubble,
                        },
                        {
                            display: "Merge Sort",
                            value: SortingAlgorithms.Merge,
                        },
                        {
                            display: "Quick Sort",
                            value: SortingAlgorithms.Quick,
                        },
                    ]}
                />
            </div>
        </PageLayout>
    );
}
