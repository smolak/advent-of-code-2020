import { getFileContents, toLines } from "../helpers";

const decryptString = (upperHalf, limit) => (string) => {
    return string.split('').reduce((sum, element, index) => {
        const diff = (limit + 1)/(Math.pow(2, index) * 2);

        return element === upperHalf ? sum + diff : sum;
    }, 0);
};

const decryptRow = decryptString('B', 127);
const decryptColumn = decryptString('R', 7);

export const decryptSeatInfo = (encryptedSeatInfo) => {
    const rowString = encryptedSeatInfo.substr(0,7);
    const columnString = encryptedSeatInfo.substr(7);

    return {
        row: decryptRow(rowString),
        column: decryptColumn(columnString)
    };
}

const calculateSeatId = (seat) => seat.row * 8 + seat.column;

const inputData = getFileContents(__dirname, 'inputData.txt');
const encryptedSeatsInfo = toLines(inputData);
const desc = (a, b) => b - a;

const highestSeatId = encryptedSeatsInfo.map(decryptSeatInfo).map(calculateSeatId).sort(desc)[0];

console.log('[D5T1] Highest seat ID:', highestSeatId);