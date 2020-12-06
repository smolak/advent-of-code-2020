import { getFileContents, toLines } from "../helpers";

const parseData = (rawData) => toLines(rawData).map(Number);
const searchedSum = 2020;
const checkSum = (entries, expectedSum) => {
    return expectedSum === entries.reduce((sum, entry) => sum + entry, 0);
}
const multiply = (entries) => entries.reduce((product, entry) => product * entry, 1);

// If there was a need for custom number of sum of numbers that produce 2020, I would think about
// some generic function. For those two only a little duplication is fine.

export const calculateTwoNumbersSum = (rawData) => {
    const data = parseData(rawData);
    let twoNumbersResult;

    data.some((entry, index) => {
        return data.some((secondEntry, secondIndex) => {
            if (index !== secondIndex) {
                const numbers = [ entry, secondEntry ];

                if (checkSum(numbers, searchedSum)) {
                    twoNumbersResult = multiply(numbers);

                    return true;
                }
            }
        });
    });

    return twoNumbersResult;
}

export const calculateThreeNumbersSum = (rawData) => {
    const data = parseData(rawData);
    let threeNumbersResult;

    data.some((entry, index) => {
        return data.some((secondEntry, secondIndex) => {
            return data.some((thirdEntry, thirdIndex) => {
                if (index !== secondIndex && index !== thirdIndex) {
                    const numbers = [ entry, secondEntry, thirdEntry ];

                    if (checkSum(numbers, searchedSum)) {
                        threeNumbersResult = multiply(numbers);

                        return true;
                    }
                }
            });
        });
    });

    return threeNumbersResult;
}

console.log('[D1T1] Two numbers result:', calculateTwoNumbersSum(getFileContents(__dirname, 'inputData.txt')));
console.log('[D1T2] Three numbers result:', calculateThreeNumbersSum(getFileContents(__dirname, 'inputData.txt')));