export default async function ternarySearch(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const partitionSize = Math.floor((right - left) / 3);
        const mid1 = left + partitionSize;
        const mid2 = right - partitionSize;

        await callbacks.iteration(mid1);
        await callbacks.iteration(mid2);

        await callbacks.reset(mid1);
        await callbacks.reset(mid2);

        if (arr[mid1] === target) {
            await callbacks.found(mid1);
            return mid1;
        } else if (arr[mid2] === target) {
            await callbacks.found(mid2);
            return mid2;
        } else if (target < arr[mid1]) {
            await callbacks.eliminate([mid1, right]);
            right = mid1 - 1;
        } else if (target > arr[mid2]) {
            await callbacks.eliminate([left, mid2]);
            left = mid2 + 1;
        } else {
            await callbacks.eliminate([left, mid1]);
            await callbacks.eliminate([mid2, right]);
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }

    return -1;
}
