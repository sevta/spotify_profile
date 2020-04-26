/**
 * see the refrence flow
 * https://github.com/bchiang7/spotify-profile/blob/master/client/src/spotify/index.js
 */

import queryString from "querystring";
import axios from "axios";
import Spotify from "spotify-web-api-js";

let spotify = new Spotify();

const ACCESS_TOKEN = "spotify_access_token";
const REFRESH_TOKEN = "spotify_refresh_token";

export const getLocalAccessToken = window.localStorage.getItem(ACCESS_TOKEN);
export const getLocalRefreshToken = window.localStorage.getItem(REFRESH_TOKEN);

export const setLocalAccessToken = (token) =>
  window.localStorage.setItem(ACCESS_TOKEN, token);
export const setLocalRefreshToken = (token) =>
  window.localStorage.setItem(REFRESH_TOKEN, token);

export const refreshToken = () => {
  axios
    .get(
      `http://localhost:8888/refresh_token?refresh_token=${getLocalRefreshToken}`
    )
    .then((data) => {
      setLocalAccessToken(data.data.access_token);
      spotify.setAccessToken(data.data.access_token);
    })
    .catch((err) => console.log(err));
  window.location.reload();
};

export const getAccessToken = () => {
  let url = window.location.hash.substring(1);
  let parseUrl = queryString.parse(url);
  let access_token = parseUrl.access_token;
  let refresh_token = parseUrl.refresh_token;

  if (
    !getLocalRefreshToken ||
    getLocalRefreshToken == "undefined" ||
    getLocalRefreshToken == null
  ) {
    setLocalRefreshToken(refresh_token);
  }
  if (
    !getLocalAccessToken ||
    getLocalAccessToken == "undefined" ||
    getLocalAccessToken == null
  ) {
    setLocalAccessToken(access_token);
    spotify.setAccessToken(access_token);
    return access_token;
  }

  const localAccessToken = getLocalAccessToken;
  spotify.setAccessToken(localAccessToken);
  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = "http://localhost:1234";
  // window.location.reload();
};

export const getMe = async () => {
  let me;
  try {
    me = await spotify.getMe();
  } catch (err) {
    console.log(err);
  }
  return me;
};

export const getPlayListsMe = async () => {
  let playlists;
  try {
    playlists = await spotify.getUserPlaylists();
  } catch (error) {
    console.log(error);
  }
  return playlists;
};

export const getPlayLists = async (id) => {
  let playlists;
  try {
    playlists = await spotify.getPlaylist(id);
  } catch (error) {
    console.log(error);
  }
  return playlists;
};
