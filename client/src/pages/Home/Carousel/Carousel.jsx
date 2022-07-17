import {
  ArrowSquareLeft,
  ArrowSquareRight,
  Timer,
  Watch,
} from "phosphor-react";
import { useState } from "react";
import watch5 from "../../../assets/home/image 10.png";
import watch2 from "../../../assets/home/image 7.png";
import watch3 from "../../../assets/home/image 8.png";
import watch4 from "../../../assets/home/image 9.png";
import WaveAnimation from "../../../components/WaveAnimation";
import classes from "./styles.module.scss";
const carouselData = [
  {
    display: "Kibi Redline",
    desc: "Kibi - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch2,
    color: "#F1DDC9",
  },
  {
    display: "Kibi Skylight",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Kibi - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch3,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI E2BONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Kibi - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch4,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI E2BONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Kibi - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch5,
    color: "#F1DDC9",
  },
];

const Carousel = () => {
  const [active, setActive] = useState(0);
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.carouselContainer}>
        {carouselData?.map((item, index) => {
          return (
            <div
              className={`${classes.carouselItem} ${
                active === index && classes.active
              }`}
              key={index}
            >
              <div className={classes.left}>
                <img src={item.image} alt="" />
              </div>
              <div className={classes.right}>
                <div className={classes.infoContainer}>
                  <div className={classes.title}>{item.display}</div>
                  <div className={classes.line}></div>
                  <div className={classes.desc}>{item.desc}</div>
                  <div className={classes.btn}>
                    <button className={classes.addToCart}>
                      <Timer size={20} weight="light" />
                      Coming soon
                    </button>
                    <button className={classes.watchMore}>
                      <Watch size={20} weight="light" />
                      Watch more
                    </button>
                  </div>
                  <div className={classes.sliderBtn}>
                    <ArrowSquareLeft
                      size={32}
                      color="#D84727"
                      weight="fill"
                      onClick={() => {
                        setActive(
                          active <= 0 ? carouselData.length - 1 : active - 1
                        );
                      }}
                    />
                    <ArrowSquareRight
                      size={32}
                      color="#D84727"
                      weight="fill"
                      onClick={() => {
                        setActive(
                          active === carouselData.length - 1 ? 0 : active + 1
                        );
                      }}
                    />
                  </div>
                  <WaveAnimation absolute={true}></WaveAnimation>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
