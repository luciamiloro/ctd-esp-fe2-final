import { rest } from "msw";
import { API_URL } from "../app/constants";

export const citaConNombre = {
  quote:
    "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
  character: "Homer Simpson",
  image:
    "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
  characterDirection: "Right",
};

export const citaAlAzar = {
  quote: "I'm sleeping in the bath tub.",
  character: "Marge Simpson",
  image:
    "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205",
  characterDirection: "Right",
};

export const handlers = [
  //array de peticiones
  rest.get(API_URL, (req, res, ctx) => {
    //url , funcion q recibe rec
    const citaFinal = req.url.searchParams.get("character")
      ? citaConNombre
      : citaAlAzar;

    return res(ctx.status(200), ctx.json([citaFinal]));

  }),
];
