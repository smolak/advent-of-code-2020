const hasProperty = (property) => (passportData) => passportData[property] !== undefined;
const propertyIsInRange = (property, min, max) => (passportData) => {
    const value = parseInt(passportData[property], 10);

    return value >= min && value <= max;
}

export const hasBirthYear = hasProperty('byr');
export const hasRightAge = propertyIsInRange('byr',1920, 2002);

export const hasIssueYear = hasProperty('iyr');
export const wasIssuedRecently = propertyIsInRange('iyr', 2010, 2020);

export const hasExpirationYear = hasProperty('eyr');
export const isNotExpired = propertyIsInRange('eyr', 2020, 2030);

export const hasHeight = hasProperty('hgt');
const inCm = (value) => value.includes('cm');
const inIn = (value) => value.includes('in');
export const fitsHeightStandards = (passportData) => {
    const height = String(passportData.hgt);

    if (inCm(height)) {
        return propertyIsInRange('hgt',150, 193)(passportData);
    }

    if (inIn(height)) {
        return propertyIsInRange('hgt', 59, 76)(passportData);
    }

    return false;
};

export const hasHairColor = hasProperty('hcl');
export const hairColorIsDefined = ({ hcl }) => hcl.match(/^#[a-f0-9]{6}$/) !== null;

export const hasEyeColor = hasProperty('ecl');
const acceptableEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
export const fitsEyesColorStandards = ({ ecl }) => acceptableEyeColors.includes(ecl);

export const hasPassportId = hasProperty('pid');
export const hasValidPassportId = ({ pid }) => pid.match(/^[0-9]{9}$/) !== null;

export const hasCountryId = hasProperty('cid');