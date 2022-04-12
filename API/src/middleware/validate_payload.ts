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
      res.status(400).json({ message: "İstenilen alanları uygun şekilde doldurunuz." });
    }
  };
}
