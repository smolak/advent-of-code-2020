import { getFileContents, toLines } from "../helpers";

const toGrid = (rawData) => toLines(rawData).map((line) => line.split(''));

const TREE = '#';
const readPosition = ({ row, col }, map) => map[row][col];
const isTree = (field) => field === TREE;
const rightMoveSteps = 3;
const downMoveSteps = 1;

const move = ({ row, col }, stepsToGoRight, stepsToGoDown, numberOfColumns) => ({
    row: row + stepsToGoDown,
    col: (col + stepsToGoRight) % numberOfColumns
});

export const countEncounteredTrees = (rawData) => {
    const grid = toGrid(rawData);
    const numberOfColumns = grid[0].length;
    const numberOfRows = grid.length;

    const fieldsEncountered = [];
    let currentPosition = { row: 0, col: 0 };

    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
        fieldsEncountered.push(readPosition(currentPosition, grid));
        currentPosition = move(currentPosition, rightMoveSteps, downMoveSteps, numberOfColumns);
    }

    return fieldsEncountered.filter(isTree).length;
};

console.log(countEncounteredTrees(getFileContents(__dirname, './inputData.txt')));