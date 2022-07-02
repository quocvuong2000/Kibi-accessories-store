import { Button, Form, Input, message } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import InputEmoji from "react-input-emoji";
import { Rate } from "antd";
import {
  createComment,
  deleteComment,
  getCommentByProduct,
} from "../../../api/Comment";
import { useSelector } from "react-redux";

const Comment = (props) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [listComment, setListComment] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const user = useSelector((state) => state.user);
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  useEffect(() => {
    getCommentByProduct(props.data.product._id, page).then((res) => {
      setTotalPages(res.data.totalPages);
      setListComment((listComment) => [...listComment, ...res.data.comments]);
    });
  }, [page]);

  useEffect(() => {
    getCommentByProduct(props.data.product._id, 1).then((res) => {
      console.log(res);
      console.log(listComment);
      setListComment(res.data.comments);
    });
  }, [reload]);

  const handleComment = () => {
    createComment(
      user.currentUser.username,
      props.data.product._id,
      content,
      rating
    ).then((res) => {
      console.log(res);
      if (res) {
        message.success("Comment successs");
      }
      setReload(!reload);
    });
  };

  const handleDeleteComment = (id) => {
    deleteComment(id).then((res) => {
      if (res.status === 200) {
        message.success("Delete Success");
      }
      setReload(!reload);
    });
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
          <InputEmoji
            onEnter={() => {
              handleComment();
              setContent("");
            }}
            cleanOnEnter
            placeholder="Type a comment..."
            onChange={(e) => {
              setContent(e);
            }}
          />

          <Rate
            onChange={setRating}
            defaultValue={rating}
            allowHalf
            character={({ index }) => customIcons[index + 1]}
          />
        </div>
      </div>

      {listComment?.map((item, index) => {
        return (
          <div className={s.box_rs_comment} key={index}>
            <div className={s.avatar}>
              <img
                src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/117913220_1830938403726260_3219453326340367531_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Z4Ox8sBTvdEAX9up7gs&tn=LMYK3ndhwOI69WET&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT99BPtz__aOWR-55OqN8v-TiZy17Cq78BRd6nhpqcRKLA&oe=62D890C5"
                alt=""
              />
            </div>
            <div className={s.frame_comment}>
              <p className={s.fullname}>{item.username}</p>
              <Rate defaultValue={item?.rating} allowHalf />
              <p className={s.comment}>{item?.comment}</p>
              {item.username === user.currentUser?.username ? (
                <p
                  className={s.delete}
                  onClick={() => handleDeleteComment(item._id)}
                >
                  Delete
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}

      {page < totalPages && (
        <div
          className={s.see_more}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          See more comments
        </div>
      )}
    </div>
  );
};

export default Comment;
