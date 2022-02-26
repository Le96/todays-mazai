#!/usr/bin/env python3

import json
import logging
import os
import pathlib
import sys
import time
from typing import Dict, List, Union

import requests
import tweepy

ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")
CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
CONSUMER_SECRET = os.getenv("TWITTER_CONSUMER_SECRET")

API_HOST = os.getenv("API_HOST")

API_ENDPOINT = f"http://{API_HOST}"
API_ENDPOINT_MEDIA = f"{API_ENDPOINT}/media"
API_ENDPOINT_TWEETS = f"{API_ENDPOINT}/tweets"
API_ENDPOINT_USERS = f"{API_ENDPOINT}/users"

INTERVAL_SECOND = 20
MAX_RESULTS = 100
QUERY = "#TodaysMazai -is:retweet"
EXPANSIONS = ["attachments.media_keys", "author_id"]
MEDIA_FIELDS = ["url"]
TWEET_FIELDS = ["author_id", "created_at", "id", "text"]
USER_FIELDS = ["created_at", "profile_image_url"]

LOGGER = logging.getLogger(__name__)
LOGGER.addHandler(logging.StreamHandler())


def initialize_client() -> tweepy.Client:
    return tweepy.Client(
        consumer_key=CONSUMER_KEY,
        consumer_secret=CONSUMER_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
        wait_on_rate_limit=True,
    )


def parse(response: tweepy.Response) -> None:
    users = requests.get(API_ENDPOINT_USERS).json()
    print(users)
    parse_users(response, users)
    tweets = requests.get(API_ENDPOINT_TWEETS).json()
    print(tweets)
    media = requests.get(API_ENDPOINT_MEDIA).json()
    print(media)
    parse_tweets(response, tweets, media)


def parse_tweets(response: tweepy.Response, tweets: List[Dict[str, str]], media: List[Dict[str, str]]) -> None:
    response_data: List[tweepy.Tweet]
    if isinstance(response.data, list):
        response_data = response.data
    else:
        response_data = [response.data]
    for tweet in response_data:
        user: tweepy.User
        author: tweepy.User
        for user in response.includes["users"]:
            if user.id == tweet.author_id:
                author = user
                break
        data = {
            "id": str(tweet.id),
            "created_at": tweet.created_at.isoformat(),
            "author_id": str(tweet.author_id),
            "author_username": author.username,
            "author_name": author.name,
            "text": tweet.text,
        }
        if data["id"] not in [existing_tweet["id"] for existing_tweet in tweets]:
            api_response = requests.post(API_ENDPOINT_TWEETS, data=json.dumps(data)).json()
            print(api_response)
    medium: tweepy.Media
    for medium in response.includes["media"]:
        data = {
            "media_key": medium.media_key,
            "type": medium.type,
            "url": medium.url,
        }
        target_tweet: tweepy.Tweet
        for tweet in response_data:
            if medium.media_key in tweet.attachments["media_keys"]:
                target_tweet = tweet
                break
        data["tweet_id"] = str(target_tweet.id)
        if data["media_key"] not in [existing_medium["media_key"] for existing_medium in media]:
            api_response = requests.post(API_ENDPOINT_MEDIA, data=json.dumps(data)).json()
            print(api_response)


def parse_users(response: tweepy.Response, users: List[Dict[str, Union[bool, str]]]) -> None:
    user: tweepy.User
    for user in response.includes["users"]:
        data = {
            "id": str(user.id),
            "username": user.username,
            "name": user.name,
            "created_at": user.created_at.isoformat(),
            "profile_image_url": user.profile_image_url,
        }
        if data["id"] in [existing_user["id"] for existing_user in users]:
            api_response = requests.put(API_ENDPOINT_USERS, data=json.dumps(data)).json()
        else:
            api_response = requests.post(API_ENDPOINT_USERS, data=json.dumps(data)).json()
        print(api_response)


def pre_check(client: tweepy.Client) -> None:
    target: pathlib.Path
    target = pathlib.Path("/app/target.log")
    with target.open("r", encoding="utf-8") as file:
        target_id: str
        for target_id in file:
            target_id = target_id.strip()
            response = client.get_tweet(
                target_id,
                expansions=EXPANSIONS,
                media_fields=MEDIA_FIELDS,
                tweet_fields=TWEET_FIELDS,
                user_fields=USER_FIELDS,
                user_auth=True,
            )
            parse(response)


def search(client: tweepy.Client) -> tweepy.Response:
    result = client.search_recent_tweets(
        query=QUERY,
        expansions=EXPANSIONS,
        max_results=MAX_RESULTS,
        media_fields=MEDIA_FIELDS,
        tweet_fields=TWEET_FIELDS,
        user_fields=USER_FIELDS,
        user_auth=True,
    )
    return result


def main() -> None:
    client = initialize_client()
    pre_check(client)
    while True:
        time.sleep(INTERVAL_SECOND)
        response = search(client)
        parse(response)


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        sys.exit(1)
