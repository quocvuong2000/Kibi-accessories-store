import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCommentByUser } from "../../../api/Comment";
import placeholder from "../../../assets/imgDefault.webp";
import AppLoader from "../../../components/AppLoader";
import EmptyPage from "../../../components/Empty";
import s from "./styles.module.scss";

const Rated = () => {
  const [listComment, setListComment] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);

  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentByUser(user.currentUser.username, page)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setListComment((listComment) => [...listComment, ...res.data.comments]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, user.currentUser.username]);

  useEffect(() => {
    getCommentByUser(user.currentUser.username, 1)
      .then((res) => {
        setListComment(res.data.comments);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.currentUser.username]);

  return (
    <>
      {isLoading === true && <AppLoader />}
      <div className={s.title}>
        <h3 className={s.tde}>
          <span>Rated</span>
        </h3>
      </div>
      {listComment.length > 0 ? (
        <div className={s.container}>
          {listComment?.map((item, index) => {
            return (
              <div className={s.one_content} key={index}>
                <div className={s.image}>
                  <Link to={`/detail/${item.productId}`}>
                    <img
                      src={item.productImage ? item.productImage : placeholder}
                      alt=""
                    />
                  </Link>
                </div>
                <div className={s.box_comment}>
                  <p className={s.username}>{item.username} </p>
                  <Rate disabled defaultValue={item?.rating} allowHalf />
                  <p className={s.content_comment}>{item.comment}</p>
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
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default Rated;
