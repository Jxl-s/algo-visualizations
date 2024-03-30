export const DISPLAY_NAME = "Quick Sort";
export const NAME = "quick";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    const n = arr.length;

    async function partition(low: number, high: number) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            await callbacks.iteration(j);
            if (arr[j] < pivot) {
                i++;
                await callbacks.swap(i, j);
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        await callbacks.swap(i + 1, high);
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    async function quickSort(low: number, high: number) {
        if (low < high) {
            const pi = await partition(low, high);

            await quickSort(low, pi - 1);
            await quickSort(pi + 1, high);
        }
    }

    await quickSort(0, n - 1);

    for (let i = 0; i < n; i++) {
        await callbacks.sorted(i);
    }

    return arr;
}
