import React, { useState, useEffect, PropsWithChildren } from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import NavHeader from "@/components/NavHeader";
import { getLesson } from "@/api/home";
import { RouteComponentProps } from "react-router";
import Lesson from "../../../typings/Lesson";
import { StaticContext } from "react-router";
import { LessonResult } from "../../../typings/Lesson";
import actions from "@/store/actions/cart";
import { CombinedState } from "@/store/reducers";
import "./index.less";
const { Meta } = Card;

interface Params {
  id: string;
}

type RouteProps = RouteComponentProps<Params, StaticContext>;
type StateProps = ReturnType<typeof mapStateProps>;
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteProps & StateProps & DispatchProps>;

function Detail(props: Props) {
  let [lesson, setLesson] = useState<Lesson>({} as Lesson);
  useEffect(() => {
    (async () => {
      let lesson: Lesson = props.loaction.state;
      if (!lesson) {
        let id = props.match.params.id;
        let result: LessonResult = await getLesson<LessonResult>(id);
        if (result.success) lesson = result.date;
      }
      setLesson(lesson);
    })();
  }, []);

  const addCartItem = (lesson: Lesson) => {
    let video: HTMLVideoElement = document.querySelector("#lesson-video");
    let cart: HTMLSpanElement = document.querySelector(
      ".action.anticon-shopping-cart"
    );
    let cloneVideo: HTMLVideoElement = video.cloneNode(
      true
    ) as HTMLVideoElement;
    let videoWith = video.offsetWidth;
    let videoHeight = video.offsetHeight;

    let cartWith = cart.offsetWidth;
    let cartHeight = cart.offsetHeight;

    let videoLeft = cart.getBoundingClientRect().left;
    let videoTop = cart.getBoundingClientRect().top;

    let cartRight = cart.getBoundingClientRect().right;
    let cartBottom = cart.getBoundingClientRect().bottom;

    cloneVideo.style.cssText = `
			z-index: 1000;
			opactiy: 0.8;
			position: absolute:
			width: ${videoWith}px;
			height: ${videoHeight}px;
			top: ${videoTop}px;
			transition: all 2s ease-in-out
		`;

    document.body.appendChild(cloneVideo);
    setTimeout(function () {
      cloneVideo.style.left = cartRight - cartWith / 2 + "px";
      cloneVideo.style.right = cartBottom - cartHeight / 2 + "px";
      cloneVideo.style.width = `0px`;
      cloneVideo.style.height = `0px`;
      cloneVideo.style.opacity = "50";
    }, 0);

    props.addCartItem(lesson);
  };
  return (
    <>
      <NavHeader history={props.history}>课程详情</NavHeader>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<img id="lesson-video" src={lesson.poster} />}
      >
        <Meta description title={lesson.title}>
          <>
            <p>价格: {lesson.price}元</p>
            <p>
              <Button className="add-cart" onClick={() => addCartItem(lesson)}>
                加入购物车
              </Button>
            </p>
          </>
        </Meta>
      </Card>
    </>
  );
}

let mapStateToProps = (state: CombinedState): CombinedState => state;

export default connect(mapStateToProps, actions)(Detail);
