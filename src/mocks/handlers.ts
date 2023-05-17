// src/mocks/handlers.js
import { rest } from "msw";
import { songs } from "./songs";

export const handlers = [
  rest.get("/v1/songs", (req: any, res: any, ctx: any) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(songs),
      ctx.delay(2000)
    );
  }),
];
