import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBrand } from "../../api/Brand";
import { getAllProduct, getAllProductByBrand } from "../../api/Product";
import ListProduct from "./ListProduct";
import styles from "./styles.module.scss";

const ViewAllByBrand = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const { idBrandPr } = useParams();
  useEffect(() => {
    document.title = "KIBI | List";
  }, []);
  useEffect(() => {
    setLoading(true);
    getAllProductByBrand(idBrandPr, 1)
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
  }, [idBrandPr]);

  useEffect(() => {
    getBrand().then((res) => {
      console.log("res:", res);
      if (res.status === 200) {
        setListBrand(res.data);
      }
    });
  }, []);

  const fetchMore = (page) => {
    // while (page !== totalPages) {
    getAllProductByBrand(idBrandPr, page)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        setListBrand(listProduct.push(...res.products));
        setListProduct((listProduct) => [...listProduct, ...res.products]);
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
    // }
  };

  const handleFilter = (name, idBrand, fromPrice, toPrice, rating) => {
    setLoading(true);
    getAllProductByBrand(
      idBrandPr,
      1,
      name,
      idBrand,
      fromPrice,
      toPrice,
      rating
    )
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
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
    <>
      <div className={styles.backgroundContainer}>
        <ListProduct
          data={product}
          loading={loading}
          fetchMore={fetchMore}
          totalPages={totalPages}
          listBrand={listBrand}
          handleFilter={handleFilter}
          setPage={setPage}
          listProduct={listProduct}
          page={page}
        />
      </div>
    </>
  );
};

export default ViewAllByBrand;
