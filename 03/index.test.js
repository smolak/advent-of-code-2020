import { countEncounteredTrees, calculateMultipleTripsResult } from './index';
import { expect } from 'chai';

describe('countEncounteredTrees', () => {
    const inputData = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

    it('should return a number of trees we encounter along the way while moving 3 right, 1 down', () => {
        const movementSpeed = {
            right: 3,
            down: 1
        };

        expect(countEncounteredTrees(inputData, movementSpeed)).to.equal(7);
    });

    describe('when you decide to visit the woods multiple times with different move speeds each time', () => {
        it('should return result of multiplication of number of trees you pass each time', () => {
            const trips = [
                { right: 1, down: 1 },
                { right: 3, down: 1 },
                { right: 5, down: 1 },
                { right: 7, down: 1 },
                { right: 1, down: 2 },
            ];

            expect(calculateMultipleTripsResult(inputData, trips)).to.equal(336);
        });
    });
});