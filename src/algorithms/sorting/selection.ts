export const DISPLAY_NAME = "Selection Sort";
export const NAME = "selection";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        await callbacks.iteration(i);
        await callbacks.reset(i);

        for (let j = i + 1; j < n; j++) {
            await callbacks.iteration(j);

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            await callbacks.reset(j, minIndex);
        }

        if (minIndex !== i) {
            await callbacks.swap(i, minIndex);
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        await callbacks.sorted(i);
    }

    await callbacks.sorted(n - 1);
    return arr;
}
