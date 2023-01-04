import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { NavigationBar } from "../../components/NavigationBar/NavigationBar"
import { SideBar } from "../../components/SideBar/SideBar"
import styles from '../../../styles/explore.module.scss'
import React, { useState } from 'react'
import { Tweet } from '../../typings'
import { AddingTweet } from "../../components/AddingTweet"

interface Props {
    tweets: Tweet[]
}

export default function Explore({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    return (
        <div className={styles.explorePageContainer}>
            <Head>
                <title>
                    Explore / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <p className={styles.p}>
            </p>
            <SideBar />
        </div>
    )
}