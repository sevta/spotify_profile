import React, { useEffect, useState } from "react";
import { getPlayLists } from "../utils/spotify";

export default function Playlists({ playlists }) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (playlists.length !== 0) setLoading(false);
    console.log(playlists);
  }, [playlists]);

  function onPlaylistClick(id) {
    getPlayLists(id)
      .then((data) => {
        setShowModal(true);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  if (loading)
    return <div className="text-white text-2xl py-24">Loading...</div>;

  return (
    <div className="playlists flex text-white flex-col overflow-x-hidden">
      <div className="text-2xl mb-5 capitalize">playlists</div>
      <div
        className="pl-conainer relative"
        style={{
          width: "calc(100% + 4%)",
        }}
      >
        <Row>
          {playlists.items.map((p, i) => (
            <Album
              key={i}
              img={p.images[0].url}
              name={p.name}
              total={p.tracks.total}
              onClick={() => onPlaylistClick(p.id)}
              extendStyle={{
                margin: "0px 0px 4% 4%",
                flex: "0 0 calc(20% - 4%)",
              }}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div
      className="pl-row flex flex-wrap w-full relative"
      style={{
        marginLeft: "-4%",
      }}
    >
      {children}
    </div>
  );
}

function Album({ img, name, total, extendStyle, ...rest }) {
  return (
    <div
      className="text-white flex flex-col  cursor-pointer"
      style={{
        ...extendStyle,
      }}
      {...rest}
    >
      <div className="h-full w-full rounded-lg overflow-hidden">
        <img src={img || null} alt="" />
      </div>
      <div className="flex flex-col mt-2 font-sans justify-start items-center text-center">
        <div className="capitalize font-semibold">{name || "-"}</div>
        <div className="text-sm text-gray-500">{total || "-"} Tracks</div>
      </div>
    </div>
  );
}
