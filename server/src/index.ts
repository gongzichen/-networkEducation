import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpException from './exceptions/HttpException' // http异常处理
import cors from 'cors'  // 跨域
import morgan from 'morgan' // 打印http请求日记
import helmet from 'helmet' // 安全
import errorMiddleware from './middlewares/errorMiddleware'
import * as userController from './controller/user'
import * as sliderContorller from './controller/slider'
import "dotenv/config"
import multer from 'multer' // 断点上传
import path from 'path'
import { Slider } from './models'

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
app.get('/slider/list', sliderContorller.list)
app.post('/user/register', userController.register)
app.post('/user/login', userController.login)
app.post('/user/uploadAvatar', upload.single('avatar'), userController.uploadAvatar)
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const error: HttpException = new HttpException(404, 'Route not found')
	next(error)
})

app.use(errorMiddleware)


const PORT: number = (process.env.PORT && parseInt(process.env.PORT)) || 8000;
(async function () {
  mongoose.set("useNewUrlParser", true); /* 使用新的url解析 */
  mongoose.set("useUnifiedTopology", true); 	/* 新的服务器发现和监事引擎 */
  await mongoose.connect(`mongodb://localhost/cgong`);
  await createSlider()
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
})();

async function createSlider () {
  const sliders = await Slider.find()
  if (sliders.length === 0) {
    const sliders:any = [
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600403551093&di=b541475d2fb737c1ad617acbd429a462&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg'
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600403551093&di=b0ec5c34de2f059d72cfbd3fe53240fa&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F56%2F12%2F01300000164151121576126282411.jpg'
      }
    ]
  }
  Slider.create(sliders)
}