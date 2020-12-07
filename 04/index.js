import { getFileContents, toLines } from "../helpers";

const PASSPORT_PROPERTIES_SEPARATOR = ' ';
const PASSPORT_PROPERTIES_KEY_VALUE_SEPARATOR = ':';
const isPassportData = (entry) => entry.trim().length > 0;
const lastIndex = (list) => list.length === 0 ? 0 : list.length - 1;
const lastElement = (list) => list[lastIndex(list)];

const appendLast = (list, data, separator) => {
    const last = lastElement(list);
    const index = lastIndex(list);

    list[index] = `${last}${separator}${data}`.trim();

    return list;
};

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


const hasProperty = (property) => (passportData) => passportData[property] !== undefined;
const propertyIsInRange = (property, min, max) => (passportData) => {
    const value = parseInt(passportData[property], 10);

    return value >= min && value <= max;
}

const hasBirthYear = hasProperty('byr');
const hasRightAge = propertyIsInRange('byr',1920, 2002);

const hasIssueYear = hasProperty('iyr');
const wasIssuedRecently = propertyIsInRange('iyr', 2010, 2020);

const hasExpirationYear = hasProperty('eyr');
const isNotExpired = propertyIsInRange('eyr', 2020, 2030);

const hasHeight = hasProperty('hgt');
const inCm = (value) => value.includes('cm');
const inIn = (value) => value.includes('in');
const fitsHeightStandards = (passportData) => {
    const height = String(passportData.hgt);

    if (inCm(height)) {
        return propertyIsInRange('hgt',150, 193)(passportData);
    }

    if (inIn(height)) {
        return propertyIsInRange('hgt', 59, 76)(passportData);
    }

    return false;
};

const hasHairColor = hasProperty('hcl');
const hairColorIsDefined = ({ hcl }) => hcl.match(/^#[a-f0-9]{6}$/) !== null;

const hasEyeColor = hasProperty('ecl');
const acceptableEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const fitsEyesColorStandards = ({ ecl }) => acceptableEyeColors.includes(ecl);

const hasPassportId = hasProperty('pid');
const hasValidPassportId = ({ pid }) => pid.match(/^[0-9]{9}$/) !== null;

const hasCid = hasProperty('cid');

const passportIsValid = (passportData) =>
    passportData.numberOfProperties === 8 || (passportData.numberOfProperties === 7 && !hasCid(passportData));

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

