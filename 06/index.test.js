import { sumYesAnswers } from "./index";
import { expect } from 'chai';

const inputData = `
abc

a
b
c

ab
ac

a
a
a
a

b
`;

describe('sumYesAnswers', () => {
    it('should return sum of unique, by group, "yes" answers', () => {
        expect(sumYesAnswers(inputData)).to.equal(11);
    });
});