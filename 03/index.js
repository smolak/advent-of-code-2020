import { getFileContents, toLines } from "../helpers";

const toGrid = (rawData) => toLines(rawData).map((line) => line.split(''));

const TREE = '#';
const readPosition = ({ row, col }, map) => map[row][col];
const isTree = (field) => field === TREE;

const move = ({ row, col }, movementSpeed, numberOfColumns) => ({
    row: row + movementSpeed.down,
    col: (col + movementSpeed.right) % numberOfColumns
});

export const countEncounteredTrees = (rawData, movementSpeed) => {
    const grid = toGrid(rawData);
    const numberOfColumns = grid[0].length;
    const numberOfRows = grid.length;

    const fieldsEncountered = [];
    let currentPosition = { row: 0, col: 0 };

    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
        fieldsEncountered.push(readPosition(currentPosition, grid));
        currentPosition = move(currentPosition, movementSpeed, numberOfColumns);
    }

    return fieldsEncountered.filter(isTree).length;
};

console.log('[D3T1] Encountered trees:', countEncounteredTrees(getFileContents(__dirname, './inputData.txt'), { right: 3, down: 1 }));