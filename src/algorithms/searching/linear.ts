export const DISPLAY_NAME = "Linear Search";
export const NAME = "linear";
export const SORT = false;

export async function search(
    arr: number[],
    target: number,
    callbacks: SearchCallbacks
) {
    for (let i = 0; i < arr.length; i++) {
        if (callbacks.stop) return;

        await callbacks.iteration(i);

        if (arr[i] === target) {
            await callbacks.found(i);
            return i;
        }

        await callbacks.eliminate([i]);
    }
}
