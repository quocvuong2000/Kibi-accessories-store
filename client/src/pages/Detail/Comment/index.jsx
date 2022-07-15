import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { message, Rate } from "antd";
import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import {
  checkLike,
  createComment,
  deleteComment,
  getCommentByProduct,
  likeComment,
} from "../../../api/Comment";
import s from "./styles.module.scss";
import avatarPlaceholder from "../../../assets/user_avatar.jpg";
import { ThumbsUp } from "phosphor-react";
const Comment = (props) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [listComment, setListComment] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [reload2, setReload2] = useState(false);
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
  }, [page, props.data.product._id, reload, reload2]);

  useEffect(() => {
    getCommentByProduct(props.data.product._id, 1).then((res) => {
      setListComment(res.data.comments);
    });
  }, [reload2, reload, props.data.product._id]);

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
      if (res) {
        message.success("Comment successs");
      }
      setReload(!reload);
    });
  };

  const like = (id, username) => {
    likeComment(id, username).then((res) => {
      if (res.status === 200) {
        setReload2(!reload2);
      }
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
        const a = item.userLiked.some(
          (value) => value.username === user.currentUser?.username
        );
        return (
          <div className={s.box_rs_comment} key={index}>
            <div className={s.avatar}>
              <img
                src={item?.avatar ? item?.avatar : avatarPlaceholder}
                loading="lazy"
                alt=""
              />
            </div>
            <div className={s.frame_comment}>
              <p className={s.fullname}>{item?.name}</p>
              <Rate value={item?.rating} allowHalf disabled />
              <p className={s.comment}>{item?.comment}</p>
              <div className={s.like_delete}>
                {a === true ? (
                  <ThumbsUp
                    style={{ cursor: "pointer" }}
                    size={20}
                    weight="bold"
                    color="#d84727"
                    onClick={() => {
                      like(item?._id, user.currentUser?.username);
                      setReload2(!reload2);
                    }}
                  />
                ) : (
                  <ThumbsUp
                    style={{ cursor: "pointer" }}
                    size={20}
                    weight="bold"
                    color="#999"
                    onClick={() => {
                      like(item?._id, user.currentUser?.username);
                      setReload2(!reload2);
                    }}
                  />
                )}

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
