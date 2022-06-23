import { Button, Form, Input } from "antd";
import React from "react";
import s from "./styles.module.scss";
import InputEmoji from "react-input-emoji";
const Comment = () => {
  return (
    <div className={s.container}>
      <p className={s.title}>Comments</p>
      <hr className={s.line} />
      <div className={s.box_comment}>
        <div className={s.avatar}>
          <img
            src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/117913220_1830938403726260_3219453326340367531_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Z4Ox8sBTvdEAX9up7gs&tn=LMYK3ndhwOI69WET&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT99BPtz__aOWR-55OqN8v-TiZy17Cq78BRd6nhpqcRKLA&oe=62D890C5"
            alt=""
          />
        </div>
        <div className={s.frame_comment}>
          <Form>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Fill comment...",
                },
              ]}
            >
              <InputEmoji cleanOnEnter placeholder="Type a message" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
