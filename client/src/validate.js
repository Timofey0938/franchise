export const checkOgrn = value => {
  return isOGRN(value) || isOGRNIP(value);
}

const isOGRN = value => {
  if (value) {
    if (value.length === 13) {
      const num12 = Math.floor((Number(value) / 10) % 11);
      const dgt13 = num12 === 10 ? 0 : num12;
      return parseInt(value[12], 10) === dgt13;
    }
  }

  return false;
};

const isOGRNIP = value => {
  if (value) {
    if (value.length === 15) {
      const num14 = Math.floor((Number(value) / 10) % 13);
      const dgt15 = num14 % 10;
      return parseInt(value[14], 10) === dgt15;
    }
  }
  return false;
};

export const checkInn = value => {
  if (value?.length > 0) {
    const getN = index => parseInt(value[index], 10);
    if (value.length === 10) {
      const dgt10 =
        ((2 * getN(0) +
          4 * getN(1) +
          10 * getN(2) +
          3 * getN(3) +
          5 * getN(4) +
          9 * getN(5) +
          4 * getN(6) +
          6 * getN(7) +
          8 * getN(8)) %
          11) %
        10;

      return getN(9) === dgt10;
    }
  }

  return false;
};