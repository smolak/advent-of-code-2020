import { expect } from 'chai';
import { countValidPasswordsAtSledRentalPlace, countValidPasswordsAtOfficialTobogganCorporate } from './index';

describe('countValidPasswordsAtSledRentalPlace', () => {
    const inputDataWithNoValidPasswords = `
1-3 f: abcde
1-3 b: cdefg
2-9 a: ccccccccc
`;
    const inputDataWithOneValidPasswords = `
1-3 f: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`;
    const inputDataWithTwoValidPasswords = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`;
    const inputDataWithThreeValidPasswords = `
1-3 a: abcde
1-3 c: cdefg
2-9 c: ccccccccc
`;

    it('should return the number of passwords that are valid', () => {
        expect(countValidPasswordsAtSledRentalPlace(inputDataWithNoValidPasswords)).to.equal(0);
        expect(countValidPasswordsAtSledRentalPlace(inputDataWithOneValidPasswords)).to.equal(1);
        expect(countValidPasswordsAtSledRentalPlace(inputDataWithTwoValidPasswords)).to.equal(2);
        expect(countValidPasswordsAtSledRentalPlace(inputDataWithThreeValidPasswords)).to.equal(3);
    });
});

describe('countValidPasswordsAtOfficialTobogganCorporate', () => {
    const inputDataWithNoValidPasswords = `
1-3 a: abade
1-3 b: cdefg
2-9 c: ccccccccc
`;
    const inputDataWithOneValidPasswords = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`;
    const inputDataWithTwoValidPasswords = `
1-3 a: abcde
1-3 b: bdefg
2-9 c: ccccccccc
`;
    const inputDataWithThreeValidPasswords = `
1-3 a: abcde
1-3 b: bdefg
2-9 c: cccccccca
`;

    it('should return the number of passwords that are valid', () => {
        expect(countValidPasswordsAtOfficialTobogganCorporate(inputDataWithNoValidPasswords)).to.equal(0);
        expect(countValidPasswordsAtOfficialTobogganCorporate(inputDataWithOneValidPasswords)).to.equal(1);
        expect(countValidPasswordsAtOfficialTobogganCorporate(inputDataWithTwoValidPasswords)).to.equal(2);
        expect(countValidPasswordsAtOfficialTobogganCorporate(inputDataWithThreeValidPasswords)).to.equal(3);
    });
});