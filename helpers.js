import fs from 'fs';
import path from 'path';

export const getFileContents = (dirname, filename) => fs.readFileSync(path.resolve(dirname, filename), { encoding: 'utf8'});
export const toLines = (rawData) => rawData.trim().split('\n');