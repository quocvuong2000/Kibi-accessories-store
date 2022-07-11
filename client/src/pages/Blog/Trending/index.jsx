import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import trending1 from "../../../assets/trending1.jpg";
import trending2 from "../../../assets/trending2.jpg";
import trending3 from "../../../assets/trending3.jpg";
import trending4 from "../../../assets/trending4.jpg";
import Title from "../Title";
import { getLimitBrand } from "../../../api/Brand";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [listBrand, setListBrand] = useState([]);
  useEffect(() => {
    getLimitBrand(4).then((res) => {
      setListBrand(res.data);
    });
  }, []);
  const navigate = useNavigate();
  const getSrc = (index) => {
    switch (index) {
      case 0:
        return trending1;
      case 1:
        return trending2;
      case 2:
        return trending3;
      case 3:
        return trending4;
      default:
        break;
    }
  };
  return (
    <div className={s.container}>
      <Title title="TRENDING" />
      <div className={s.list_trending}>
        {listBrand?.brands?.map((item, index) => {
          return (
            <div
              className={s.one_category}
              onClick={() => {
                navigate(`/viewallbybrand/${item._id}`);
              }}
            >
              <img src={getSrc(index)} alt="" />
              <div className={s.name_category}>
                <p className={s.name}>{item.brand}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
