import { validate } from "../modules/joi/module";
import clientDTO from "../modules/dto/client_dto";
import Joi from "joi";

export function verify(rules: {}) {
  return async function (req: any, res: any, next: any) {
    try {
      const reqBody = new clientDTO(req.body);
      const keys = Object.keys(rules);
      const parameters = keys.reduce((i, j) => ({ ...i, [j]: reqBody[j] }), {});

      const bodyRules = Joi.object(rules);
      await bodyRules.validateAsync(parameters, {
        //* CUSTOM ERROR MESSAGES
        //   messages: {
        //     "string.empty": "Zorunlu alanlar boş bırakılamaz.",
        //     "string.min": "Zorunlu alanlar en az 4 karakterden oluşmalı.",
        //   },
      });
      next();
    } catch (error) {
      res.status(500).json({ message: "İstenilen alanları uygun şekilde doldurunuz." });
    }
  };
}

/* rules: Object
like: 
 {
   id: Joi.string().min(4).max(20).required(),
   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(25).required(),
 }

*/
