import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/footer/logo_footer.png";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../customHook/useWindowSize";
import { FormattedMessage } from "react-intl";
import Term from "../../pages/Term";
import { message, Modal } from "antd";
import { subscribeUser } from "../../api/Subscribe";
export const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = () => {
    var regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(email)) {
      subscribeUser(email).then((res) => {
        if (res.status === 201) {
          message.error("Email already subscribe");
        } else {
          message.success("Subscribed");
        }
      });
    } else {
      message.warning("Invalid email");
    }
  };

  const left = [
    {
      link: "https://www.google.com/maps/place/180+Cao+L%C3%B4%CC%83/@10.7382597,106.6788008,20z/data=!4m5!3m4!1s0x31752fad03bf2257:0xafb1cc30716fdfab!8m2!3d10.7382316!4d106.6788115?hl=vi-VN",
      title: "Address",
      desc: "180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh",
    },
    {
      link: "#",
      title: "Office Hour",
      desc: "Monday - Saturday 09.00 AM - 18.00 PM",
    },
  ];

  const getInTouch = [
    {
      link: "tel:+84348098023",
      title: "Phone",
      desc: "034-8098023",
    },
    {
      link: "tel:+84909090909",
      title: "Service Center",
      desc: "090-9090909",
    },
    {
      link: "tel:+84987654321",
      title: "Customer Service",
      desc: "098-7654321",
    },
  ];

  const useful = [
    {
      link: "",
      name: "Warranty & Complaints",
    },
    {
      link: "/myaccount/6",
      name: "Order & Shipping",
    },
    {
      link: "",
      name: "Tracking Order",
    },
    {
      link: "/about-us",
      name: "About Us",
    },
    {
      link: "/legal-page",
      name: "Legal",
    },
    {
      link: "",
      name: "Terms",
    },
    {
      link: "",
      name: "FAQ",
    },
  ];
  const campaign = [
    {
      name: "Mengenal Arti Cukup",
    },
    {
      name: "Tell Your Difference",
    },
    {
      name: "Waykambas",
    },
    {
      name: "Rebrand",
    },
    {
      name: "Gallery",
    },
    {
      name: "Singo",
    },
    {
      name: "Rakai",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let navigate = useNavigate();
  const [width] = useWindowSize();
  const getTrans = (title) => {
    return <FormattedMessage id={`footer.${title}`} />;
  };
  return (
    <div className={styles.all}>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Term />
      </Modal>
      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.footer__address}>
            <div
              className={`${styles.footer__address__logo} ${styles.top__all}`}
            >
              <img src={logo} alt="matoa" />
            </div>
            {left.map((item, id) => {
              return (
                <React.Fragment key={id}>
                  <p className={styles.footer__address__title}>
                    {getTrans(item.title)}
                  </p>
                  <a
                    className={styles.footer__address__desc}
                    style={
                      id === 0 ? { maxWidth: "255px" } : { maxWidth: "139px" }
                    }
                    href={`${item.link}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    {item.desc}
                  </a>
                </React.Fragment>
              );
            })}
          </div>

          <div className={styles.footer__getintouch}>
            {width > 1024 ? (
              <>
                <div className={styles.top__all}>
                  <p className={styles.footer__getintouch__title}>
                    <FormattedMessage id="footer.getintouch" />
                  </p>
                  <hr className={styles.line} />
                </div>
                {getInTouch.map((item, id) => {
                  return (
                    <div
                      className={`${styles.footer__getintouch__phone} ${
                        id === 0 ? styles.mt27 : ""
                      }`}
                      key={id}
                    >
                      <p className={styles.footer__getintouch__phone__title}>
                        {getTrans(item.title)}
                      </p>
                      <a
                        href={`${item.link}`}
                        className={styles.footer__getintouch__phone__desc}
                      >
                        {item.desc}
                      </a>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}

            <div className={styles.footer__getintouch__icon}>
              <div
                className={styles.facebook}
                onClick={() => {
                  navigate(
                    "https://www.facebook.com/Kibi-Accessories-107587432015584/?ref=pages_you_manage"
                  );
                }}
              >
                <FacebookLogo size={24} weight="bold" color="#d84727" />
              </div>
              <div
                className={styles.instagram}
                onClick={() => {
                  navigate(
                    "https://www.facebook.com/Kibi-Accessories-107587432015584/?ref=pages_you_manage"
                  );
                }}
              >
                <InstagramLogo
                  size={24}
                  weight="bold"
                  clip={"circle"}
                  color="#d84727"
                />
              </div>

              <div className={styles.twitter}>
                <TwitterLogo size={24} weight="bold" color="#d84727" />
              </div>

              <div className={styles.youtube}>
                <YoutubeLogo size={24} weight="bold" color="#d84727" />
              </div>
            </div>
          </div>

          {width > 1024 ? (
            <>
              <div className={styles.footer__useful}>
                <div className={styles.top__all}>
                  <p className={styles.footer__useful__title}>
                    <FormattedMessage id="footer.usefullink" />
                  </p>
                  <hr className={styles.line} />
                </div>
                <div className={styles.footer__useful__link}>
                  {useful.map((item, id) => {
                    return (
                      <Link
                        to={item.link}
                        className={styles.footer__useful__link__item}
                        key={id}
                        onClick={() => {
                          if (id === 5) {
                            showModal();
                          }
                        }}
                      >
                        {getTrans(item.name)}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className={styles.footer__campaign}>
                <div className={styles.top__all}>
                  <p className={styles.footer__campaign__title}>
                    <FormattedMessage id="footer.campaign" />
                  </p>
                  <hr className={styles.line} />
                </div>
                <div className={styles.footer__campaign__link}>
                  {campaign.map((item, id) => {
                    return (
                      <Link
                        to={"#"}
                        className={styles.footer__campaign__link__item}
                        key={id}
                      >
                        {getTrans(item.name)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.subcribe}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            subscribe();
          }}
          className={styles.form_subscribe}
        >
          <input
            className={styles.input_subscribe}
            type="text"
            placeholder="Please type your email to subscribe here..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
