import React from 'react'

const Havainto = ({ havainto }) => {

    return (
        <li className='havainto'>
            <h3>Laji: {havainto.laji}</h3>
            <p> Määrä: {havainto.maara}</p>
            <p>Päivämäärä:{havainto.pvm} <br></br>
                                Paikkakunta: {havainto.kunta} <br></br>
                                Paikka: {havainto.paikka}</p>
            <p>Havainnoija: {havainto.havainnoija}</p>
            <div >
                <button className="btn">Muokkaa havaintoa</button>
                <button className="btn">Poista havainto</button>
                <button className="btn">Tulosta havainto</button>
            </div>
        </li>
    )
}

export default Havainto