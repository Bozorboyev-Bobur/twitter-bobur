import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { NavigationBar } from "../../components/NavigationBar/NavigationBar"
import { SideBar } from "../../components/SideBar/SideBar"
import styles from '../../../styles/explore.module.scss'
import React, { useState } from 'react'
import { Tweet } from '../../typings'
import { AddingTweet } from "../../components/AddingTweet"
import { WhoToFollow } from "../../components/WhoToFollow"
import { SearchTweet } from "../../components/SearchTweet"
import { TrendsForYou } from "../../components/TrendsForYou"

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
            <div className={styles.p}>
                <div className={styles.exploreHeader}>
                    <SearchTweet />
                </div>
                <div className={styles.exploreTrendsCardsContainer}>
                    <TrendsForYou />
                    <Link href={'/connect'}>
                        <a className={styles.whoToFollowShowMoreLink}>
                            <div className={styles.whoToFollowShowMoreText}>
                                Show more
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <WhoToFollow />
        </div>
    )
}