export default function binarySearch(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        callbacks.iteration(mid, [low, high]);

        if (arr[mid] === target) {
            callbacks.found(mid);
            return mid;
        }

        if (arr[mid] < target) {
            callbacks.eliminate([low, mid]);
            low = mid + 1;
        } else {
            callbacks.eliminate([mid, high]);
            high = mid - 1;
        }
    }
}
