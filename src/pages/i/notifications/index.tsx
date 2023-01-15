import Head from "next/head"
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar"
import styles from '../../../../styles/notifications.module.scss'
import React, { useEffect, useState } from 'react'
import { Tweet } from '../../../typings'
import { WhoToFollow } from "../../../components/WhoToFollow"

interface Props {
    tweets: Tweet[]
}

export default function Notifications({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    return (
        <div className={styles.notificationsPageContainer}>
            <Head>
                <title>
                    Notifications / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.notificationsContent}>
                This page does not exist yet
            </div>
            <div className={styles.whoToFollowContainer}>
                <div className={styles.whoToFollowContent}>
                    <WhoToFollow />
                </div>
            </div>
            <div className={styles.whoToFollowBg}></div>
        </div>
    )
}