import { validatePassports, strictPassportsValidation } from "./index";
import { expect } from 'chai';

const inputData = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`;

describe('validatePassports', () => {
    it('should return number of valid passport data', () => {
        expect(validatePassports(inputData)).to.equal(2);
    });
});

describe('strictPassportsValidation', () => {
    it('should return number of valid passport data (but is much stricter)', () => {
        expect(strictPassportsValidation(inputData)).to.equal(2);
    });
});