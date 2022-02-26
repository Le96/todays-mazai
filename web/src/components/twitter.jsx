import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.twitter.com',
});

export const PostOAuthRequestToken = async () => instance.post('/oauth/request_token');

export const notExist = () => { };
