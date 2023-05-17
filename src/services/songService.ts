import { Deserializer } from "jsonapi-serializer";
import ky from "ky";

type SongResponse = {
  type: "song";
  id: string;
  attributes: {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    artist: string;
    title: string;
    length: string;
  };
  relationships?: {
    album: {
      data: {
        type: "album";
        id: string;
      };
    };
    playlists?: {
      data: [
        {
          type: "playlists";
          id: string;
        }
      ];
    };
    likes?: {
      data: [
        {
          type: "likes";
          id: string;
        }
      ];
    };
  };
};

export type GetSongsResponse = {
  data: SongResponse[];
  included?: [
    {
      type: string;
      id: string;
      attributes: {
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
        name: string;
      };
      relationships: {
        songs: {
          data: [
            {
              type: string;
              id: string;
            }
          ];
        };
      };
    }
  ];
  links?: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
};

export async function getSongs(): Promise<GetSongsResponse[]> {
  const resp = (await ky(import.meta.env.VITE_API_BASE_URL + "v1/songs", {
    headers: {
      accept: "application/vnd.api+json",
      prefer: "code=500, dynamic=true",
    },
  }).json()) as GetSongsResponse;

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });

  return deserializer.deserialize(resp);
}