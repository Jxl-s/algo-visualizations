export const DISPLAY_NAME = "Interpolation Search";
export const NAME = "interpolation";
export const SORT = true;

export async function search(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        const pos = Math.floor(
            low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        await callbacks.iteration(low);
        await callbacks.iteration(high);
        await callbacks.iteration(pos, [low, high]);

        if (arr[pos] === target) {
            await callbacks.found(pos);
            return pos;
        }

        await callbacks.reset(low);
        await callbacks.reset(high);

        if (arr[pos] < target) {
            await callbacks.eliminate([low, pos]);
            low = pos + 1;
        } else {
            await callbacks.eliminate([pos, high]);
            high = pos - 1;
        }
    }

    return -1;
}
