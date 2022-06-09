import { LoadingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin } from "antd";
import { motion } from "framer-motion";
import { DotsNine, ListDashes } from "phosphor-react";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppLoader from "../../../components/AppLoader";
import { ProductCardGrid } from "../ProductCardGrid";
import { ProductCardList } from "../ProductCardList";
import classes from "./styles.module.scss";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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

const ListProduct = (props) => {
  const [glActive, setGlActive] = useState(false);
  const handleGrid = () => {
    setGlActive(false);
  };
  const handleList = () => {
    setGlActive(true);
  };

  return (
    <>
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
        {props.loading === true ? (
          <div className={classes.spin}>
            <Spin indicator={antIcon} />
          </div>
        ) : props.data.products?.length > 0 ? (
          <div>
            <InfiniteScroll
              dataLength={2}
              hasMore={true}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div
                className={`${classes.listItem} ${glActive ? classes.row : ""}`}
              >
                {props.data.products?.map((item, index) => {
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
        ) : (
          <p className={classes.no_result}>Nothing</p>
        )}
      </div>
    </>
  );
};

export default ListProduct;
