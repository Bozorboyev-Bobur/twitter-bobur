import styles from './SideBar.module.scss'
import { WhoToFollow } from '../../components/WhoToFollow/WhoToFollow'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { TrendsForYou } from '../TrendsForYou'
import { Icon } from '@iconify/react'

export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBarScroll}>
                <div className={styles.sideBarContainer}>
                    <header className={styles.sideBarHeader}>
                        <div className={styles.sideBarSearchContainer}>
                            <div className={styles.sideBarSearchBox}>
                                <div className={styles.sideBarSearchImg}>
                                    <Icon icon="ri:search-line" color="#71767b" />
                                </div>
                                <input type="search" className={styles.sideBarSearchInput} placeholder='Search Twitter' />
                            </div>
                        </div>
                    </header>
                    <div className={styles.sideBarContent}>
                        <TrendsForYou />
                        <WhoToFollow />
                    </div>
                </div>
            </div>
            <div className={styles.sideBarBg}></div>
        </div>
    )
}   