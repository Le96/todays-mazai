import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/api',
});

export const getLatestTweet = async () => instance.get('/tweets/latest');
export const getMedia = async () => instance.get('/media');
export const getTweetMedia = async (id) => instance.get(`/tweets/${id}/media`);
export const getTweets = async () => instance.get('/tweets');
export const getUser = async (id) => instance.get(`/users/${id}`);
export const getUsers = async () => instance.get('/users');
