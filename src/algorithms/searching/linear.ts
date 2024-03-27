export default function linearSearch(
    arr: number[],
    target: number,
    callbacks: Callbacks
) {
    for (let i = 0; i < arr.length; i++) {
        callbacks.iteration(i);

        if (arr[i] === target) {
            callbacks.found(i);
            return i;
        }

        callbacks.eliminate([i]);
    }
}
