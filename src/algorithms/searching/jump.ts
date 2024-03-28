export const DISPLAY_NAME = "Jump Search";
export const NAME = "jump";
export const SORT = true;

export async function search(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    const n = arr.length;
    const jumpSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let current = jumpSize;

    // Finding the block where the element may be present
    while (current < n && arr[current] < target) {
        await callbacks.iteration(current);
        await callbacks.reset(current);
        await callbacks.eliminate([prev, current - 1]);

        prev = current;
        current += jumpSize;
    }

    // Performing a linear search in the found block
    for (let i = prev; i < Math.min(current, n); i++) {
        await callbacks.iteration(i);
        if (arr[i] === target) {
            await callbacks.found(i);
            return i; // Element found, return its index
        }

        await callbacks.eliminate([i]);
    }

    return -1; // Element not found
}
