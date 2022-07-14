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
  const [listProduct, setListProduct] = useState([]);

  const [listBrand, setListBrand] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(2);
  const { idCate } = useParams();

  useEffect(() => {
    document.title = "KIBI | List";
  }, []);
  useEffect(() => {
    setLoading(true);
    setPage(1);
    getAllProduct(idCate, 1)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setListProduct(res.products);
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
    window.scrollTo(0, 0);
  }, [idCate]);

  useEffect(() => {
    getBrand().then((res) => {
      if (res.status === 200) {
        setListBrand(res.data);
      }
    });
  }, []);

  const fetchMore = (page) => {
    getAllProduct(idCate, page)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        // console.log(res);
        // setListProduct(listProduct.push(...res.products));
        setListProduct((listProduct) => [...listProduct, ...res.products]);
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = (name, idBrand, fromPrice, toPrice, rating) => {
    setLoading(true);
    getAllProduct(idCate, 1, name, idBrand, fromPrice, toPrice, rating)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          console.log("res", res);
          setProduct(res);
          setListProduct(res.products);
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
    <div className={styles.backgroundContainer}>
      <ListProduct
        data={product}
        loading={loading}
        fetchMore={fetchMore}
        totalPages={totalPages}
        listBrand={listBrand}
        page={page}
        handleFilter={handleFilter}
        setPage={setPage}
        listProduct={listProduct}
      />
    </div>
  );
};

export default ViewAll;
