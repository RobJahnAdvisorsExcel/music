import { Button, CircularProgress, TextField } from "@mui/material";
import { SongMetadata } from "./SongMetadata";
import { Song } from "./types/Song";
import React, { useEffect, useMemo, useState } from "react";
import { GetSongsResponse, getSongs } from "./services/songService";
import { useQuery } from "react-query";

const initialSongs: Song[] = [
  {
    createdBy: "admin@email.com",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
    id: "1",
    image: "/assets/pink-floyd-time.gif",
  },
  {
    createdBy: "admin@email.com",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
    id: "2",
    image: "/assets/the-beatles-abbey-road.gif",
  },
];

type NewSong = Omit<
  Song,
  "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "image"
>;

type Errors = {
  artist?: string;
  title?: string;
  length?: string;
};

type Touched = {
  artist?: boolean;
  title?: boolean;
  length?: boolean;
};

type Props = "artist" | "title" | "length";

const newSong: NewSong = {
  artist: "",
  title: "",
  length: "",
};

const Stars = () => {
  return Array.from({ length: 10 }).map(() => (
    <div
      className="animate-spin absolute text-8xl -z-1"
      style={{
        left: Math.floor(Math.random() * 2000),
        top: Math.floor(Math.random() * 1500),
      }}
    >
      *
    </div>
  ));
};

type Status = "idle" | "submitting" | "submitted";

export function App() {
  const [song, setSong] = useState(newSong);
  const [createdSong, setCreatedSong] = useState<Song>();
  const [nextId, setNextId] = useState(3);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Touched>({});
  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSong({ ...song, [e.target.id]: e.target.value });
    setTimeout(() => document.getElementById(e.target.id)?.focus(), 1);
  }

  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const errors = validate();

  function validate() {
    const errors: Errors = {};
    if (!song.title) errors.title = "Title is required";
    if (!song.artist) errors.artist = "Artist is required";
    if (!song.length) errors.length = "Length is required";
    return errors;
  }

  function onSubmit() {
    setStatus("submitted");
    if (Object.keys(errors).length > 0) return;
    const freshSong = {
      createdBy: "admin@email.com",
      createdAt: "today",
      updatedAt: "today",
      updatedBy: "admin@email.com",
      artist: song.artist,
      title: song.title,
      length: song.length,
      id: `${nextId}`,
      image: "",
    };
    setCreatedSong(freshSong);
    setNextId(nextId + 1);
    initialSongs.push(freshSong);
    setSong(newSong);
    setStatus("idle");
    setTouched({});
  }

  const MyTextField = (args: { prop: Props }) => {
    return (
      <TextField
        label={(args.prop as string).toUpperCase()}
        id={args.prop}
        value={song[args.prop]}
        onChange={onChange}
        error={
          (status === "submitted" || touched[args.prop]) &&
          Boolean(errors[args.prop])
        }
        helperText={
          (status === "submitted" || touched[args.prop]) && errors[args.prop]
        }
        onBlur={(e) => setTouched({ ...touched, [e.target.id]: !false })}
      />
    );
  };

  return (
    <div>
      <h1 className="animate-bounce underline pb-8 pt-8 font-mono text-5xl">
        Rob's Songs Baby
      </h1>
      <h2>Add Song</h2>
      <form className="pb-8">
        <MyTextField prop="artist"></MyTextField>
        <MyTextField prop="title"></MyTextField>
        <MyTextField prop="length"></MyTextField>
        <Button variant="contained" onClick={onSubmit}>
          Add Song
        </Button>
      </form>
      {isLoading ? (
        <CircularProgress />
      ) : (
        songs?.map((song, index) => {
          return (
            <section
              key={`sec-${index}`}
              className="mb-4 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 background-animate text-5xl bg-red-200 block w-1/2 min-w-fit p-6 border border-gray-200 rounded-lg drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              style={{ backgroundImage: song.image }}
            >
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
                date={song.createdAt}
                email={song.createdBy}
              ></SongMetadata>

              <SongMetadata
                action="Updated"
                date={song.updatedAt}
                email={song.updatedBy}
              ></SongMetadata>
            </section>
          );
        })
      )}

      <Stars></Stars>

      <section>
        Song Added:
        <div>{createdSong?.title}</div>
        <div>{createdSong?.artist}</div>
        <div>{createdSong?.length}</div>
      </section>

      <footer className="bottom-0 left-1/2 absolute">{`Hit Counter: ${Math.floor(
        Math.random() * 100
      )}`}</footer>
    </div>
  );
}
