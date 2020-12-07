import { getFileContents, toLines } from "../helpers";

const PASSPORT_PROPERTIES_SEPARATOR = ' ';
const isPassportData = (entry) => entry.trim().length > 0;
const lastIndex = (list) => list.length === 0 ? 0 : list.length - 1;
const lastElement = (list) => list[lastIndex(list)];
const cidIsMissing = (passportData) => passportData.findIndex((keyValuePair) => keyValuePair.includes('cid:')) === -1;
const appendLast = (list, data, separator) => {
    const last = lastElement(list);
    const index = lastIndex(list);

    list[index] = `${last}${separator}${data}`.trim();

    return list;
};
const parsePassportData = (passportsData) => passportsData.split(PASSPORT_PROPERTIES_SEPARATOR);
const prepareNewPassport = (passportsData) => [ ...passportsData, '' ];

const toPassportsData = (rawData) => toLines(rawData)
    .reduce((passportsData, line) => {
        return isPassportData(line) ?
            appendLast(passportsData, line, PASSPORT_PROPERTIES_SEPARATOR) :
            prepareNewPassport(passportsData);
    }, [ '' ])
        .map(parsePassportData);

const passportIsValid = (passportData) => passportData.length === 8 || (passportData.length === 7 && cidIsMissing(passportData));

export const validatePassports = (rawData) => toPassportsData(rawData)
    .reduce((numberOfValidPassports, passportData) => {
        return passportIsValid(passportData) ? numberOfValidPassports + 1 : numberOfValidPassports;
    }, 0);

console.log('[D4T1] Number of valid passports:', validatePassports(getFileContents(__dirname, 'inputData.txt')));

