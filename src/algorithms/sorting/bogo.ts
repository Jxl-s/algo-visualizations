export const DISPLAY_NAME = "Bogo Sort";
export const NAME = "bogo";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    while (!callbacks.stop) {
        const swapIndexes = [];
        for (let i = 0; i < arr.length; i++) {
            swapIndexes.push({ index: i, value: arr[i] });
        }

        // shuffle the swapIndexes
        for (let i = swapIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [swapIndexes[i], swapIndexes[j]] = [swapIndexes[j], swapIndexes[i]];
        }

        await callbacks.iteration(0);
        await callbacks.reorder(0, ...swapIndexes.map((item) => item.index));

        let sorted = true;
        for (let i = 1; i < swapIndexes.length; i++) {
            if (swapIndexes[i].value < swapIndexes[i - 1].value) {
                sorted = false;
                break;
            }
        }

        if (sorted) {
            await callbacks.sorted(...swapIndexes.map((item) => item.index));
            break;
        }
    }
}
