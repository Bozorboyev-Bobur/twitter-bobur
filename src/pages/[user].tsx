import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { NavigationBar } from "../components/NavigationBar";
import { SideBar } from "../components/SideBar";
import styles from '../../styles/user.module.scss'
import { ReactElement, ReactHTMLElement, useEffect, useRef, useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { WHOTOFOLLOW_CONFIG } from '../constants/index'
import classNames from "classnames";
import TweetComponent from "../components/Post/Post";
import ConnectCards from "../components/ConnectCards/ConnectCards";
import { WhoToFollow } from "../components/WhoToFollow";
import { Session } from "inspector";
import { Tweet } from "../typings"
import { Icon } from "@iconify/react";

interface Props {
    tweets: Tweet[]
}

export default function User({ user, allUsers }, { tweets }: Props) {
    const [follow, setFollow] = useState(user.youFollowing)

    const followBtnValue = follow ? 'Following' : 'Follow'

    const followToggler = (): void => {
        setFollow(!user.youFollowing)
    }

    const userImgModalBgRef = useRef<HTMLDivElement>(null)
    const userBgImgModaBgRef = useRef<HTMLDivElement>(null)
    const userBgImgContainerRef = useRef<HTMLDivElement>(null)

    const [isImgModalOpen, setIsImgModalOpen] = useState<boolean>(false)
    const [followBtnSticky, setFollowBtnSticky] = useState<boolean>(false)

    const [isBgImgModalOpen, setIsBgImgModalOpen] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)
    const [headerTitle, setHeaderTitle] = useState<string>('')
    const likesCountText = user.likedTweets && user.likedTweets.length === 1 ? 'Like' : 'Likes'

    const modalCloseHandler = (): void => {
        setIsImgModalOpen(false) >
            setIsBgImgModalOpen(false)
    }

    useEffect(() => {
        const followBtn: any = document.querySelector('#followBtn')
        window.addEventListener('scroll', () => {
            if (followBtn.getBoundingClientRect().top < 20) {
                setFollowBtnSticky(true)
            } else {
                setFollowBtnSticky(false)
            }
        })
    })

    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setIsBgImgModalOpen(false)
            }
        })
        if (isBgImgModalOpen) {
            userBgImgModaBgRef.current.style.opacity = '1'
            userBgImgModaBgRef.current.style.zIndex = '999'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsBgImgModalOpen(true)
        } else {
            userBgImgModaBgRef.current.style.opacity = '0'
            userBgImgModaBgRef.current.style.zIndex = '-1'
            document.body.style.overflow = 'initial'
            document.body.style.marginRight = ''
        }

        if (user.bgImg === "") {
            userBgImgContainerRef.current.style.cursor = "inherit"
        } else {
            userBgImgContainerRef.current.style.cursor = "pointer"
        }
    }, [setIsBgImgModalOpen, isBgImgModalOpen])
    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setIsImgModalOpen(false)
            }
        })

        if (isImgModalOpen) {
            userImgModalBgRef.current.style.opacity = '1'
            userImgModalBgRef.current.style.zIndex = '999'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsImgModalOpen(true)
        } else {
            userImgModalBgRef.current.style.opacity = '0'
            userImgModalBgRef.current.style.zIndex = '-1'
            document.body.style.overflow = 'initial'
            document.body.style.marginRight = ''
        }
        if (user.img === "") {
            userBgImgContainerRef.current.style.cursor = "inherit"
        } else {
            userBgImgContainerRef.current.style.cursor = "pointer"
        }
    }, [setIsImgModalOpen, isImgModalOpen])

    useEffect(() => {
        if (index === 0) {
            setHeaderTitle(`${user.tweets && user.tweets.length} Tweets`)
        }
        else if (index === 1) {
            setHeaderTitle(`${user.tweets && user.tweets.length} Tweets`)
        }
        else if (index === 2) {
            setHeaderTitle('0 Photos & videos')
        }
        else if (index === 3) {
            setHeaderTitle(`${user.likedTweets && user.likedTweets.length} ${likesCountText}`)
        }
    })

    return (
        <>
            <div className={styles.userContainer}>
                <Head>
                    <title>
                        {user.name} (@{user.nick}) / Twitter
                    </title>
                </Head>
                <NavigationBar tweets={tweets} />
                <div className={styles.user}>
                    <div className={styles.userHeader}>
                        <div className={styles.userHeaderLeft}>
                            <div className={styles.userHeaderBackBtnContainer}>
                                <button className={styles.userHeaderBackBtn} onClick={() => {
                                    history.back()
                                }}>
                                    <Icon icon="material-symbols:arrow-back" width='24' height='24' />
                                </button>
                            </div>
                            <div className={styles.userTitle}>
                                <div className={styles.userTitleContainer}>
                                    <h2 className={styles.userTitleText}>
                                        {user.name}
                                    </h2>
                                    <div className={classNames(styles.userVerifiedImg, {
                                        [styles.verified]: user.verified,
                                    })}>
                                    </div>
                                </div>
                                <div className={styles.userTweets}>
                                    {headerTitle}
                                </div>
                            </div>
                        </div>
                        <div className={styles.userHeaderRight}>
                            <button className={classNames(styles.userBodyFixedFollowBtn, {
                                [styles.fixed]: followBtnSticky,
                            })} onClick={followToggler}>
                                {followBtnValue}
                            </button>
                        </div>
                    </div>
                    <div ref={userBgImgContainerRef} className={'userBgImgContainer'} onClick={() => {
                        if (user.bgImg === "") {
                            setIsBgImgModalOpen(false)
                        } else {
                            setIsBgImgModalOpen(true)
                        }
                    }}>
                        <style jsx >{`
                    .userBgImgContainer {
                        background-image: url(${user.bgImg});
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        width: 100%;
                        max-height: 200px;
                        min-height: 200px;
                        height: 100%;
                        top: 52px;
                        z-index: 0;
                        background-color: rgb(207, 217, 222);
                        cursor: pointer;
                    }
                    @media only screen and (max-width: 600px) {
                        .userBgImgContainer{
                            min-height: 160px
                        }
                    }
                    @media only screen and (max-width: 499px) {
                        .userBgImgContainer{
                            min-height: 140px
                        }
                    }
                    `}</style>
                    </div>
                    <div className={styles.userBody}>
                        <div className={styles.userBodyImgContainer} onClick={() => {
                            setIsImgModalOpen(true)
                        }}>
                            <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" className={styles.userBodyImg} />
                        </div>
                        <div className={styles.userBodyRight}>
                            <button className={styles.userBodyMoreBtn}>
                                ...
                            </button>
                            <button id="followBtn" className={styles.userBodyFollowBtn} onClick={followToggler}>
                                {followBtnValue}
                            </button>
                        </div>
                        <div className={styles.userBodyNameContainer}>
                            <div className={styles.userBodyName}>
                                <div className={styles.userBodyNameText}>
                                    {user.name}
                                </div>
                                <div className={classNames(styles.userVerifiedImg, {
                                    [styles.verified]: user.verified,
                                })}>
                                </div>
                            </div>
                            <div className={styles.userBodyNickName}>
                                @{user.nick}
                            </div>
                        </div>

                        <div className={styles.userInfos}>
                            <div className={styles.userInfosAbout}>
                                {user.about}
                            </div>
                            <div className={styles.userInfosOtherInfos}>
                                <div className={classNames({
                                    [styles.displayNone]: !user.proAccountExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <svg className={'iconSvg'} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_448_163)">
                                                    <path d="M32 28H4V21.32C3.25525 20.9633 2.57843 20.4794 2 19.89V28C2 28.5304 2.21071 29.0392 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H32C32.5304 30 33.0391 29.7893 33.4142 29.4142C33.7893 29.0392 34 28.5304 34 28V19.89C33.4258 20.4817 32.7479 20.963 32 21.31V28Z" fill="#0F1419" />
                                                    <path d="M25 22.3999C25.2652 22.3999 25.5196 22.2946 25.7071 22.107C25.8946 21.9195 26 21.6652 26 21.3999V15.9399H24V17.9999H14V19.9999H24V21.3999C24 21.6652 24.1054 21.9195 24.2929 22.107C24.4804 22.2946 24.7348 22.3999 25 22.3999Z" fill="#0F1419" />
                                                    <path d="M33 5.99995H24V4.37995C23.9895 3.73985 23.7257 3.13001 23.2665 2.68394C22.8074 2.23787 22.1901 1.99192 21.55 1.99995H14.45C13.8099 1.99192 13.1926 2.23787 12.7335 2.68394C12.2743 3.13001 12.0105 3.73985 12 4.37995V5.99995H3C2.73478 5.99995 2.48043 6.1053 2.29289 6.29284C2.10536 6.48038 2 6.73473 2 6.99995V14.9999C2 16.326 2.52678 17.5978 3.46447 18.5355C4.40215 19.4732 5.67392 19.9999 7 19.9999H10V21.3999C10 21.6652 10.1054 21.9195 10.2929 22.1071C10.4804 22.2946 10.7348 22.3999 11 22.3999C11.2652 22.3999 11.5196 22.2946 11.7071 22.1071C11.8946 21.9195 12 21.6652 12 21.3999V15.9399H10V17.9999H7C6.20435 17.9999 5.44129 17.6839 4.87868 17.1213C4.31607 16.5587 4 15.7956 4 14.9999V7.99995H32V14.9999C32 15.7956 31.6839 16.5587 31.1213 17.1213C30.5587 17.6839 29.7956 17.9999 29 17.9999H28V19.9999H29C30.3261 19.9999 31.5979 19.4732 32.5355 18.5355C33.4732 17.5978 34 16.326 34 14.9999V6.99995C34 6.73473 33.8946 6.48038 33.7071 6.29284C33.5196 6.1053 33.2652 5.99995 33 5.99995ZM22 5.99995H14V4.42995C14.0052 4.3141 14.0548 4.20471 14.1387 4.1246C14.2225 4.04449 14.334 3.99983 14.45 3.99995H21.56C21.6165 3.99862 21.6727 4.00843 21.7253 4.02882C21.778 4.04921 21.8262 4.07978 21.867 4.11878C21.9079 4.15779 21.9407 4.20446 21.9635 4.25613C21.9863 4.30781 21.9987 4.36347 22 4.41995V5.99995Z" fill="#0F1419" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_448_163">
                                                        <rect width="36" height="36" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            {user.proAccount}
                                        </div>
                                        <div className={classNames(styles.userInfosOtherInfosImg, styles.userInfosOtherInfosSecondImg)}>
                                            <svg className={'iconSvg'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z" fill="#0F1419" />
                                                <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" fill="#0F1419" />
                                                <path d="M12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10Z" fill="#0F1419" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames({
                                    [styles.displayNone]: !user.locationExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <Icon icon="mi:location" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            {user.location}
                                        </div>
                                    </div>
                                </div>
                                <Link href={`https://${user.otherLink}`}>
                                    <a className={classNames({
                                        [styles.displayNone]: !user.otherLinkExistence,
                                    })}>
                                        <div className={styles.userInfosOtherInfo}>
                                            <div className={styles.userInfosOtherInfosImg}>
                                                <Icon icon="ph:link-simple" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                            </div>
                                            <div className={styles.userInfosOtherInfosText}>
                                                <div className={classNames({
                                                    [styles.otherLink]: user.otherLinkExistence
                                                })}>
                                                    {user.otherLink && user.otherLink.toLowerCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <div className={classNames({
                                    [styles.displayNone]: !user.bornDateExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <Icon icon="tabler:ballon" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            Born {user.bornDate}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.userInfosOtherInfo}>
                                    <div className={styles.userInfosOtherInfosImg}>
                                        <Icon icon="uiw:date" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                    </div>
                                    <div className={styles.userInfosOtherInfosText}>
                                        Joined {user.joined}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.userInfosFollows}>
                                <Link href={`${user.nick}/follow`}>
                                    <a className={styles.userInfosFollowings}>
                                        <div className={styles.userInfosFollowingsNum}>
                                            {user.following}
                                        </div> Following
                                    </a>
                                </Link>
                                <Link href={`${user.nick}/followers`}>
                                    <a className={styles.userInfosFollowers}>
                                        <div className={styles.userFollowersNum}>
                                            {user.followers}
                                        </div>Followers
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userCategory}>
                        <ul className={styles.userCategoryList}>
                            <li className={`${styles.userCategoryItem} ${index === 0 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(0)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Tweets
                                    <div className={styles.userCategoryStick} hidden={index !== 0}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 1 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(1)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Tweets & replies
                                    <div className={styles.userCategoryStick} hidden={index !== 1}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 2 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(2)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Media
                                    <div className={styles.userCategoryStick} hidden={index !== 2}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 3 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(3)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Likes
                                    <div className={styles.userCategoryStick} hidden={index !== 3}></div>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.userContentWrapper}>
                        <div className={styles.userContent} hidden={index !== 0}>
                            <div className={styles.userConnectCardsContainer}>
                                <ConnectCards componentTitle={"Who to follow"} configName={WHOTOFOLLOW_CONFIG} />
                                <Link href={'/connect'}>
                                    <a className={styles.whoToFollowShowMoreLink}>
                                        <div className={styles.whoToFollowShowMoreText}>
                                            Show more
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            {user.tweets && user.tweets.map(tweet => (
                                <TweetComponent key={tweet._id} tweet={tweet} tweets={tweets} />
                            ))}
                        </div>
                        <div className={styles.userContent} hidden={index !== 1}>
                            <div className={styles.userConnectCardsContainer}>
                                <ConnectCards componentTitle={"Who to follow"} configName={WHOTOFOLLOW_CONFIG} />
                                <Link href={'/connect'}>
                                    <a className={styles.whoToFollowShowMoreLink}>
                                        <div className={styles.whoToFollowShowMoreText}>
                                            Show more
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.userContent} hidden={index !== 2}>
                            {user.tweets && user.tweets.map((tweet, index) => {
                                if (tweet.type === "media") {
                                    return (
                                        <TweetComponent key={`${user.nickname}${Math.random()}`} tweet={tweet} tweets={tweets} />
                                    )
                                }
                            }
                            )}
                        </div>
                        <div className={styles.userContent} hidden={index != 3}>
                            {user.likedTweets && user.likedTweets.map((likedTweet: any) => {
                                for (let i = 0; i < allUsers.length; i++) {
                                    for (let j = 0; j < allUsers[i].tweets.length; j++) {
                                        if (allUsers[i].tweets[j]._id === likedTweet) {
                                            return (
                                                <TweetComponent key={`${Math.random()}`} tweet={allUsers[i].tweets[j]} tweets={tweets} />
                                            )
                                        }
                                        // <div className={styles.userContentLikes}>
                                        //     <div className={styles.userContentLikesTitle}>
                                        //         @{user.nick} hasn’t liked any Tweets
                                        //     </div>
                                        //     <div className={styles.userContentLikesDescription}>
                                        //         When they do, those Tweets will show up here.
                                        //     </div>
                                        // </div>
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
                <SideBar />
                <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" className={classNames
                    (styles.userImgModal, {
                        [styles.userImgModalActive]: isImgModalOpen,
                    })} />
                <div ref={userImgModalBgRef} className={styles.userImgModalBg} onClick={() => {
                    modalCloseHandler()
                }}>
                </div>
                <img src={`${user.bigBgImg}`} alt="" className={classNames
                    (styles.userBgImgModal, {
                        [styles.userBgImgModalActive]: isBgImgModalOpen,
                    })} />
                <div ref={userBgImgModaBgRef} className={styles.userBgImgModalBg} onClick={() => {
                    modalCloseHandler()
                }}>
                </div>
            </div>
        </>
    )
}

User.getInitialProps = async (ctx: any) => {
    const response = await fetch(`http://localhost:4200/users/${ctx.query.user}`)
    const allUsersResponse = await fetch(`http://localhost:4200/users`)
    const user = await response.json()
    const allUsers = await allUsersResponse.json()

    return {
        user,
        allUsers
    }
}