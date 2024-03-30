export const DISPLAY_NAME = "Bogo Sort";
export const NAME = "bogo";

export async function sort(arr: number[], callbacks: SortCallbacks) {
    while (!callbacks.stop) {
        // swap one item, and see if it's sortedf
        const item_1 = Math.floor(Math.random() * arr.length);
        const item_2 = Math.floor(Math.random() * arr.length);
        await callbacks.iteration(item_1);

        [arr[item_1], arr[item_2]] = [arr[item_2], arr[item_1]];
        await callbacks.swap(item_1, item_2, true);

        let sorted = true;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                sorted = false;
                break;
            }
        }

        if (sorted) {
            for (let i = 0; i < arr.length; i++) {
                callbacks.sorted(i);
            }

            break;
        }
    }
}
