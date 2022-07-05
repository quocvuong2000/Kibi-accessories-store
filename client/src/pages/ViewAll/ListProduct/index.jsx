import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Menu, Spin } from "antd";
import "antd/dist/antd.css";
import { motion } from "framer-motion";
import { DotsNine, ListDashes, Funnel } from "phosphor-react";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPage from "../../../components/Empty";
import { ProductCardGrid } from "../ProductCardGrid";
import { ProductCardList } from "../ProductCardList";
import RangePrice from "../RangePrice";
import classes from "./styles.module.scss";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const menu = (
  <Menu>
    <RangePrice />
    <div className={classes.text_range}>
      <p className={classes.min_range_price}>
        <b>$0</b>
      </p>
      <p className={classes.max_range_price}>
        <b>$1000</b>
      </p>
    </div>
    <hr className={classes.line_devide} />
    <p className={classes.title_filter}>Brand</p>
    <Checkbox.Group
      style={{ width: "100%" }}
      className={classes.checkbox_group}
    >
      <Checkbox value="A">A</Checkbox>
      <Checkbox value="b">b</Checkbox>
      <Checkbox value="c">c</Checkbox>
      <Checkbox value="d">d</Checkbox>
    </Checkbox.Group>
  </Menu>
);

const ListProduct = (props) => {
  const [glActive, setGlActive] = useState(true);
  const [page, setPage] = useState(1);
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
          <p className={classes.showing}>
            {props.data?.totalItems <= 10
              ? `Showing 1- ${props.data?.totalItems} of ${props.data?.totalItems} results`
              : `Showing 1-10 of ${props.data?.totalItems} results`}
          </p>
          <div className={classes.short__list__grid}>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              arrow
              trigger={["click"]}
              overlayClassName={classes.filter}
            >
              <Funnel size={24} weight="thin" />
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
          <div id="scrollableDiv">
            <InfiniteScroll
              dataLength={1}
              next={() => {
                alert("asdjsadj");
                if (page < props.totalPages) {
                  props.fetchMore(page);
                }
              }}
              hasMore={true}
              scrollableTarget="scrollableDiv"
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
                    <React.Fragment key={index}>
                      {glActive ? (
                        <motion.span
                          animate={
                            glActive
                              ? { scale: [2, 1], opacity: [0, 1] }
                              : { x: "-100%" }
                          }
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
                    </React.Fragment>
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
