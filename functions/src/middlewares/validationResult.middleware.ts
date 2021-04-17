import { HttpError } from 'errors';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { MetaItem } from 'interfaces/ResponseBody.interface';

export const validationResultMiddleware: RequestHandler = (req, res, next) => {
    const result = validationResult.withDefaults({
        formatter: (err): MetaItem => {
            console.log(err)
            return {
                type: 'error',
                text: err.msg,
            };
        },
    })(req);

    if (result.isEmpty()) next();
    else
        next(
            new HttpError(
                result.array({ onlyFirstError: true })[0].text,
                400,
                result.mapped()
            )
        );
};
