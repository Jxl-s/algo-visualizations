export default async function linearSearch(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    for (let i = 0; i < arr.length; i++) {
        await callbacks.iteration(i);

        if (arr[i] === target) {
            await callbacks.found(i);
            return i;
        }

        await callbacks.eliminate([i]);
    }
}
