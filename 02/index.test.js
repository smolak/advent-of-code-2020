import { expect } from 'chai';
import { countValidPasswords } from './index';

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

describe('countValidPasswords', () => {
    it('should return the number of passwords that are valid', () => {
        expect(countValidPasswords(inputDataWithNoValidPasswords)).to.equal(0);
        expect(countValidPasswords(inputDataWithOneValidPasswords)).to.equal(1);
        expect(countValidPasswords(inputDataWithTwoValidPasswords)).to.equal(2);
        expect(countValidPasswords(inputDataWithThreeValidPasswords)).to.equal(3);
    });
});