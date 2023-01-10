import { TRENDSFORYOU_CONFIG } from '../../../constants/index'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { NavigationBar } from '../../../components/NavigationBar'
import { SideBar } from '../../../components/SideBar'
import { Tweet } from "../../../typings"
import { Icon } from '@iconify/react'
import styles from '../../../../styles/trends.module.scss'

interface Props {
    tweets: Tweet[]
}

export default function Trends({ tweets }: Props) {
    const router = useRouter()

    const [loadPage, setLoadPage] = useState<boolean>(false)

    const list = []
    var uniqueArray = []

    useEffect(() => {
        setLoadPage(true)
    }, [])

    if (loadPage === true) {
        for (let i = 0; i <= TRENDSFORYOU_CONFIG.length; i++) {
            let item = TRENDSFORYOU_CONFIG[Math.floor(Math.random() * TRENDSFORYOU_CONFIG.length)];
            list.push(item);
        }
        uniqueArray = list.filter(function (item, pos) {
            list.slice(0, list.length)
            return list.indexOf(item) == pos;
        })
    }
    var approx = require('approximate-number')
    return (
        <div className={styles.trendsPageContainer}>
            <Head>
                <title>
                    Trends / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.trendsContainer}>
                <div className={styles.trendsHeader}>
                    <div className={styles.trendsHeaderBackBtnContainer}>
                        <button className={styles.trendsHeaderBackBtn} onClick={() => {
                            { history.back() }
                        }}>
                            <Icon icon="material-symbols:arrow-back" width='24' height='24' />
                        </button>
                    </div>
                    <div className={styles.trendsTitle}>
                        <div className={styles.trendsTitleContainer}>
                            <h2 className={styles.trendsTitleText}>
                                Trends
                            </h2>
                        </div>
                    </div>
                </div>
                {uniqueArray.map((item) => (
                    <div key={Math.random()} tabIndex={0} className={styles.trendsForYouCard} onClick={() => {
                    }}>
                        <div className={styles.trendsForYouData}>
                            <p className={styles.trendsForYouCountryName}>
                                {item.country}
                            </p>
                            <div className={styles.trendsForYouTrendName}>
                                {item.trendName}
                            </div>
                            <div className={styles.trendsForYouTweetsCount}>
                                {approx(item.tweetsCount, {
                                    min10k: true
                                })} Tweets
                            </div>
                        </div>
                        <button className={styles.trendsForYouFollowBtn}>
                            ···
                        </button>
                    </div>
                ))}
            </div>
            <SideBar />
        </div>
    )
}