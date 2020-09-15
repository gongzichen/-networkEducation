import React, {useState, CSSProperties} from 'react'
import logo from '@/assets/images/logo.png' // ts默认不支持png格式。 需要添加images.d.ts声明支持加载png
import classnames from 'classnames';
import {Transition} from 'react-transition-group' // react 过度动画
import './index.less'
// import { getInputClassName } from 'antd/lib/input/Input'
import { BarsOutlined } from '@ant-design/icons'
const duration = 1000

// 默认样式
const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
}

// css类型
interface TransitionStyles {
	entering: CSSProperties; // 进入时样式
	entered: CSSProperties; // 进入成功时样式
	exiting: CSSProperties; // 退出时样式
	exited: CSSProperties; // 退出成功
}

const TransitionStyles: TransitionStyles = {
	entering: {opacity: 1 }, // 不透明1
	entered: {opacity: 1}, // 不透明1
	exiting: {opacity: 0}, // 不透明0
	exited: {opacity: 0}, // 不透明为0
}

interface Props {
	currentCategory: String; // 当前选中的分类。此数据会放在redux仓库
	setCurrentCategory: (currentCategory: string) => any; // 改变仓库中的分类
}

function HomeHeader(props: Props) {
	let [isMenuVisible, setIsMenuVisible] = useState(false); // 设定
	// 设置当前分，把当前选中的分类传递给redux仓库
	const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
		let target: HTMLUListElement = event.target as HTMLUListElement 
		let category = target.dataset.category; // 获取用户选择的分类名称
		props.setCurrentCategory(category) // 设置分类名称
		setIsMenuVisible(false) // 关闭分类选择层
	}
	
	return (
		<header className="home-header">
			<div className="logo-header">
				<img src={logo} />
				<BarsOutlined className="right-icon" onClick={() => setIsMenuVisible(!isMenuVisible)} />
			</div>
			<Transition in={isMenuVisible} timeout={duration}>
				{
					(state: keyof TransitionStyles) => (
						<ul
							className="category"
							onClick={setCurrentCategory}
						 	style={{
                                ...defaultStyle,
                                ...TransitionStyles[state]
                            }}
						>
							 <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
							<li data-category="react" className={classnames({active: props.currentCategory === 'react'})}>react课程</li>
							<li data-category="vue" className={classnames({active: props.currentCategory === 'vue'})}>vue课程</li>
						</ul>
					)
				}
			</Transition>
		</header>
	)
}

export default HomeHeader;