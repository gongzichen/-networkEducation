import { Request, Response, NextFunction } from 'express'
import { validateRegisterInput } from '../utils/validator'
import HttpException from '../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from "http-status-codes";
import { IUserDocument, User } from '../modles/user'
import { UserPayload } from '../typins/jwt'
export const validate = async (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers['authorization']

	if (authorization) {
		const token = authorization.split(' ')[1]
		if (token) {
			try {
				const payload: UserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
				const user = await User.findById(payload.id)
				if (user) {
					delete user.password;
					res.json({
						success: true,
						data: user
					})
				} else {
					next(new HttpException(UNAUTHORIZED, '用户不合法'))
				}
			} catch (error) {
				next(new HttpException(UNAUTHORIZED, 'token不合法'))
			}
		} else {
			next(new HttpException(UNAUTHORIZED, 'token未提供'))
		}
	} else {
		next(new HttpException(UNAUTHORIZED, 'authorization未提供'))
	}
}


export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {

	} catch (error) {
		next(error)
	}
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { username, password } = req.body
		let user = await User.login(username, password)
		if (user) {
			let token = user.generateToken()
			res.json({
				success: true,
				data: {
					token
				}
			})
		} else {
			throw new HttpException(UNAUTHORIZED, '登入失败')
		}
	} catch(error) {
		next(error)
	}
}


export const uploadAvatar = async (req: Request, res: Response, _next: NextFunction) => {
	let { userId } = req.body
	let domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`
	let avatar = `${domain}/upload/${req.file.filename}`
	await User,updateOne({_id: userId}, { avatar }) 
	res.send({success: true, data: avatar})
}