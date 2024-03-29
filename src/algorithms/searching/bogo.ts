export const DISPLAY_NAME = "Bogo Search";
export const NAME = "bogo";
export const SORT = false;

export async function search(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    while (!callbacks.stop) {
        const i = Math.floor(Math.random() * arr.length);
        await callbacks.iteration(i);
        
        if (arr[i] === target) {
            await callbacks.found(i);
            return i;
        }

        await callbacks.reset(i);
    }
}
