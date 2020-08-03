
import HttpException from '../exceptions/HttpException'
import { Request, Response, NextFunction } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

const errorMiddleware = (
	error: HttpException,
	_request: Request,
	response: Response,
	_next: NextFunction
) => {
	response.status(error.status || INTERNAL_SERVER_ERROR).send({
		success: false,
		message: error.message,
		errors: error.errors
	})
}
export default errorMiddleware;



// import validator from "validator";
// import { IUserDocument } from "../models/user";

// export interface RegisterInput extends Partial<IUserDocument> {
//   confirmPassword?: string;
// }

// export interface RegisterInputValidateResult {
//   errors: RegisterInput;
//   valid: boolean;
// }

// export const validateRegisterInput = (
//   username: string,
//   password: string,
//   confirmPassword: string,
//   email: string
// ): RegisterInputValidateResult => {
//   let errors: RegisterInput = {};
//   if (username == undefined || validator.isEmpty(username)) {
//     errors.username = "用户名不能为空";
//   }
//   if (password == undefined || validator.isEmpty(password)) {
//     errors.password = "密码不能为空";
//   }
//   if (confirmPassword == undefined || validator.isEmpty(confirmPassword)) {
//     errors.password = "确认密码不能为空";
//   }
//   if (!validator.equals(password, confirmPassword)) {
//     errors.confirmPassword = "确认密码和密码不相等";
//   }
//   if (email == undefined || validator.isEmpty(password)) {
//     errors.email = "邮箱不能为空";
//   }
//   if (!validator.isEmail(email)) {
//     errors.email = "邮箱格式必须合法";
//   }
//   return { errors, valid: Object.keys(errors).length == 0 };
// };