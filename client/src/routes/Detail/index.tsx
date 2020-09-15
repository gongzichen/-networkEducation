// import React, { PropsWithChildren } from 'react'

// import { connect } from 'react-redux'
// import { Card, Button} from 'antd'
// import NavHeader from '@/components/NavHeader'
// import { getLesson }  from '@api/home'
// import { RouteComponentProps } from 'react-router-dom'
// import Lesson from '@/typings/lesson'
// import { StaticContext } from 'react-router'
// import { LessonResult } from '@/typings/lesson'

// const { Meta } = Card

// interface Params {
// 	id: string
// }

// type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>

// type Props = RouteProps & {
// 	children?: any
// }

// function Detail(porps: Props) {
// 	let [lesson, setLesson] = useState<Lesson>({} as Lesson)
// 	useEffect(() => {
// 		(async () => {
// 			let lesson: Lesson = props.location.state;
// 			if (!lesson) {
// 				let id = props.match.params.id;
// 				let result: LessonResult = await getLesson<LessonResult>(id)
// 				if (result.success) lesson = result.data
// 			}
// 			setLesson(lesson)
// 		})()
// 	}, []);
// 	return (
// 		<>
// 			<NavHeader history={props.history}>课程详情</NavHeader>
// 			<Card
// 				hoverable
// 				style={{width: '100%'}}
// 				cover={<video src="{lesson.video"} controls autoPlay={false} ></video>
// 			>
// 	<Meta title={{lesson.title}} description={<p>价格: {lesson.price}</p>}></Meta>
// 			</Card>
// 		</>
// 	)
// }

// export default connect()(Detail);