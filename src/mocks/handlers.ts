// src/mocks/handlers.js
import { rest } from "msw";
import { songs } from "./songs";
import { CreateSongResponse, SongResponse } from "../services/songService";

export const handlers = [
  rest.get("/v1/songs", (req: any, res: any, ctx: any) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(songs),
      ctx.delay(2000)
    );
  }),

  rest.post("/v1/songs", async (req: any, res: any, ctx: any) => {
    const song = (await req.json()) as CreateSongResponse;
    const newSong: SongResponse = {
      type: "songs",
      id: "3",
      attributes: {
        ...song.data.attributes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "bob",
        updatedBy: "bob",
      },
    };
    songs.data.push(newSong);
    return res(
      // Respond with a 200 status code
      ctx.status(201),
      ctx.json(newSong),
      ctx.delay(0)
    );
  }),
];
