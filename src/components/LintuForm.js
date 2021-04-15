import React from 'react'

const LintuForm = ({ addHavainto, newLaji, maara, pvm, kunta, paikka, lisatiedot,
    handleLajiChange, handleMaaraChange, handlePvmChange, handleKuntaChange, handlePaikkaChange, handleTiedotChange }) => {
    return (
        <form onSubmit={addHavainto}>
            <div>
                Laji: <input value={newLaji} onChange={handleLajiChange} />
                Määrä: <input value={maara} onChange={handleMaaraChange} />
                Päivämäärä: <input value={pvm} onChange={handlePvmChange} />
                Kunta: <input value={kunta} onChange={handleKuntaChange} />
                Paikka: <input value={paikka} onChange={handlePaikkaChange} />
                Lisätiedot: <input value={lisatiedot} onChange={handleTiedotChange} />
            </div>
        </form>
    )
}

export default LintuForm