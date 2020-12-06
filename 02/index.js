import fs from 'fs';
import path from 'path';

const getFileContents = (filename) => fs.readFileSync(path.resolve(__dirname, filename), { encoding: 'utf8'});
const toLines = (rawData) => rawData.trim().split('\n');

const toModel = (entry) => {
    const [rangeData, letterData, password] = entry.split(' ');
    const [min, max] = rangeData.split('-');
    const letter = letterData.charAt(0);

    return {
        min,
        max,
        letter,
        password
    };
}

const parseData = (rawData) => toLines(rawData).map(toModel);
const isValidPassword = ({ min, max, letter, password }) => {
    const letterOccurrences = password.split(letter).length - 1;

    return letterOccurrences >= min && letterOccurrences <= max;
};

export const countValidPasswords = (rawData) => parseData(rawData).filter(isValidPassword).length;

console.log(countValidPasswords(getFileContents('inputData.txt')));