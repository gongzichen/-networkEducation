import React, { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CombinedState } from "../../store/reducers";
import { ProfilState } from "../../store/reducers/profile";
import actions from "../../store/actions/profile";
import LOGIN_TYPES from "../../../typings/login-types";
import { RouteComponentProps } from "react-router";
import { Descriptions, Button, Alert, message, Upload  } from "antd";
import NavHeader from "@/components/NavHeader";
import { AxiosError } from "axios";
import "./index.less";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
interface Params {}
type RouteProps = RouteComponentProps<Params>
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>

function Profile(props: Props) {
    let [loading, setLoading] = useState(false);
    useEffect(() => {
      props.validate().catch((error: AxiosError) => message.error(error.message))
    }, [])
    const handleChange = (info: any) => {
      if (info.file.status === 'upload') {
        setLoading(true)
      } else if (info.file.status === 'done') {
        let { success, data, message } = info.file.response
        if(success) {
          setLoading(false)
          props.changeAvatar(data)
        } else {
          message.error(message)
        }
      }
    }

    let content 
    if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
      content = null
    } else if (props.loginState === LOGIN_TYPES.LOGINED) {
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <UploadOutlined />}
          <div className="ant-upload-text">上传</div>
        </div>
      )
      content =(
        <div className="use-info">
          <Descriptions title="当前登入用户">
            <Descriptions.Item label="用户">{props.user.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>

            <Descriptions.Item label="头像">
              <Upload name="avatar" 
                listType="picture-card"
                showUploadList={false}
                action="http://localhost:6699/user/uploadAvatar"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                className="avatar-uploader">
                  {
                    props.user.avatar ? 
                      (<img src={props.user.avatar} alt="avatar" style={{ width: "100%"}}></img>) : 
                      (uploadButton)
                  }
              </Upload>
            </Descriptions.Item>
          </Descriptions>
          <Button type={"primary"} onClick={async () => {
            await props.logout();
            props.history.push('/login')
          }}>退出登入</Button>
        </div>
      )
    } else {
      content = (
        <>
          <Alert
            type="warning"
            message="当前未登录"
            description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
          />
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Button onClick={() => props.history.push("/login")}>
              登录
            </Button>
            <Button
              style={{ marginLeft: "50px" }}
              onClick={() => props.history.push("/register")}
            >
              注册
            </Button>
        </div>
        </>
      )
    }
    return (
      <section>
        <NavHeader history={props.history}>
          个人中心
        </NavHeader>
        {content}
      </section>
    )
}



let mapStateToProps = (initialState: CombinedState): ProfilState => initialState.profile;

export default connect(mapStateToProps, actions)(Profile);

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (isJpgOrPng) {
    message.error("你只能上传JPG/PNG 文件!");
  }
  const isLessThan2M =  file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
      message.error("图片必须小于2MB!");
  }
  return isJpgOrPng && isLessThan2M;
}