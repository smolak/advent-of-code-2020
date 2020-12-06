import { countEncounteredTrees } from './index';
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
});