import React, { useState } from "react";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteWishList, getAllWishlist } from "../../../api/Wishlist";
import { ProductCardGrid } from "../../ViewAll/ProductCardGrid";
import { motion } from "framer-motion";
import { message } from "antd";
import EmptyPage from "../../../components/Empty";
import AppLoader from "../../../components/AppLoader";

const Wistlist = () => {
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllWishlist(user.currentUser.username)
      .then((res) => {
        //console.log(res[0].products);
        setProduct(res[0].products);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reload, user.currentUser.username]);

  const handleDelete = (username, id) => {
    deleteWishList(username, id).then((res) => {
      setReload(!reload);
      if (res) {
        message.success("Delete Success");
      }
    });
  };

  return (
    <>
      {isLoading === true && <AppLoader />}
      <div className={s.title}>
        <h3 className={s.tde}>
          <span>Wishlist</span>
        </h3>
      </div>
      {product.length > 0 ? (
        <div className={s.container}>
          <div className={s.list_wishlist}>
            {product?.map((item, index) => {
              return (
                <motion.span
                  animate={{ scale: [2, 1], opacity: [0, 1] }}
                  key={index}
                >
                  <ProductCardGrid
                    data={item}
                    key={index}
                    handle={handleDelete}
                    isWishlist={true}
                  />
                </motion.span>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default Wistlist;
