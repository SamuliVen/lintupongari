import React from 'react'

const Havainnot = ({ havaintoList, updateHavainto, deleteHavainto, printHavainto }) => {

    return (
        <div className = "havainnot">
            <h2> Havainnot </h2>
            <ul>
                {havaintoList.map(havainto =>
                    <div className="havainto">

                        <li><div id='sighting'>
                            <h3>Laji: {havainto.laji}</h3>
                            <p> Määrä: {havainto.maara}</p>
                            <p> Paikkakunta: {havainto.kunta} <br></br>
                                Paikka: {havainto.paikka}<br></br>
                                Lisätiedot: {havainto.lisatiedot}</p>
                            <p>Havainnoija: </p>
                        </div></li>
                        <button className="btn" onClick={() =>
                            updateHavainto(havainto)}>Muokkaa havaintoa</button>
                        <button className="btn" onClick={() =>
                            deleteHavainto(havainto)}>Poista havainto</button>
                        <input type="button" className="btn" onClick={() => printHavainto('sighting')} value="Tulosta havainto" />
                    </div>
                )}
            </ul>
        </div >
    )
}

export default Havainnot