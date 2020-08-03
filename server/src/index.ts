import express, {Express, Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import HttpException from './exceptions/HttpException'
import cors from 'cors'  // 跨域
import morgan from 'morgan' // 打印http请求日记
import helmet from 'helmet' // 安全
import errorMiddleware from './middlewares/errorMiddleware'
import * as userController from './controller/user'
import "dotenv/config";
import multer from 'multer' // 断点上传
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage })
const app: Express = express();

app.use(morgan('dev'));
app.use(cors()); // 跨域
app.use(helmet()); // 安全
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
	res.json({success: true, message: 'hello world'})
})

// app.get('/user/validate',userController.validate);
// app.post('/user/register', userController.regiser)


app.use(errorMiddleware);
(async function() {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useUnifiedTopology', true);
	await mongoose.connect("mongodb://localhost/mongoose");
	app.listen(PORT, ()=> {
		console.log(`Running on http://localhost:${PORT}`)
	})
})()