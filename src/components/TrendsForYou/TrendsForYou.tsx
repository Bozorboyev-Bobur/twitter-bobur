import styles from '../TrendsForYou/TrendsForYou.module.scss'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { TRENDSFORYOU_CONFIG } from '../../constants'

export const TrendsForYou = () => {
    const date: Date = new Date
    const router = useRouter()

    const [loadPage, setLoadPage] = useState<boolean>(false)

    useEffect(() => {
        setLoadPage(true)
    })

    const list = []
    var uniqueArray = []

    if (loadPage === true) {
        for (let i = 0; i < 3; i++) {
            let item = TRENDSFORYOU_CONFIG[Math.floor(Math.random() * TRENDSFORYOU_CONFIG.length)];
            list.push(item);
        }
        uniqueArray = list.filter(function (item, pos) {
            list.slice(0, list.length)
            return list.indexOf(item) == pos;
        })
    }
    var approx = require('approximate-number');
    return (
        <>
            <h3 className={styles.trendsForYouTitle}>Trends for you</h3>
            <div className={styles.trendsForYouBox}>
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
        </>
    )
}