import { getFileContents, toLines } from "../helpers";
import { isNil, negate, uniq } from 'lodash';

const NO_BAGS_STRING = 'no other bags';
const PARENT_CHILDREN_SEPARATOR = ' bags contain ';

const isFilled = (description) => !description.includes(NO_BAGS_STRING);
const extractOuterBagColor = (description) => description.split(PARENT_CHILDREN_SEPARATOR)[0];
const extractInnerBagColor = (innerDescription) => innerDescription.match(/\d\s(.*)\sbag/)[1];
const extractInnerBagColors = (description) => {
    const innerString = description.split(' bags contain ')[1];

    return innerString.split(', ').map(extractInnerBagColor).filter(negate(isNil));
}
const createBagsContainingBagsMapper = (descriptions) => {
    return descriptions.reduce((mapper, description) => {
        const outerBagColor = extractOuterBagColor(description);
        const innerBagColors = extractInnerBagColors(description);

        return {
            ...mapper,
            [outerBagColor]: innerBagColors
        }
    }, {});
};

export const countBagColorsContainingAtLeastOneShinyGoldBag = (inputData) => {
    const descriptions = toLines(inputData);
    const filledBagsDescriptions = descriptions.filter(isFilled);
    const mapper = createBagsContainingBagsMapper(filledBagsDescriptions);
    const entries = Object.entries(mapper);

    const findParents = (results, bagColor) => {
        const parents = entries.filter(([_, childColors]) => childColors.includes(bagColor)).map(([parentColor]) => parentColor);

        if (parents.length > 0) {
            return parents.flatMap((parentColor) => findParents([...results, parentColor], parentColor));
        }

        return results;
    }

    return uniq(findParents([], 'shiny gold')).length;
}

const inputData = getFileContents(__dirname, 'inputData.txt');

console.log('[D7T1]: Number of bags containing at least one shiny golden bag:', countBagColorsContainingAtLeastOneShinyGoldBag(inputData));