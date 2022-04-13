const Joi = require("joi");

const login = {
  username: Joi.string().min(4).max(20).required(),
  pwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(25).required(),
};

const pwd = {
  pwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(25).required(),
};

const apart = {
  apartName: Joi.string().min(4).max(20).required(),
  apartType: Joi.boolean().truthy("1").falsy("0").default(1),
  apartRoomCount: Joi.number().required(),
};

const customer = {
  customerName: Joi.string().min(4).max(20).required(),
  customerPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  identityNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  contractLength: Joi.number().required(),
  cost: Joi.number().required(),
};

const customerUpdate = {
  customerName: Joi.string().min(4).max(20).required(),
  customerPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  identityNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
};

const item = {
  itemName: Joi.string().min(2).max(45).required(),
};

export default { login, pwd, apart, customer, customerUpdate, item };
