import React, { Component } from 'react';
import lintuhavaintodb from './lintupongari/lintuhavaintodb.json'

class Linnut extends Component {
    render() {
        return (
            <div>
                <h2> Lintutaulu </h2>
                {
                    lintuhavaintodb.lintu.map((lintu, i) => {
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
}
export default Linnut