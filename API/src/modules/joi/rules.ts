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
  apartType: Joi.boolean().default(1),
  apartRoomCount: Joi.number().required(),
};

const customer = {
  customerName: Joi.string().min(4).max(20).required(),
  customerPhone: Joi.number().min(11).max(11).required(),
  identityNumber: Joi.number().min(11).max(11).required(),
  contractLength: Joi.number().required(),
  cost: Joi.number().required(),
};

const customerUpdate = {
  customerName: Joi.string().min(4).max(20).required(),
  customerPhone: Joi.number().min(11).max(11).required(),
  identityNumber: Joi.number().min(11).max(11).required(),
};

const item = {
  itemName: Joi.string().min(2).max(45).required(),
};

export default { login, pwd, apart, customer, customerUpdate, item };
