export const DISPLAY_NAME = "Merge Sort";
export const NAME = "merge";

type SortItem = {
    value: number;
    index: number;
};

async function merge(
    left: SortItem[],
    right: SortItem[],
    callbacks: SortCallbacks
) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        await callbacks.iteration(left[leftIndex].index);
        await callbacks.iteration(right[rightIndex].index);

        await callbacks.reset(left[leftIndex].index);
        await callbacks.reset(right[rightIndex].index);

        if (left[leftIndex].value < right[rightIndex].value) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements from left and right subarrays
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

async function mergeSort(
    arr: SortItem[],
    callbacks: SortCallbacks
): Promise<SortItem[]> {
    if (arr.length <= 1) {
        return arr;
    }

    // find the minimum first
    let min = Infinity;
    for (const num of arr) {
        if (num.index < min) {
            min = num.index;
        }
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const merged = await merge(
        await mergeSort(left, callbacks),
        await mergeSort(right, callbacks),
        callbacks
    );

    const reorder = merged.map((item) => item.index);
    await callbacks.reorder(min, ...reorder);
    return merged;
}

export async function sort(
    arr: number[],
    callbacks: SortCallbacks
): Promise<number[]> {
    // Convert the input array into an array of objects containing both value and index
    const arrWithIndexes: SortItem[] = arr.map((value, index) => ({
        value,
        index,
    }));

    // Recursive merge sort
    const sortedArrWithIndexes = await mergeSort(arrWithIndexes, callbacks);

    // Map the sorted array of objects back to an array of original values
    const sortedArr = sortedArrWithIndexes.map((item) => item.value);
    // const reorder = sortedArrWithIndexes.map((item) => item.index);
    // await callbacks.reorder(0, ...reorder);

    return sortedArr;
}
