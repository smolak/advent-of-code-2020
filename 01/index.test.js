import { calculateTwoNumbersSum, calculateThreeNumbersSum } from "./index";
import { expect } from 'chai';

const inputData = `
1721
979
366
299
675
1456    
`;

describe('calculateTwoNumbersSum', () => {
    it('should return multiplication result of two numbers that sum up to 2020', () => {
        expect(calculateTwoNumbersSum(inputData)).to.equal(514579);
    });
});

describe('calculateThreeNumbersSum', () => {
    it('should return multiplication result of three numbers that sum up to 2020', () => {
        expect(calculateThreeNumbersSum(inputData)).to.equal(241861950);
    });
});
