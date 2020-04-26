import * as React from "react";

export default function Login({ ...rest }) {
  return (
    <div
      className="flex flex-1 justify-center items-center w-full flex-col h-screen bg-green-900"
      {...rest}
    >
      <div className="mb-5 font-bold text-3xl text-white">Your Spotify</div>
      <a
        className="btn bg-green-500 uppercase outline-none text-white px-10 py-3 rounded-full font-semibold"
        href="http://localhost:8888/login"
      >
        login to your spotify
      </a>
    </div>
  );
}
