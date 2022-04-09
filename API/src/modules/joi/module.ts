import Joi from "joi";

export const validate = async (rules: {}, parameters: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bodyRules = Joi.object(rules);
      await bodyRules.validateAsync(parameters, {
        //* CUSTOM ERROR MESSAGES
        //   messages: {
        //     "string.empty": "Zorunlu alanlar boş bırakılamaz.",
        //     "string.min": "Zorunlu alanlar en az 4 karakterden oluşmalı.",
        //   },
      });
      return resolve("OK");
    } catch (error) {
      return reject(error);
    }
  });
};
