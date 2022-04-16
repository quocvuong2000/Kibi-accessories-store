import React from 'react'
import { Tabs } from 'antd';
import styles from './styles.module.scss'

const { TabPane } = Tabs;



const AllInfo = () => {
    return (
        <div className={styles.container}>
            <Tabs defaultActiveKey="1" centered className={styles.title__info}>
                <TabPane tab="Tab 1" key="1" className={`${styles}.ant_tabs-nav`}>
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>

    )
}

export default AllInfo