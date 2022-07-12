import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/footer/logo_footer.png";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../customHook/useWindowSize";
export const Footer = () => {
  const left = [
    {
      title: "Address",
      desc: "180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh",
    },
    {
      title: "Office Hour",
      desc: "Monday - Saturday 09.00 AM - 18.00 PM",
    },
  ];

  const getInTouch = [
    {
      title: "Phone",
      desc: "034-8098023",
    },
    {
      title: "Service Center",
      desc: "090-9090909",
    },
    {
      title: "Customer Service",
      desc: "098-7654321",
    },
  ];

  const useful = [
    {
      name: "Warranty & Complaints",
    },
    {
      name: "Order & Shipping",
    },
    {
      name: "Tracking Order",
    },
    {
      name: "About Us",
    },
    {
      name: "Repair",
    },
    {
      name: "Terms",
    },
    {
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

  let navigate = useNavigate();
  const [width, height] = useWindowSize();

  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.footer__address}>
          <div className={`${styles.footer__address__logo} ${styles.top__all}`}>
            <img src={logo} alt="matoa" />
          </div>
          {left.map((item, id) => {
            return (
              <React.Fragment key={id}>
                <p className={styles.footer__address__title}>{item.title}</p>
                <p
                  className={styles.footer__address__desc}
                  style={
                    id === 0 ? { maxWidth: "255px" } : { maxWidth: "139px" }
                  }
                >
                  {item.desc}
                </p>
              </React.Fragment>
            );
          })}
        </div>

        <div className={styles.footer__getintouch}>
          {width > 1024 ? (
            <>
              <div className={styles.top__all}>
                <p className={styles.footer__getintouch__title}>Get in touch</p>
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
                      {item.title}
                    </p>
                    <p className={styles.footer__getintouch__phone__desc}>
                      {item.desc}
                    </p>
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
                <p className={styles.footer__useful__title}>Useful Link</p>
                <hr className={styles.line} />
              </div>
              <div className={styles.footer__useful__link}>
                {useful.map((item, id) => {
                  return (
                    <Link
                      to={"#"}
                      className={styles.footer__useful__link__item}
                      key={id}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={styles.footer__campaign}>
              <div className={styles.top__all}>
                <p className={styles.footer__campaign__title}>Campaign</p>
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
                      {item.name}
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
  );
};
