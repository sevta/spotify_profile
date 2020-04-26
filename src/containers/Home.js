import React, { useState, useEffect } from "react";
import { logout, getPlayListsMe, getMe } from "../utils/spotify";
import Playlists from "../components/Playlists";

const mock = {
  country: "ID",
  display_name: "Sevta Saputra",
  email: "sevtasaputra@gmail.com",
  explicit_content: { filter_enabled: false, filter_locked: false },
  external_urls: {
    spotify: "https://open.spotify.com/user/217brn3ysktswy5pq657uqrmy",
  },
  followers: { href: null, total: 2 },
  href: "https://api.spotify.com/v1/users/217brn3ysktswy5pq657uqrmy",
  id: "217brn3ysktswy5pq657uqrmy",
  images: [
    {
      height: null,
      url:
        "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10207268058677979&height=300&width=300&ext=1590484477&hash=AeSCa-M6xbGFojdl",
      width: null,
    },
  ],
  product: "open",
  type: "user",
  uri: "spotify:user:217brn3ysktswy5pq657uqrmy",
};

const DEBUG = false;

export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!DEBUG) {
      getProfileData();
      getPlaylistsData();
    } else {
      setData(mock);
      setLoading(false);
    }
  }, []);

  function getProfileData() {
    getMe()
      .then((me) => {
        setData(me);
        setLoading(false);
        console.log(me);
      })
      .catch((err) => console.log(err));
  }

  function getPlaylistsData() {
    getPlayListsMe()
      .then((data) => setPlaylists(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full min-h-screen bg-green-900 p-10">
      <div className="flex justify-between items-center">
        <div className="text-3xl text-white font-semibold">Spotify</div>
        <div
          className="text-white cursor-pointer bg-green-500 px-6 text-xs font-bold py-1 rounded-full"
          onClick={logout}
        >
          Logout
        </div>
      </div>
      {loading ? (
        <div className="text-2xl text-white text-center">Loading...</div>
      ) : (
        <>
          <div className="header relative flex items-center justify-center flex-col pt-16">
            <div
              className="bg-blue-500 rounded-full overflow-hidden"
              style={{
                width: 120,
                height: 120,
              }}
            >
              <img src={data.images[0].url} alt="" />
            </div>
            <div className="text-3xl font-bold capitalize text-white mt-5">
              {data.display_name}
            </div>
            <div className="flex mt-5">
              <div className="flex text-white flex-col items-center capitalize mx-5">
                <div>followers</div>
                <div className="text-green-500 font-bold">
                  {data.followers.total}
                </div>
              </div>
              <div className="flex text-white flex-col items-center capitalize mx-5">
                <div>following</div>
                <div className="text-green-500 font-bold">0</div>
              </div>
              <div className="flex text-white flex-col items-center capitalize mx-5">
                <div>playlists</div>
                <div className="text-green-500 font-bold">0</div>
              </div>
            </div>
          </div>
          <Playlists playlists={playlists} />
        </>
      )}
    </div>
  );
}
