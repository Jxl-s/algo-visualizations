export const DISPLAY_NAME = "Selection Sort";
export const NAME = "selection";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        await callbacks.active(minIndex);

        for (let j = i + 1; j < n; j++) {
            await callbacks.iteration(j);
            await callbacks.reset(j);

            if (arr[j] < arr[minIndex]) {
                await callbacks.reset(minIndex);
                minIndex = j;
                await callbacks.active(minIndex);
            }
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
