import { getFileContents, toLines } from "../helpers";
import { appendLast } from "./utils";
import {
    hasBirthYear, hasRightAge, hasIssueYear, wasIssuedRecently, hasExpirationYear, isNotExpired,
    hasHeight, fitsHeightStandards, hasHairColor, hairColorIsDefined, hasEyeColor, fitsEyesColorStandards,
    hasPassportId, hasValidPassportId, hasCountryId
} from "./validators";

const PASSPORT_PROPERTIES_SEPARATOR = ' ';
const PASSPORT_PROPERTIES_KEY_VALUE_SEPARATOR = ':';
const isPassportData = (entry) => entry.trim().length > 0;

const buildPassportObject = (passportData) => {
    const properties = passportData.split(PASSPORT_PROPERTIES_SEPARATOR);

    const passportObject = properties
        .reduce((acc, keyValuePair) => {
            const [key, value] = keyValuePair.split(PASSPORT_PROPERTIES_KEY_VALUE_SEPARATOR);

            return {
                ...acc,
                [key]: value
            };
        }, {});

    return {
        ...passportObject,
        numberOfProperties: properties.length
    };
}
const prepareNewPassport = (passportsData) => [ ...passportsData, '' ];

const toPassportsData = (rawData) => toLines(rawData)
    .reduce((passportsData, line) => {
        return isPassportData(line) ?
            appendLast(passportsData, line, PASSPORT_PROPERTIES_SEPARATOR) :
            prepareNewPassport(passportsData);
    }, [ '' ])
        .map(buildPassportObject);

const passportIsValid = (passportData) =>
    passportData.numberOfProperties === 8 || (passportData.numberOfProperties === 7 && !hasCountryId(passportData));

export const validatePassports = (rawData) => toPassportsData(rawData)
    .reduce((numberOfValidPassports, passportData) => {
        return passportIsValid(passportData) ? numberOfValidPassports + 1 : numberOfValidPassports;
    }, 0);

const passportIsStrictlyValid = (passportData) => {
    const validators = [
        hasBirthYear, hasRightAge,
        hasIssueYear, wasIssuedRecently,
        hasExpirationYear, isNotExpired,
        hasHeight, fitsHeightStandards,
        hasHairColor, hairColorIsDefined,
        hasEyeColor, fitsEyesColorStandards,
        hasPassportId, hasValidPassportId
    ];

    return validators.every((isValid) => isValid(passportData));
}

export const strictPassportsValidation = (rawData) => toPassportsData(rawData)
    .reduce((numberOfValidPassports, passportData) => {
        return passportIsStrictlyValid(passportData) ? numberOfValidPassports + 1 : numberOfValidPassports;
    }, 0);

console.log('[D4T1] Number of valid passports:', validatePassports(getFileContents(__dirname, 'inputData.txt')));
console.log('[D4T1] Number of strictly valid passports:', strictPassportsValidation(getFileContents(__dirname, 'inputData.txt')));

