import React from "react";

const Linnut = ({ lintuList }) => {
  const birdCard = (lintu) => (
    <div className="lintu">
      <h3>Laji: {lintu.laji}</h3>
      <p>Tieteellinen nimi: {lintu.tieteellinenNimi}</p>
      <img src={lintu.kuvaWikipediastaAPI} className="img" alt={lintu.laji} />
      <p>
        Lahko: {lintu.lahko} <br></br>
        Heimo: {lintu.heimo} <br></br>
        Suku: {lintu.suku}
      </p>
      <p>Elinvoimaisuus: {lintu.elinvoimaisuus}</p>
    </div>
  );

  return (
    <div className="lintutaulu">
      {lintuList.map((lintu, i) => {
        return <div key={i}>{birdCard(lintu)}</div>;
      })}
    </div>
  );
};

export default Linnut;
