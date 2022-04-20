import React from 'react'
import { Tabs } from 'antd';
import 'antd/dist/antd.css'
import styles from './styles.module.scss'
import img from '../../assets/detail/size.png'

const { TabPane } = Tabs;


const info = [
    {
        title: 'Material',
        desc: "MATOA Way Kambas - Sumatran Rhino comes with a material form of Makassar Ebony (Diospyros celebica). This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin. Sumatran Rhino has unique skin fold, the skin is fairly thin about 10-16mm, and is soft and pliable.",
        src: img
    },
    {
        title: 'Case',
        desc: "The case on this timepiece is made with Height 12.5mm, Width 36mm, Length 33mm and Dial Opening 25mm. The glass is equipped with K1 flat glass to increase the enhanced durability on timepieces as scratch resistant and anti fingerprint. This timepiece is also equipped with Hand Polish Brass Spacer for a longer usage periods."
    },
    {
        title: 'Movement',
        desc: "For the first time, MATOA comes with Seiko Quartz VD78 movement with small second function. A small second hand is above 6 o'clock position. This second hand dial is dedicated to Sumatran Rhino whom every second of its life is so precious because whenever Sumatran Rhino goes, it can be threatened by illegal poaching"
    },
    {
        title: 'Dial',
        desc: "In the dial, there are double layer of Makassar Ebony Veneer with 3, 9 & 12 o'clock laser cut brass plate index."
    },
    {
        title: 'Hand',
        desc: "The hour, minute & small second hands on MATOA Way Kambas - Sumatran Rhino is outfitted with skeleton hand and brush finished with Gold Matte color. This new design aims at adding a value for this special edition."
    },
    {
        title: 'Important to Note',
        desc: "Wood color on watches is produced from a combination of mature and fresh wood but should not be viewed as a defect. It is a very natural process of wood aging."
    }
]


const AllInfo = () => {
    return (
        <div className={styles.container}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Detail" key="1">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                    <div className={styles.size__product}>
                        <img src={info[0].src} alt="size" />
                    </div>
                </TabPane>
                <TabPane tab="Warranty" key="2">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                </TabPane>
                <TabPane tab="Custom Engrave" key="3">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                </TabPane>
                <TabPane tab="How to Adjust" key="4">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                </TabPane>
                <TabPane tab="How to Care" key="5">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                </TabPane>
                <TabPane tab="Gallery" key="6">
                    <hr className={styles.line} />
                    {info.map((item,id) => {
                        return (
                            <div className={styles.info} key={id}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.desc}>
                                    {item.desc}
                                </p>
                            </div>
                        )
                    })}
                </TabPane>
            </Tabs>
        </div>

    )
}

export default AllInfo