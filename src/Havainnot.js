import React from 'react'

const Havainnot = ({ havaintoList, deleteHavainto }) => {

    return (
        <div>
            <h2> Havainnot </h2>
            <ul>
                {havaintoList.map(havainto =>
                    <div className="havainto">
                        <li>
                            <h3>Laji: {havainto.laji}</h3>
                            <p> Määrä: {havainto.maara}</p>
                            <p>Päivämäärä:{havainto.pvm} <br></br>
                                Paikkakunta: {havainto.kunta} <br></br>
                                Paikka: {havainto.paikka}<br></br>
                                Lisätiedot: {havainto.lisatiedot}</p>
                            <p>Havainnoija: {havainto.havainnoija}</p>

                            <button className="btn">Muokkaa havaintoa</button>
                            <button className="btn" onClick={() =>
                                deleteHavainto(havainto)}>Poista havainto</button>
                            <button className="btn">Tulosta havainto</button>
                        </li>
                    </div>
                )}
            </ul>
        </div >
    )
}

export default Havainnot