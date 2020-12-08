import { getFileContents } from "../helpers";

const toGroups = (inputData) => inputData.trim().split('\n\n').map((group) => group.replaceAll('\n', ''));
const unique = (value, index, array) => array.indexOf(value) === index;

export const sumYesAnswers = (inputData) => toGroups(inputData)
        .map((answers) => answers.split(''))
        .map((answers) => answers.filter(unique))
        .reduce((sum, answers) => sum + answers.length, 0);

const inputData = getFileContents(__dirname, 'inputData.txt');

console.log('[D6T1] The sum of "yes" answers:', sumYesAnswers(inputData));