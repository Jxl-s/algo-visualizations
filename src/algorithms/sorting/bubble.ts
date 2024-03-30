export const DISPLAY_NAME = "Bubble Sort";
export const NAME = "bubble";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;

        await callbacks.iteration(i);
        await callbacks.reset(i);

        for (let j = 0; j < n - i - 1; j++) {
            await callbacks.iteration(j);

            if (arr[j] > arr[j + 1]) {
                await callbacks.swap(j, j + 1);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }

            await callbacks.reset(j);
        }

        if (!swapped) {
            // make all sorted
            for (let j = 0; j < n; j++) {
                await callbacks.sorted(j);
            }

            break;
        }

        await callbacks.sorted(n - i - 1);
    }

    await callbacks.sorted(0);
    return arr;
}
