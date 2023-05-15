import { TextField } from "@mui/material";
import { SongMetadata } from "./SongMetadata";
import { Song } from "./types/Song";
import { useState } from "react";

const songs: Song[] = [
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
  },
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
  },
];

export function App() {
  const [song, setSong] = useState("");
  return (
    <>
      <h1 className="animate-bounce underline pb-8 pt-8 font-mono text-5xl">
        Rob's Songs Baby
      </h1>
      <h2>Add Song</h2>
      <form className="pb-8">
        <TextField label="Title" />
      </form>
      {songs.map((song, index) => {
        return (
          <section className="mb-4 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 background-animate text-5xl bg-red-200 block w-1/2 min-w-fit p-6 border border-gray-200 rounded-lg drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div
              className="cursor-pointer background-animate bg-gradient-to-r from-red-500 via-purple-500 to-orange-500 text-3xl bg-clip-text text-transparent"
              key={`song-name-${index}`}
              onClick={() => alert("LINK BROKEN!!!")}
            >
              {`${song.title} - ${song.artist}`}
            </div>
            <div
              className="background-animate bg-gradient-to-r from-red-500 via-purple-500 to-orange-500 text-3xl bg-clip-text text-transparent"
              key={`album-${index}`}
            >
              {`Run Time: ${song.length}`}
            </div>
            <SongMetadata
              action="Created"
              date={song.createAt}
              email={song.createdBy}
            ></SongMetadata>

            <SongMetadata
              action="Updated"
              date={song.updatedAt}
              email={song.updatedBy}
            ></SongMetadata>
          </section>
        );
      })}
    </>
  );
}
