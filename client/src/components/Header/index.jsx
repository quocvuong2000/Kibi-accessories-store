import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useClickOutside } from "@mantine/hooks";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  message,
  notification,
  Space,
} from "antd";
import "antd/dist/antd.min.css";
import Cookies from "js-cookie";
import {
  Handbag,
  Heart,
  LockKey,
  SignOut,
  User,
  UserCircle,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../api/Category";
import { getAllProductNoPage } from "../../api/Product";
import logo from "../../assets/header/image 5.svg";
import placeholderAvatar from "../../assets/user_avatar.jpg";
import formatName from "../../utils/formatName";
import { Cart } from "./Cart";
import NumItem from "./NumItemCard";
import classes from "./styles.module.scss";
import { AutoComplete } from "antd";
const { Search } = Input;
const { Option } = AutoComplete;
const token =
  typeof Cookies.get("tokenClient") !== "undefined"
    ? Cookies.get("tokenClient")
    : "";

const Header = () => {
  let navigate2 = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const [allProductTemp, setAllProductTemp] = useState([]);
  const handleSignOut = () => {
    Cookies.remove("tokenClient");
    localStorage.removeItem("persist:root");
    navigate2("/login");
  };

  if (token && token === "") {
    localStorage.removeItem("persist:root");
  }

  useEffect(() => {
    getAllProductNoPage().then((res) => {
      setAllProduct(res.products);
      setAllProductTemp(res.products);
    });
  }, []);

  const handleMenuClick = (e) => {
    setVisibleDropdown(false);
  };
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={1}>
        <div
          onClick={() => {
            setVisibleDropdown(false);
            navigate2(`/myaccount/1`);
          }}
          className={classes.box_profile}
        >
          <div className={classes.avatar_menu}>
            <img
              src={
                user.currentUser
                  ? user.currentUser.avatar
                    ? user.currentUser.avatar
                    : placeholderAvatar
                  : placeholderAvatar
              }
              alt=""
            />
          </div>
          <p className={classes.name_avatar}>
            {user.currentUser ? user.currentUser.name : ""}
          </p>
        </div>
      </Menu.Item>
      <Menu.Item key={2}>
        <div
          onClick={() => {
            setVisibleDropdown(false);
            navigate2(`/myaccount/1`);
          }}
          className={classes.link_to_profile}
        >
          <div className={classes.icon}>
            <UserCircle size={24} className={classes.icon_box} />
          </div>
          Your Profile
        </div>
      </Menu.Item>
      <Menu.Item key={3}>
        <div
          onClick={() => {
            setVisibleDropdown(false);
            navigate2(`/myaccount/4`);
          }}
          className={classes.wish_list}
        >
          <div className={classes.icon}>
            <Heart size={24} className={classes.icon_box} />
          </div>
          Wish List
        </div>
      </Menu.Item>
      <Menu.Item key={4}>
        <div
          onClick={() => {
            setVisibleDropdown(false);
            navigate2(`/myaccount/1?showpass=true`);
          }}
          className={classes.wish_list}
        >
          <div className={classes.icon}>
            <LockKey size={24} className={classes.icon_box} />
          </div>
          Change Password
        </div>
      </Menu.Item>
      <Menu.Item key={5}>
        <div className={classes.sign_out} onClick={handleSignOut}>
          <div className={classes.icon}>
            <SignOut size={24} className={classes.icon_box} />
          </div>
          Sign Out
        </div>
      </Menu.Item>
    </Menu>
  );

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Error",
      description: "Can't fill in special character",
    });
  };

  let navigate = useNavigate();

  const [category, setCategory] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const ref = useClickOutside(() => setVisible(false));
  const options = allProductTemp.map((item) => ({
    value: item.product,
    label: (
      <div style={{ display: "flex", textAlign: "center" }}>
        {item.product && (
          <span style={{ fontSize: "14px", color: "grey", flex: 1 }}>
            {item.product}
          </span>
        )}
      </div>
    ),
  }));

  // const ref2 = useClickOutside(() => setVisibleDropdown(false));
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    menuRef.current.classList.toggle(classes.active);
  };

  useEffect(() => {
    getAllCategory().then((res) => {
      if (res) {
        setCategory(res);
      }
    });
  }, [cart]);

  const onSearch = (value) => {
    var regex = /^[a-zA-Z]+$/;
    // console.log(value);
    if (value) {
      console.log("value", value);
      navigate(`/search/${value}`);
    } else if (value === "") {
      return;
    } else {
      openNotificationWithIcon("warning");
    }
  };
  return (
    <div className={classes.container}>
      <Cart
        visible={visible}
        aref={ref}
        setVisible={setVisible}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className={classes.headerContainer} ref={headerRef}>
        <div className={classes.top}>
          <div className={classes.menu}>
            <Button
              onClick={toggleCollapsed}
              danger
              style={{
                background: "#D84727",
                border: "none",
                borderRadius: "5px",
                outline: "none",
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                  }}
                />
              )}
            </Button>
          </div>
          <Link to={"/"} className={classes.logo}>
            <img src={logo} alt="" />
          </Link>
          <Space
            direction="vertical"
            align="center"
            className={classes.searchContainer}
            style={{ position: "relative" }}
          >
            <AutoComplete
              required={true}
              // onSearch={onSearch}
              options={options}
              onSelect={() => {}}
              onChange={(value) => {
                if (value !== "") {
                  let res = [];
                  allProduct?.forEach((element) => {
                    element?.product
                      .toLowerCase()
                      .includes(value?.toLowerCase()) && res.push(element);
                  });
                  setAllProductTemp(res);
                } else {
                  setAllProductTemp(allProduct);
                }
              }}
            >
              <Search
                onSearch={onSearch}
                className={classes.search}
                placeholder="Search products, accessory, etc..."
              ></Search>
            </AutoComplete>
          </Space>
          <div className={classes.authentication}>
            {/* {!user.accessToken ? ( */}
            {user.currentUser ? (
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
                // visible={visibleDropdown}
                overlayClassName={classes.menu_header}
              >
                <div
                  className={classes.login}
                  onClick={() => setVisibleDropdown(!visibleDropdown)}
                >
                  <User size={32} color="#000" weight="thin" />
                  <div className={classes.loginText}>
                    {formatName(user.currentUser.name)}
                  </div>
                </div>
              </Dropdown>
            ) : (
              <div
                to={"/login"}
                className={classes.login}
                onClick={() => navigate2("/login")}
              >
                <User size={32} color="#000" weight="thin" />
                <div className={classes.loginText}>Log In</div>
              </div>
            )}

            <div
              className={classes.shopingCart}
              onClick={() => {
                if (user.currentUser) {
                  setVisible(true);
                } else {
                  message.error("Please Sign In");
                }
              }}
            >
              <Handbag size={25} color="#000" weight="thin" />
              <NumItem item={cart.numberCart ?? 0} />
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.navListContainer}>
            <div className={classes.navList}>
              {category.categories?.map((item, index) => {
                return (
                  <Link
                    to={`/viewall/${item._id}`}
                    key={index}
                    className={classes.navItem}
                  >
                    {item.category}
                  </Link>
                );
              })}
              <Link to={`/blog`} className={classes.navItem}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TOGGLE MENU MOBILE */}
      <div className={classes.menuMobile} ref={menuRef}>
        <div className={classes.navListContainer}>
          <div className={classes.navList}>
            {category.categories?.map((item, index) => {
              return (
                <Link
                  to={`/viewall/${item._id}`}
                  key={index}
                  className={classes.navItem}
                >
                  {item.category}
                </Link>
              );
            })}
            <Link to={`/blog`} className={classes.navItem}>
              Blog
            </Link>
          </div>
        </div>
      </div>
      {/* ---------- */}
    </div>
  );
};

export default Header;

{
  /* TABLET */
}
//   <div className={classes.tablet}>
//   <div className={classes.top}>
//     <div className={classes.logo}>
//       <img src={logo} alt="" />
//     </div>
//     <Space direction="vertical" align="start">
//       <Search
//         placeholder="Search products, accessory, etc..."
//         onSearch={onSearch}
//         style={{ width: 400, textAlign: "center" }}
//       />
//     </Space>
//     <div className={classes.authentication}>
//       <div className={classes.login}>
//         <User size={32} color="#000" weight="thin" />
//         <div className={classes.loginText}>
//           {user.currentUser ? user.currentUser.name : "Log In"}
//         </div>
//       </div>
//       <div
//         className={classes.shopingCart}
//         onClick={() => setVisible(true)}
//       >
//         <Handbag size={25} color="#000" weight="thin" />
//       </div>
//     </div>
//   </div>
//   <div className={classes.bottom}>
//     <div className={classes.navListContainer}>
//       <div className={classes.navList}>
//         {category.categories?.map((item, index) => {
//           return (
//             <Link
//               to={`/viewall/${item._id}`}
//               key={index}
//               className={classes.navItem}
//             >
//               {item.category}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// </div>

{
  /* ------ */
}
{
  /* MOBILE */
}
{
  /* <div className={classes.mobile}>
  <div className={classes.top}>
    <div className={classes.menu}>
      <Button
        onClick={toggleCollapsed}
        danger
        style={{
          background: "#D84727",
          border: "none",
          borderRadius: "5px",
          outline: "none",
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          />
        )}
      </Button>
    </div>
    <div className={classes.logo}>
      <img src={logo} alt="" />
    </div>
    <div className={classes.authentication}>
      <div className={classes.shopingCart}>
        <Handbag size={25} color="#000" weight="thin" />
      </div>
    </div>
  </div>
  <div className={classes.bottom}>
    <Space direction="vertical" align="start">
      <Search
        placeholder="Search products, accessory, etc..."
        onSearch={onSearch}
        style={{ width: 300, marginBottom: "10px" }}
      />
    </Space>
  </div>
</div> */
}
{
  /* ------ */
}
