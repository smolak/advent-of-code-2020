import fs from 'fs';
import path from 'path';

const getFileContents = (filename) => fs.readFileSync(path.resolve(__dirname, filename), { encoding: 'utf8'});
const toLines = (rawData) => rawData.trim().split('\n');

const rentalPlacePasswordPolicy = {
    toModel: (entry) => {
        const [rangeData, letterData, password] = entry.split(' ');
        const [min, max] = rangeData.split('-');
        const letter = letterData.charAt(0);

        return {
            min,
            max,
            letter,
            password
        };
    },

    isValidPassword: (model) => {
        const { min, max, letter, password } = model;
        const letterOccurrences = password.split(letter).length - 1;

        return letterOccurrences >= min && letterOccurrences <= max;
    }
};

const officialTobogganCorporatePasswordPolicy = {
    toModel: (entry) => {
        const [positionsData, letterData, password] = entry.split(' ');
        const [positionOne, positionTwo] = positionsData.split('-');
        const letter = letterData.charAt(0);
        const toIndex = (position) => position - 1;

        return {
            indexOne: toIndex(positionOne),
            indexTwo: toIndex(positionTwo),
            letter,
            password
        };
    },

    isValidPassword: (model) => {
        const { indexOne, indexTwo, letter, password } = model;
        const letterIsAtIndexOne = password.charAt(indexOne) === letter;
        const letterIsAtIndexTwo = password.charAt(indexTwo) === letter;
        const letterOccursExactlyAtOnlyOneOfTheIndexes = (letterIsAtIndexOne && !letterIsAtIndexTwo) || (!letterIsAtIndexOne && letterIsAtIndexTwo);

        return letterOccursExactlyAtOnlyOneOfTheIndexes;
    }
};

const countValidPasswords = (passwordPolicy) => (rawData) => toLines(rawData).map(passwordPolicy.toModel).filter(passwordPolicy.isValidPassword).length;

export const countValidPasswordsAtSledRentalPlace = countValidPasswords(rentalPlacePasswordPolicy);
export const countValidPasswordsAtOfficialTobogganCorporate = countValidPasswords(officialTobogganCorporatePasswordPolicy);

console.log(countValidPasswordsAtSledRentalPlace(getFileContents('inputData.txt')));
console.log(countValidPasswordsAtOfficialTobogganCorporate(getFileContents('inputData.txt')));