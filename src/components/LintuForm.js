import React from 'react'

const LintuForm = ({ addHavainto, newLaji, handleLajiChange }) => {
    return (
        <form onSubmit={addHavainto}>
            <div>
                laji: <input 
                value={newLaji}
                onChange={handleLajiChange} />
            </div>
            <div>

            </div>
        </form>
    )
}

export default LintuForm