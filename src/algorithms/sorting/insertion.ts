export const DISPLAY_NAME = "Insertion Sort";
export const NAME = "insertion";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        await callbacks.iteration(i);
        await callbacks.reset(i);

        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            await callbacks.iteration(j);
            await callbacks.swap(j, j + 1);
            arr[j + 1] = arr[j];
            j = j - 1;
            await callbacks.reset(j + 1);
        }

        arr[j + 1] = key;
    }

    for (let i = 0; i < n; i++) {
        await callbacks.sorted(i);
    }

    return arr;
}
