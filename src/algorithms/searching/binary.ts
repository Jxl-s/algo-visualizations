export const DISPLAY_NAME = "Binary Search";
export const NAME = "binary";
export const SORT = true;

export async function search(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        if (callbacks.stop) return;

        const mid = Math.floor((low + high) / 2);
        await callbacks.iteration(mid, [low, high]);

        if (arr[mid] === target) {
            await callbacks.found(mid);
            return mid;
        }

        if (arr[mid] < target) {
            await callbacks.eliminate([low, mid]);
            low = mid + 1;
        } else {
            await callbacks.eliminate([mid, high]);
            high = mid - 1;
        }
    }
}
