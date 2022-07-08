const validateEmail = function (email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePass = function (pass) {
  // var re = /(?=.*[A-Z])(?=.*[0-9]){6,}/;
  return pass.length >= 6;
};

export { validateEmail, validatePass };
