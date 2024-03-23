const db = require("../../../models");

/**
 * @param {string} modelName
 * @param {string} field
 * @param {number} letterDigit
 * @param {object} moreConditions
 * @param {string} runningFormat
 * @param {string} letter
 * @returns newDocNo
 */
const generateDocumentNo = async (
  modelName,
  field,
  moreConditions = null,
  runningFormat = "000000",
  letter = "STD"
) => {
  let _condition = {
    limit: 1,
    order: [[field, "DESC"]],
  };
  if (moreConditions) {
    _condition = {
      ..._condition,
      ...moreConditions,
    };
  }

  const data = await db[modelName].findAll(_condition);
  let newDocNo = "";
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  if (data && data.length > 0) {
    const _docNo = data[0].dataValues[field];
    if (_docNo && _docNo.split("-").length > 1) {
      // const _letter = letterDigit > 0 ? _docNo.split('-')[0].substring(0, letterDigit) : '';
      let _runningNo = parseInt(_docNo.split("-")[1]) + 1;
      newDocNo = `${letter}${yy}${mm}-${paddingLeft(
        _runningNo,
        runningFormat
      )}`;
    }
  } else {
    newDocNo = `${letter}${yy}${mm}-${(runningFormat + 1).slice(
      -runningFormat.length
    )}`;
  }
  // console.log('newDocNo', newDocNo)
  return newDocNo;
};

const paddingLeft = (text, paddingValue) => {
  return String(paddingValue + text).slice(-paddingValue.length);
};

module.exports = { generateDocumentNo };
