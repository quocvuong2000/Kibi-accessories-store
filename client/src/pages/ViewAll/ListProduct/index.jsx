import { LoadingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin } from "antd";
import "antd/dist/antd.css";
import { motion } from "framer-motion";
import { DotsNine, ListDashes } from "phosphor-react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPage from "../../../components/Empty";
import { ProductCardGrid } from "../ProductCardGrid";
import { ProductCardList } from "../ProductCardList";
import classes from "./styles.module.scss";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const menu = (
  <Menu>
    <Menu.Item>asdasd</Menu.Item>
  </Menu>
);

const ListProduct = (props) => {
  const [glActive, setGlActive] = useState(true);
  const handleGrid = () => {
    setGlActive(false);
  };
  const handleList = () => {
    setGlActive(true);
  };
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
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
            <Dropdown overlay={menu} placement="bottom" arrow>
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
                    <>
                      {glActive ? (
                        <motion.span
                          animate={
                            glActive
                              ? { scale: [2, 1], opacity: [0, 1] }
                              : { x: "-100%" }
                          }
                          whil
                          key={index}
                        >
                          <ProductCardList data={item} key={index} />
                        </motion.span>
                      ) : (
                        <motion.span
                          animate={{
                            x: [-500, 0],
                            opacity: [0, 1],
                          }}
                          key={index + 1}
                        >
                          <ProductCardGrid data={item} key={index} />{" "}
                        </motion.span>
                      )}
                    </>
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <EmptyPage />
        )}
      </div>
    </>
  );
};

export default ListProduct;
