export default function isNumberCsv(str: string) {
    const arr = str.split(",").map((str) => parseInt(str));
    return !arr.some((str) => isNaN(str));
}