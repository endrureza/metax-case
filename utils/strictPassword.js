const strictPassword = (str) => {
  let reg;

  const passReq = {
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    isValid: false,
  };

  reg = /^[A-Za-z\d@$!%*?&]{8,}$/;

  if (reg.test(str)) {
    passReq.length = true;
  }

  reg = /^(?=.*[a-z])/;

  if (reg.test(str)) {
    passReq.lower = true;
  }

  reg = /^(?=.*[A-Z])/;

  if (reg.test(str)) {
    passReq.upper = true;
  }

  reg = /^(?=.*\d)/;

  if (reg.test(str)) {
    passReq.number = true;
  }

  reg = /^(?=.*[@$!%*?&])/;

  if (reg.test(str)) {
    passReq.special = true;
  }

  return {
    length: passReq.length,
    upper: passReq.upper,
    lower: passReq.lower,
    number: passReq.number,
    special: passReq.special,
    isValid:
      passReq.length &&
      passReq.upper &&
      passReq.lower &&
      passReq.number &&
      passReq.special,
  };
};

export default strictPassword;
