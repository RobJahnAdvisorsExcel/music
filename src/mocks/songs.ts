import { GetSongsResponse } from "../services/songService";

export const songs: GetSongsResponse = {
  data: [
    {
      type: "song",
      id: "1",
      attributes: {
        createdBy: "admin@email.com",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        updatedBy: "admin@email.com",
        artist: "Pink Floyd",
        title: "Time",
        length: "6:53",
      },
    },
    {
      type: "song",
      id: "1",
      attributes: {
        createdBy: "admin@email.com",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        updatedBy: "admin@email.com",
        artist: "Pink Floyd",
        title: "Time",
        length: "6:53",
      },
    },
  ],
};
