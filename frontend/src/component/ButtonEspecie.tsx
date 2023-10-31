import React from 'react';

const ButtonEspecie: React.FC<{
  especie: string,
  seccion_visible: boolean,
  setSeccion: (seccion: boolean) => void
}> = (
  {
    especie,
    seccion_visible,
    setSeccion
  }
) => {
    if (especie === undefined) {
      return <></>;
    } else {

      return (<div className={`separador ${seccion_visible ? 'visible' : ''}`}>
        <button className="boton" onClick={() => setSeccion(!seccion_visible)}>
          <img src={`/icons/${especie}.png`} style={{
            height: '100%',
          }} />
        </button>
      </div>);
    }
  };

export default ButtonEspecie;
