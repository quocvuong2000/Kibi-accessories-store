import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Menu, Dropdown, Button } from "antd";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import product2 from "../../../assets/home/monthly/image 10.png";
import product1 from "../../../assets/home/monthly/image 9.png";
import { ProductCardGrid } from "../ProductCardGrid";
import classes from "./styles.module.scss";
import { ListDashes, DotsNine } from "phosphor-react";
import { ProductCardList } from "../ProductCardList";
import { motion } from "framer-motion";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const fakeProduct = [
  {
    title: "Singo Maple asdsa sada",
    saleOff: "20% Off",
    image: product1,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
    desc: "MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product2,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
    desc: "MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product1,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
    desc: "MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product2,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
    desc: "MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.",
  },
];

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        ),
      },
    ]}
  />
);

const ListProduct = () => {
  const [glActive, setGlActive] = useState(false);
  const handleGrid = () => {
    setGlActive(false);
  };
  const handleList = () => {
    setGlActive(true);
  };
  return (
    <div className={classes.container}>
      <div className={classes.image__wrap}>
        <img
          src="https://matoa-indonesia.com/wp-content/uploads/2022/05/Req-10-01-1-scaled.jpg"
          alt=""
        />
      </div>
      <div className={classes.way__result}>
        <p className={classes.showing}>Showing 1–12 of 35 results</p>
        <div className={classes.short__list__grid}>
          <Dropdown overlay={menu} placement="topRight" arrow>
            <Button>Default Sorting</Button>
          </Dropdown>
          <p className={classes.txtviewon}>View on</p>
          <ListDashes
            size={32}
            onClick={handleList}
            className={glActive ? classes.opa1 : classes.opa07}
          />
          <DotsNine
            size={32}
            onClick={handleGrid}
            className={!glActive ? classes.opa1 : classes.opa07}
          />
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={50}
          hasMore={true}
          loader={
            <div className={classes.spin}>
              <Spin indicator={antIcon} />
            </div>
          }
        >
          <div className={`${classes.listItem} ${glActive ? classes.row : ""}`}>
            {fakeProduct.slice(0, 4).map((item, index) => {
              return (
                <motion.span animate={{ scale: [2, 1], opacity: [0, 1] }}>
                  {glActive ? (
                    <ProductCardList data={item} key={index} />
                  ) : (
                    <ProductCardGrid data={item} key={index} />
                  )}
                </motion.span>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListProduct;
