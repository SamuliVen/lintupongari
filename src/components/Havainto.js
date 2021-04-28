import React from 'react'

const Havainto = ({ havaintoList, deleteHavainto, printHavainto, updateForm, changeHavainto }) => {

    return (
        <div className="havainnot">
            <h2> Havainnot </h2>
            <ul>
                {havaintoList.map(havainto =>
                    <li key={havainto.id}>
                        <div id='sighting' className="havainto">
                            <h3>Laji: {havainto.laji}</h3>
                            <p> Määrä: {havainto.maara}</p>
                            <p> Paikkakunta: {havainto.kunta} <br></br>
                                Paikka: {havainto.paikka}<br></br>
                                Lisätiedot: {havainto.lisatiedot}</p>
                            <p>Havainnoija: </p>
                            <button className="btn" onClick={() => 
                            updateForm(havainto.id)}>Muokkaa havaintoa</button>
                            {/* <button className="btn" onClick={() =>
                                changeHavainto(havainto)}>Muokkaa havainto</button> */}
                            <button className="btn" onClick={() =>
                                deleteHavainto(havainto)}>Poista havainto</button>
                            <input type="button" className="btn" onClick={() => 
                            printHavainto('sighting')} value="Tulosta havainto" />
                        </div>
                    </li>
                )}
            </ul>
        </div >
    )
}

export default Havainto