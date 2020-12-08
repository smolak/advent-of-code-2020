import { decryptSeatInfo } from "./index";
import { expect } from 'chai';

describe('decryptSeatInfo', () => {
    it('should return Seat', () => {
        expect(decryptSeatInfo('BFFFBBFRRR')).to.deep.equal({ row: 70, column: 7});
        expect(decryptSeatInfo('FFFBBBFRRR')).to.deep.equal({ row: 14, column: 7});
        expect(decryptSeatInfo('BBFFBBFRLL')).to.deep.equal({ row: 102, column: 4});
    });
});