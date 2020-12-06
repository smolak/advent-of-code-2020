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

    it('should return a number of trees we encounter along the way', () => {
        expect(countEncounteredTrees(inputData)).to.equal(7);
    });
});