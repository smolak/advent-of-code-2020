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
    const maxStepsToMake = grid.length / movementSpeed.down;

    const fieldsEncountered = [];
    let currentPosition = { row: 0, col: 0 };

    for (let rowNumber = 0; rowNumber < maxStepsToMake; rowNumber++) {
        fieldsEncountered.push(readPosition(currentPosition, grid));
        currentPosition = move(currentPosition, movementSpeed, numberOfColumns);
    }

    return fieldsEncountered.filter(isTree).length;
};

export const calculateTreesEncounteredOnMultipleTrips = (rawData, trips) => {
    return trips.reduce((result, movementSpeed) => {
        return result * countEncounteredTrees(rawData, movementSpeed);
    }, 1);
};

const inputData = getFileContents(__dirname, './inputData.txt');
const trips = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

console.log('[D3T1] Encountered trees:', countEncounteredTrees(inputData, { right: 3, down: 1 }));
console.log('[D3T2] Encountered trees in multiple trips:', calculateTreesEncounteredOnMultipleTrips(inputData, trips));