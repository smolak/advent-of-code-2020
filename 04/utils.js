const lastIndex = (list) => list.length === 0 ? 0 : list.length - 1;
const lastElement = (list) => list[lastIndex(list)];

export const appendLast = (list, data, separator) => {
    const last = lastElement(list);
    const index = lastIndex(list);

    list[index] = `${last}${separator}${data}`.trim();

    return list;
};