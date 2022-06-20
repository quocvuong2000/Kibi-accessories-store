import React, { useState } from "react";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllWishlist } from "../../../api/Wishlist";
import { ProductCardGrid } from "../../ViewAll/ProductCardGrid";
import { motion } from "framer-motion";
const Wistlist = () => {
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllWishlist(user.currentUser.username).then((res) => {
      console.log(res[0].products);
      setProduct(res[0].products);
    });
  }, []);

  return (
    <div className={s.container}>
      {product?.map((item, index) => {
        return (
          <motion.span animate={{ scale: [2, 1], opacity: [0, 1] }} key={index}>
            <ProductCardGrid data={item} key={index} />
          </motion.span>
        );
      })}
    </div>
  );
};

export default Wistlist;
