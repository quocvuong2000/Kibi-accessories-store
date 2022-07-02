import { message } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearViewed, getViewed } from "../../../api/Viewed";
import EmptyPage from "../../../components/Empty";
import { ProductCardGrid } from "../../ViewAll/ProductCardGrid";
import s from "./styles.module.scss";
const Viewed = () => {
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getViewed(user.currentUser.username).then((res) => {
      setProduct(res[0].products);
    });
  }, [reload]);

  const handleClear = () => {
    clearViewed(user.currentUser.username).then((res) => {
      setReload(!reload);
      if (res) {
        message.success("Clear Success");
      }
    });
  };

  return (
    <>
      {product.length > 0 ? (
        <div className={s.container}>
          <p className={s.text}>Viewed</p>
          <div className={s.clear_history} onClick={handleClear}>
            Clear
          </div>
          <div className={s.list}>
            {product?.map((item, index) => {
              return (
                <motion.span
                  animate={{ scale: [2, 1], opacity: [0, 1] }}
                  key={index}
                >
                  <ProductCardGrid data={item} key={index} />
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

export default Viewed;
