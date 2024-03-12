
export const getUser = async (username: string) => {

  const res = await fetch(`http://localhost:3000/api/users/${username}`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.user;
}

export const getUserImage = async (username: string) => {

  const res = await fetch(`http://localhost:3000/api/users/${username}/image`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result;
}

export const getNickname = async (username: string) => {

  const res = await fetch(`http://localhost:3000/api/users/${username}/nickname`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.nickname;
}

export const getTweets = async (username: string) => {
  if (username === "0") {
    var res = await fetch("http://localhost:3000/api/tweets", {
      cache: "no-store"
    })
  } else {
    var res = await fetch(`http://localhost:3000/api/users/${username}/tweets`, {
      cache: "no-store"
    })
  }
  const result = await res.json();
  return result.tweets;
}

export const getTweet = async (tweetId: string) => {

  const res = await fetch(`http://localhost:3000/api/tweets/${tweetId}`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.tweet;
}
