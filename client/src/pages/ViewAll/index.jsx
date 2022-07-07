import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBrand } from "../../api/Brand";
import { getAllProduct } from "../../api/Product";
import ListProduct from "./ListProduct";
import styles from "./styles.module.scss";

const ViewAll = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [listBrand, setListBrand] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(2);
  const { idCate } = useParams();
  useEffect(() => {
    setLoading(true);
    getAllProduct(idCate, 1)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setProduct(res);
          setTotalPages(res.totalPages);
        }
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idCate]);

  useEffect(() => {
    getBrand().then((res) => {
      console.log("res:", res);
      if (res.status === 200) {
        setListBrand(res.data);
      }
    });
  }, []);

  const fetchMore = () => {
    // while (page !== totalPages) {
    getAllProduct(idCate, page)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setProduct((product) => [...product, ...res]);
        }
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
    setPage(page + 1);
    // }
  };

  const handleFilter = (name, idBrand, fromPrice, toPrice, rating) => {
    setLoading(true);
    getAllProduct(idCate, 1, name, idBrand, fromPrice, toPrice, rating)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setProduct(res);
          setTotalPages(res.totalPages);
        }
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className={styles.backgroundContainer}>
        <ListProduct
          data={product}
          loading={loading}
          fetchMore={fetchMore}
          totalPages={totalPages}
          listBrand={listBrand}
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
};

export default ViewAll;
