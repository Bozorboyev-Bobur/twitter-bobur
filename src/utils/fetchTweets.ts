import { Tweet } from "../typings";

export const fetchTweets = async () => {
    const res = await fetch(`https://twitter-clone-finish-deploy.vercel.app/api/getTweets`)

    const data = await res.json();
    const tweets:Tweet[] = data.tweets;

    return tweets;
}