import React, { Component } from 'react'
import lintuhavaintodb from './lintuhavaintodb.json'

class Havainnot extends Component {
    render() {
        return (
            <div>
                <h2> Havainnot </h2>
                {
                    lintuhavaintodb.havainto.map((havainto, i) => {
                        return (
                            <div key={i}>
                                <div className="havainto">
                                    <h3>Laji: {havainto.laji}</h3>
                                    <p> Määrä: {havainto.määrä}</p>
                                    <p>Päivämäärä:{havainto.pvm} <br></br>
                                Paikkakunta: {havainto.kunta} <br></br>
                                Paikka: {havainto.paikka}</p>
                                    <p>Havainnoija: {havainto.havainnoija}</p>
                                    <div >
                                    <button className="btn">Muokkaa havaintoa</button>
                                    <button className="btn">Poista havainto</button>
                                    <button className="btn">Tulosta havainto</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div >
        )
    }
}



export default Havainnot