import Head from "next/head"
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar"
import styles from '../../../../styles/messages.module.scss'
import React, { useEffect, useState } from 'react'
import { Tweet } from '../../../typings'
import { WhoToFollow } from "../../../components/WhoToFollow"

interface Props {
    tweets: Tweet[]
}

export default function Messages({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    return (
        <div className={styles.messagesPageContainer}>
            <Head>
                <title>
                    Notifications / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.messagesContent}>
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