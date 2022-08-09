import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { message, Rate } from "antd";
import { ThumbsUp } from "phosphor-react";
import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getCommentByProduct,
  likeComment,
} from "../../../api/Comment";
import avatarPlaceholder from "../../../assets/user_avatar.jpg";
import s from "./styles.module.scss";
const Comment = (props) => {
  const [rating, setRating] = useState(5);

  const [listComment, setListComment] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [reload2, setReload2] = useState(false);
  const listDenied = [
    "phú",
    "hàng giả",
    "hàng fake",
    "fake",
    "super fake",
    "nhái",
    "hàng lậu",
    "lậu",
    "hàng cấm",
    "đâm",
    "chém",
    "giết",
    "đánh",
    "khủng bố",
    "phản động",
    "chiến tranh",
    "bom",
    "mìn",
    "súng",
    "đạn",
    "thiểu năng",
    "ngu",
    "cút",
    "lol",
    "đụ má",
    "đụ mẹ",
    "chó",
    "đụ",
    "đm",
    "dm",
    "cc",
    "cl",
    "vcl",
    "óc chó",
    "ngu",
    "fuck",
    "fack",
    "bitch",
  ];
  // const [likeList, setLikeList] = useState([]);
  const user = useSelector((state) => state.user);
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  useEffect(() => {
    getCommentByProduct(props.data.product._id, 1).then((res) => {
      setTotalPages(res.data.totalPages);
      setListComment(res.data.comments);
      setPage(1);
      // console.log(res.data.comments);
    });
  }, [props.data.product._id, reload]);
  const hanldeNextComment = (page) => {
    getCommentByProduct(props.data.product._id, page).then((res) => {
      setTotalPages(res.data.totalPages);
      setListComment((listComment) => [...listComment, ...res.data.comments]);
    });
  };
  // useEffect(() => {
  //   getCommentByProduct(props.data.product._id, 1).then((res) => {
  //     setListComment(res.data.comments);
  //   });
  // }, [reload2, reload, props.data.product._id]);

  const handleComment = (e) => {
    var next = true;
    listDenied.forEach((el) => {
      if (e.includes(el)) {
        message.error("Không được chửi bậy");
        next = false;
      }
    });
    if (next === true) {
      createComment(
        user.currentUser.username,
        props.data.product._id,
        e,
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
    }
  };

  const like = (id, username) => {
    likeComment(id, username).then((res) => {
      if (res.status === 200) {
        setReload(!reload);
      }
    });
  };

  // const handleLikeComment = (username) => {
  //   let temp = [];
  //   if (likeList.some((el) => el.username === username)) {
  //     temp = likeList.filter((el) => el.username !== username);
  //   } else {
  //     temp = likeList;
  //     temp.push({ username: username });
  //   }
  //   console.log(temp);
  //   setLikeList(temp);
  // };

  const handleDeleteComment = (id, pId) => {
    deleteComment(id, pId).then((res) => {
      if (res.status === 200) {
      }
      setReload(!reload);
    });
  };
  return (
    <div className={s.container}>
      <p className={s.title}>
        <FormattedMessage id="title.comments" />
      </p>
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
              onEnter={(e) => {
                handleComment(e);
              }}
              cleanOnEnter
              placeholder="Type a comment..."
            />

            <Rate onChange={setRating} defaultValue={rating} allowHalf />
          </div>
        </div>
      )}

      {listComment?.map((item, index) => {
        // const a = likeList.some((value) => value.username === item.username);
        // console.log(a);
        var a = item.userLiked.some(
          (value) => value.username === user.currentUser.username
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
                <>
                  <ThumbsUp
                    style={{ cursor: "pointer" }}
                    size={20}
                    weight="bold"
                    color={a === true ? "#d84727" : "#999"}
                    onClick={() => {
                      like(item?._id, user.currentUser?.username);
                      // setLikeList([...likeList, item?.username]);
                      // handleLikeComment(item.username);
                    }}
                  />{" "}
                  {/* {console.log(a)} */}
                  {item.userLiked.length > 0 && `(${item.countLike})`}
                </>

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
            hanldeNextComment(page + 1);
          }}
        >
          See more comments
        </div>
      )}
    </div>
  );
};

export default Comment;
