const robots = require( "./data/bots.js");

const idHelper = {
  isValid: function (id, minlength, maxlength, radix) {
    let range = "",
      idPattern;
    if (radix < 2 || radix > 36) {
      throw new RangeError(
        "radix must be an integer at least 2 and no greater than 36"
      );
    } else if (radix <= 10) {
      range = "0-" + String(radix - 1);
    } else {
      range = "0-9a-" + (radix - 1).toString(radix);
    }
    idPattern = new RegExp(
      "^[" + range + "]{" + minlength + "," + maxlength + "}$"
    );
    return id && idPattern.test(id.toLowerCase());
  },
  random: function (length, radix) {
    let id = "";
    for (let i = length; i > 0; i--) {
      id = id + Math.floor(Math.random() * radix).toString(radix);
    }
    return id;
  },
};

function replaceParts(id, botString, parts, x, y) {
  const lines = botString.split("\n");
  const newPart = parts[id];
  lines[y] =
    lines[y].slice(0, x) + newPart + lines[y].slice(x + newPart.length);
  return lines.join("\n");
}

function botSplit(botString) {
  const splitBot = [];
  splitBot[0] = botString.split("\n").slice(0, 3).join("\n") + "\n";
  splitBot[1] = botString.split("\n").slice(3, 5).join("\n") + "\n";
  splitBot[2] = botString.split("\n").slice(5, 7).join("\n");
  return splitBot;
}

/**
 *
 * @param {number?} id An optional id of a bot
 * @returns {string} An ascii robot
 */
function bot(id) {
  const botIdDigits = idHelper.isValid(id, 3, 5, 16)
    ? id.split("")
    : idHelper.random(5, 16).split("");
  let botString =
    botSplit(robots.templates[botIdDigits[botIdDigits.length - 3]])[0] +
    botSplit(robots.templates[botIdDigits[botIdDigits.length - 2]])[1] +
    botSplit(robots.templates[botIdDigits[botIdDigits.length - 1]])[2];
  if (botIdDigits.length >= 4) {
    botString = replaceParts(
      botIdDigits[botIdDigits.length - 4],
      botString,
      robots.spareParts.eyes,
      6,
      1
    );
  }
  if (botIdDigits.length >= 5) {
    botString = replaceParts(
      botIdDigits[botIdDigits.length - 5],
      botString,
      robots.spareParts.mouths,
      7,
      2
    );
  }
  return botString;
}

module.exports = bot;
