import { INoticias} from "./INoticias";

export const CalcularMinutosDePublicada:(objeto:INoticias) => number = (objeto:any) => {
  const ahora = new Date();
  const minutos = Math.floor((ahora.getTime() - objeto.fecha.getTime()) / 60000);
  return minutos;
};
