import { sumAllYesAnswers, sumAnswersEveryoneGave } from "./index";
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
        expect(sumAllYesAnswers(inputData)).to.equal(11);
    });
});

describe('sumAnswersEveryoneGave', () => {
    it('should return the number of questions to which everyone answered "yes"', () => {
        expect(sumAnswersEveryoneGave(inputData)).to.equal(6);
    });
});