import { expect } from 'chai';
import { countValidPasswordsAtSledRentalPlace } from './index';

describe('countValidPasswords for old job at the sled rental place', () => {
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