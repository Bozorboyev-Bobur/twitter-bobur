import styles from '../../../styles/suggested.module.scss'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import router from 'next/router'
import { SUGGESDET_CONFIG } from '../../constants'

function ConnectCards({ componentTitle, configName }: any) {
    const [loadPage, setLoadPage] = useState<boolean>(null)

    useEffect(() => {
        setLoadPage(true)
    }, [])
    
    const list = []
    var uniqueArray = []
    const cycle = configName === SUGGESDET_CONFIG ? SUGGESDET_CONFIG.length : 3

    if (loadPage === true) {
        for (let i = 0; i < cycle; i++) {
            let item = configName[Math.floor(Math.random() * configName.length)];
            list.push(item);
            if ((list[i]?.nick?.toLowerCase() || list[i]?.name?.toLowerCase()) === document.location.pathname.slice(1).toLowerCase()) {
                delete list[i]
            }
        }
        uniqueArray = list.filter(function (item, pos) {
            if (configName !== SUGGESDET_CONFIG) {
                list.slice(0, list.length)
            }
            return list.indexOf(item) == pos;
        })
    }

    return (
        <div className={styles.suggestedCards} >
            <div className={styles.suggestedCardsTitle}>
                <div className={styles.suggestedCardsTitleContainer}>
                    <h3 className={styles.suggestedCardsTitleText}>
                        {componentTitle}
                    </h3>
                </div>
            </div>
            {uniqueArray.map(user => (
                <div tabIndex={0} className={styles.suggestedCard} key={user.numId} onClick={() => {
                    router.push({
                        pathname: `/${user.nick}`
                    });
                }}>
                    <div className={styles.suggestedDataHeader}>
                        <div tabIndex={-1} className={styles.suggestedImg}>
                            <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" />
                        </div>
                        <div className={styles.suggestedData}>
                            <Link href={`/${user.nick}`}>
                                <a className={styles.suggestedName}>
                                    <p className={styles.suggestedNameText}>
                                        {user.name}
                                    </p>
                                    <div className={classNames(styles.suggestedVerifiedImg, {
                                        [styles.verified]: user.verified,
                                    })}>
                                    </div>
                                </a>
                            </Link>
                            <div className={styles.suggestedUserName}>
                                {`@${user.nick}`}
                            </div>
                        </div>
                        <button className={styles.suggestedFollowBtn}>
                            Follow
                        </button>
                    </div>
                    <div className={styles.suggestedAbout}>
                        {user.about}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ConnectCards