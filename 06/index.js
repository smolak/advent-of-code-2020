import { getFileContents } from "../helpers";
import { intersection, uniq } from 'lodash';

const toGroups = (inputData) => inputData.trim().split('\n\n');
const toGroupAnswers = (inputData) => toGroups(inputData)
    .map((group) => group.replaceAll('\n', '').split(''));
const toUsersInGroupsAnswers = (inputData) => toGroups(inputData)
    .map((group) => group.split('\n').map((answers) => answers.split('')));
const toNumberOfAnswers = (sum, answers) => sum + answers.length;

export const sumAllYesAnswers = (inputData) => toGroupAnswers(inputData)
    .map(uniq)
    .reduce(toNumberOfAnswers, 0);

export const sumAnswersEveryoneGave = (inputData) => toUsersInGroupsAnswers(inputData)
    .map((group) => intersection(...group))
    .reduce(toNumberOfAnswers, 0);

const inputData = getFileContents(__dirname, 'inputData.txt');

console.log('[D6T1] The sum of all "yes" answers:', sumAllYesAnswers(inputData));
console.log('[D6T2] The sum of "yes" answers everyone gave:', sumAnswersEveryoneGave(inputData));