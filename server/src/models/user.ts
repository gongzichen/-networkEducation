import mongoose, {Schema, Model, Document, HookNextFunction } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../typings/jwt'
import bcrypt from "bcryptjs"

export interface IUserDocument extends Document {
	username: string,
	password: string,
	email: string,
	avatar: string,
	generateToken: () => string,
	_doc: IUserDocument
}

const UserSchema: Schema<IUserDocument> = new Schema({
	username: {
		type: String,
		required: [true, '用户名不能为空'],
		minLength: [6, '最小长度不能少于6位'],
		maxLength: [12, '最大长度不能大于12位']
	},
	password: String,
	avatar: String,
	email: {
		type: String,
		validate: {
			validator: validator.isEmail
		},
		trim: true
	}
}, {
	timestamps: true, toJSON: {
		transform: function(_dox: any, result: any) {
			result.id = result._id;
			delete result._id;
			delete result.__v;
			delete result.password;
			delete result.createdAt;
			delete result.updatedAt;
			return result
		}
	}
})


UserSchema.methods.generateToken = function (): string {
	let payload: UserPayload = ({id: this._id})
	return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h'})
}


UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
	if (!this.isModified('password')) {
		return next()
	}
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next()
	} catch (error) {
		next(error)
	}
})

UserSchema.static('login', async function (this: any, username: string, password: string): Promise<IUserDocument | null> {
	let user: IUserDocument | null = await this.model('User').findOne({ username })
	if (user) {
		const matched = await bcrype.compare(password, user.password);
		if (matched) {
			return user;
		} else {
			return null
		}
	}
	return user;
})

interface IUserModel<T extends Document> extends Model<T> {
	login: (username: string, password: string) => IUserDocument | null
}


exports const User: IUsermODEL<IUserDocument> = mongoose.model<IUserDocument, IUserModel<IUserDocument>>('user', UserSchema)