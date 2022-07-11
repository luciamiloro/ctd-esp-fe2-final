import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import {CalcularMinutosDePublicada} from "./Utils/CalcularMinutosDePublicada";
import {INoticiasNormalizadas} from "./Utils/INoticiasNormalizadas";
import {MayusculasEnPalabras} from "./Utils/MayusculasEnPalabras";
import {NoticiaFinal} from "./Utils/NoticiaFinal";
import CardNoticias from "./Utils/CardNoticias";


import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

/***
 * El principio Single Responsability:  se refactorizo parte del codigo agregando componente CardNoticias.
 */
const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = MayusculasEnPalabras(n);
  
    const minutosTranscurridos = CalcularMinutosDePublicada(n);
    return NoticiaFinal(n, minutosTranscurridos, titulo);
        
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <CardNoticias key={n.id} noticia={n} setModal={setModal} />
         /* <TarjetaNoticia key={n.id} >
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>*/

        ))}
        {modal ? (
          (!modal.esPremium) ? (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                  <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </DescripcionModal>
                  <BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          ) : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;