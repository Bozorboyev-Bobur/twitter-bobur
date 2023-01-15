import Head from "next/head"
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar"
import styles from '../../../../styles/bookmarks.module.scss'
import React, { useEffect, useState } from 'react'
import { Tweet } from '../../../typings'
import { WhoToFollow } from "../../../components/WhoToFollow"

interface Props {
    tweets: Tweet[]
}

export default function Bookmarks({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    return (
        <div className={styles.bookmarksPageContainer}>
            <Head>
                <title>
                    Bookmarks / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.bookmarksContent}>
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