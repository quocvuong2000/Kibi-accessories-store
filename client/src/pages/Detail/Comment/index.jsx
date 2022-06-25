import { Button, Form, Input } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import s from "./styles.module.scss";
import InputEmoji from "react-input-emoji";
import { Rate } from "antd";

const Comment = () => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
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
              <InputEmoji
                cleanOnEnter
                placeholder="Type a comment..."
                onChange={(e) => {
                  setContent(e);
                }}
              />
            </Form.Item>
            <Rate
              onChange={setRating}
              defaultValue={rating}
              character={({ index }) => customIcons[index + 1]}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
