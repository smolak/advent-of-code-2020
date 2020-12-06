import { getFileContents, toLines } from "../helpers";

const inputData = toLines(getFileContents(__dirname, 'inputData.txt')).map(Number);

const searchedSum = 2020;
let twoNumbersResult;
let threeNumbersResult;

const checkSum = (entries, expectedSum) => {
    return expectedSum === entries.reduce((sum, entry) => sum + entry, 0);
}
const multiply = (entries) => entries.reduce((product, entry) => product * entry, 1);

// If there was a need for custom number of sum of numbers that produce 2020, I would think about
// some generic function. For those two only a little duplication is fine.

inputData.some((entry, index) => {
    return inputData.some((secondEntry, secondIndex) => {
        if (index !== secondIndex) {
            const numbers = [ entry, secondEntry ];

            if (checkSum(numbers, searchedSum)) {
                twoNumbersResult = multiply(numbers);

                return true;
            }
        }
    });
});

inputData.some((entry, index) => {
    return inputData.some((secondEntry, secondIndex) => {
        return inputData.some((thirdEntry, thirdIndex) => {
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

console.log('Two numbers result:', twoNumbersResult);
console.log('Three numbers result:', threeNumbersResult);