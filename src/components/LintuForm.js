import React from 'react'

const LintuForm = ({ addHavainto, newLaji, maara, pvm, kunta, paikka,
    lisatiedot, havainnoija, handleLajiChange, handleMaaraChange, handlePvmChange,
    handleKuntaChange, handlePaikkaChange, handleTiedotChange, handleHavainnojaChange }) => {
    return (
        <form onSubmit={addHavainto} className="lintuform">
            <div>
                Laji: <input value={newLaji} onChange={handleLajiChange} />
            </div>
            <div>
                Määrä: <input value={maara} onChange={handleMaaraChange} />
            </div>
            <div>
                Päivämäärä: <input value={pvm} onChange={handlePvmChange} />
            </div>
            <div>
                Kunta: <input value={kunta} onChange={handleKuntaChange} />
            </div>
            <div>
                Paikka: <input value={paikka} onChange={handlePaikkaChange} />
            </div>
            <div>
                Lisätiedot: <input value={lisatiedot} onChange={handleTiedotChange} />
            </div>
            <div>
                Havainnoija: <input value={havainnoija} onChange={handleHavainnojaChange} />
            </div>
            <button type="submit">Tallenna</button>
            <button type="reset">Tyhjennä</button>
        </form>
    )
}

export default LintuForm