import React, { PropsWithChildren, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Row,
  Col,
  Badge,
  Modal,
} from "antd";
import { CombinedState } from "@/store/reducers";
import NavHeader from "@/components/NavHeader";
import Lesson from "../../../typings/Lesson";
import { StaticContext } from "react-router";
import actions from "@/store/actions/cart";
import { CartItem } from "../../../typings/cart";
import { getNumber } from "@/utils";
import Item from "antd/lib/list/Item";

interface Params {
  id: string;
}

type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteProps & StateProps & DispatchProps>;

function Cart(props: Props) {
  let [settleVisible, setSettleVisible] = useState(false);
  const confirmSettle = () => {
    setSettleVisible(true);
  };
  const handleok = () => {
    setSettleVisible(false);
    props.settle();
  };
  const handleCancel = () => {
    setSettleVisible(false);
  };
  // const columns = [
  // 	{
  // 		title: '商品',
  // 		dataIndex: 'lesson',
  // 		render: (val: Lesson, row: CartItem) => (
  // 			<>
  // 				<p>{val.title}</p>
  // 				<p>单价: {val.price}</p>
  // 			</>
  // 		)
  // 	},
  // 	{
  // 		title: '数量',
  // 		dataIndex: 'count',
  // 		render: (val: Number, row: CartItem) => (
  // 			<InputNumber
  // 			 	size="small"
  // 				min={1}
  // 				max={10}
  // 				value={val}
  // 				onChange={(value: any) => props.changeCartItemCount(row.lesson.id, value)}
  // 			/>
  // 		)
  // 	},
  // 	{
  // 		title: '操作',
  // 		render: (val: any, row: CartItem) => (
  // 			<Popconfirm
  // 				title="是否要删除商品?"
  // 				onConfirm={() => props.removeCartItem(row.lesson.id)}
  // 				okText="是"
  // 				cancelText="否"
  // 			>
  // 				<Button size="small" type="primary">删除<Button/>
  // 			</Popconfirm>
  // 		)
  // 	}
  // ];
  return <div>11</div>;
}

let mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actions)(Cart);
