import { NavigationBar } from "../components/NavigationBar"
import styles from '../../styles/error.module.scss'
import Link from "next/link"
import Head from "next/head"
import { Tweet } from "../typings"

interface Props {
    tweets: Tweet[]
}

export default function Error({ tweets }: Props) {
    return (
        <div className={styles.errorPageContainer}>
            <Head>
                <title>
                    Page not found / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <main className={styles.errorPageMain}>
                <h2 className={styles.errorPageTitle}>
                    Hmm...this page doesn’t exist. Try searching for something else.
                </h2>
                <Link href={'/explore'}>
                    <a className={styles.errorPageBtn}>
                        Search
                    </a>
                </Link>
            </main>
        </div>
    )
}