import React from 'react';

const Linnut = ({ lintuList }) => {
    return (
        <div>
            <h2> Lintutaulu </h2>
            {lintuList.map((lintu, i) => {
                    return (
                        <div key={i}>
                            <div className="lintu">
                                <h3>Laji: {lintu.laji}</h3>
                                <p>Tieteellinen nimi: {lintu.tieteellinenNimi}</p>
                                <img src={lintu.kuvaWikipediastaAPI} className="img" style={{ width: 300 }} alt={lintu.laji} />
                                <p>Lahko:{lintu.lahko} <br></br>
                                    Heimo: {lintu.heimo} <br></br>
                                    Suku: {lintu.suku}</p>
                                <p>Elinvoimaisuus: {lintu.elinvoimaisuus}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Linnut