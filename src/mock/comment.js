import {EMOJIS, NAMES, LINES} from "../const.js";
import {getRandomInteger, generateDate} from "../utils.js";

const generateComment = () => {
  const text = LINES[getRandomInteger(0, LINES.length - 1)];
  const emoji = EMOJIS[getRandomInteger(0, EMOJIS.length - 1)];

  return {
    emoji,
    date: generateDate(new Date(2020, 0, 1), new Date()),
    author: NAMES[getRandomInteger(0, NAMES.length - 1)],
    text
  };
};

export const generateComments = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateComment);

  return comments;
};
