import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { message, Rate } from "antd";
import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getCommentByProduct,
} from "../../../api/Comment";
import s from "./styles.module.scss";
import avatarPlaceholder from "../../../assets/user_avatar.jpg";
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
      //console.log(res);
      setTotalPages(res.data.totalPages);
      setListComment((listComment) => [...listComment, ...res.data.comments]);
    });
  }, [page, props.data.product._id]);

  useEffect(() => {
    getCommentByProduct(props.data.product._id, 1).then((res) => {
      //console.log(res);
      //console.log(listComment);
      setListComment(res.data.comments);
    });
    console.log("props.data.product:", props.data.product);
  }, [reload, props.data.product._id]);

  const handleComment = () => {
    createComment(
      user.currentUser.username,
      props.data.product._id,
      content,
      rating,
      user.currentUser.name,
      user.currentUser.avatar,
      props.data.product.images[0]
    ).then((res) => {
      //console.log(res);
      if (res) {
        message.success("Comment successs");
      }
      setReload(!reload);
    });
  };

  const handleDeleteComment = (id, pId) => {
    deleteComment(id, pId).then((res) => {
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
      {user.currentUser && (
        <div className={s.box_comment}>
          <div className={s.avatar}>
            <img
              src={
                user.currentUser?.avatar
                  ? user.currentUser?.avatar
                  : avatarPlaceholder
              }
              loading="lazy"
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
      )}

      {listComment?.map((item, index) => {
        return (
          <div className={s.box_rs_comment} key={index}>
            <div className={s.avatar}>
              <img src={item?.avatar ?item?.avatar :avatarPlaceholder} loading="lazy" alt="" />
            </div>
            <div className={s.frame_comment}>
              <p className={s.fullname}>{item?.name}</p>
              <Rate defaultValue={item?.rating} allowHalf />
              <p className={s.comment}>{item?.comment}</p>
              {item?.username === user.currentUser?.username ? (
                <p
                  className={s.delete}
                  onClick={() =>
                    handleDeleteComment(item._id, props.data.product._id)
                  }
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
