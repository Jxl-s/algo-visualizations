export const DISPLAY_NAME = "Exponential Search";
export const NAME = "exponential";
export const SORT = true;

async function binarySearch(arr: number[], left: number, right: number, x: number, callbacks: Callbacks) {
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        // Check if x is present at mid
        await callbacks.iteration(mid, [left, right]);

        if (arr[mid] === x) {
            await callbacks.found(mid);
            return mid;
        }

        // If x greater, ignore left half
        if (arr[mid] < x) {
            await callbacks.eliminate([left, mid]);
            left = mid + 1;
        } else {
            // If x is smaller, ignore right half
            await callbacks.eliminate([mid, right]);
            right = mid - 1;
        }
    }

    // If we reach here, then the element was not present
    return -1;
}

export async function search(arr: number[], target: number, callbacks: Callbacks) {
    const n = arr.length;

    // If the element is present at the first position itself
    await callbacks.iteration(0);
    await callbacks.reset(0);
    if (arr[0] === target) {
        await callbacks.found(0);
        return 0;
    } else {
        await callbacks.eliminate([0]);
    }

    // Find the range for binary search by repeated doubling
    let i = 1;
    while (i < n && arr[i] <= target) {
        await callbacks.iteration(i);
        await callbacks.eliminate([Math.floor(i / 2), i]);
        i *= 2;
    }

    // Perform binary search in the found range
    return binarySearch(arr, Math.floor(i / 2), Math.min(i, n - 1), target, callbacks);
}
