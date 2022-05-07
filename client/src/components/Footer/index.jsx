import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/footer/logo_footer.png";
import "boxicons";

export const Footer = () => {
  const left = [
    {
      title: "Address",
      desc: "Store & Office Jl. Setrasari Kulon III, No. 10-12, Sukarasa,Sukasari, Bandung, Jawa Barat, Indonesia 40152",
    },
    {
      title: "Office Hour",
      desc: "Monday - Sunday 10.00 - 18.00",
    },
  ];

  const getInTouch = [
    {
      title: "Phone",
      desc: "022-20277564",
    },
    {
      title: "Service Center",
      desc: "0811-233-8899",
    },
    {
      title: "Customer Service",
      desc: "0811-235-9988",
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
          <p className={styles.top__all}>
            <p className={styles.footer__getintouch__title}>Get in touch</p>
            <hr className={styles.line} />
          </p>
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

          <div className={styles.footer__getintouch__icon}>
            <div className={styles.facebook}>
              <box-icon
                name="facebook"
                type="logo"
                animation="tada"
                rotate="90"
                color="#d84727"
              ></box-icon>
            </div>
            <div className={styles.instagram}>
              <box-icon
                name="instagram"
                type="logo"
                animation="spin"
                rotate="90"
                color="#d84727"
              ></box-icon>
            </div>

            <div className={styles.twitter}>
              <box-icon
                name="twitter"
                type="logo"
                animation="fade-up"
                rotate="90"
                color="#d84727"
              ></box-icon>
            </div>

            <div className={styles.youtube}>
              <box-icon
                name="youtube"
                type="logo"
                animation="spin"
                rotate="90"
                color="#d84727"
              ></box-icon>
            </div>
          </div>
        </div>

        <div className={styles.footer__useful}>
          <p className={styles.top__all}>
            <p className={styles.footer__useful__title}>Useful Link</p>
            <hr className={styles.line} />
          </p>
          <div className={styles.footer__useful__link}>
            {useful.map((item, id) => {
              return (
                <p className={styles.footer__useful__link__item} key={id}>
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.footer__campaign}>
          <p className={styles.top__all}>
            <p className={styles.footer__campaign__title}>Campaign</p>
            <hr className={styles.line} />
          </p>
          <div className={styles.footer__campaign__link}>
            {campaign.map((item, id) => {
              return (
                <p className={styles.footer__campaign__link__item} key={id}>
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
