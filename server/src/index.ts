import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpException from './exceptions/HttpException' // http异常处理
import cors from 'cors'  // 跨域
import morgan from 'morgan' // 打印http请求日记
import helmet from 'helmet' // 安全
import errorMiddleware from './middlewares/errorMiddleware'
import * as userController from './controller/user'
import "dotenv/config"
import multer from 'multer' // 断点上传
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})


const upload = multer({ storage })
const app = express()

app.use(morgan('dev'))
app.use(cors()) // 跨域
app.use(helmet()) // 安全
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.get('/', (_req: Request, res: Response) => {
	res.json({success: true, message: 'hello world'})
})

app.get('/user/validate', userController.validate)
app.post('/user/register', userController.register)
app.post('/user/login', userController.login)
app.post('/user/uploadAvatar', upload.single('avatar'), userController.uploadAvatar)
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const error: HttpException = new HttpException(404, 'Route not found')
	next(error)
})

app.use(errorMiddleware)

const PORT: number = (process.env.PORT && parseInt(process.env.PORT)) || 8000;

let connect = mongoose.createConnection( 'mongodb://localhost/27017', {
	/* 使用新的url解析 */
	'useNewUrlParser': true,
	/* 新的服务器发现和监事引擎 */
	'useUnifiedTopology': true
})

connect.on('open', () => {
	console.log('mongodb连接成功')
})

connect.on('error', () => {
	console.log('mongodb连接失败')
})

app.listen(PORT, ()=> {
	console.log(`Running on http://localhost:${PORT}`)
})