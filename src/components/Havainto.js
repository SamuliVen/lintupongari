import React from "react";
import Togglable from "./Togglable";

const Havainto = ({
  changeHavainto,
  havaintoList,
  deleteHavainto,
  printHavainto,
  changedmaara,
  handleUpdateMaaraChange,
  changedkunta,
  handleUpdateKuntaChange,
  changedpaikka,
  handleUpdatePaikkaChange,
  changedlisatiedot,
  handleUpdateTiedotChange,
}) => {
  return (
    <div className="havainnot">
      <h2> Havainnot </h2>
      <ul>
        {havaintoList.map((havainto) => (
          <li key={havainto.id}>
            <div id={havainto.id} className="havainto">
              <h3>Laji: {havainto.laji}</h3>
              <p> Määrä: {havainto.maara}</p>
              <p>
                {" "}
                Paikkakunta: {havainto.kunta} <br></br>
                Paikka: {havainto.paikka}
                <br></br>
                Lisätiedot: {havainto.lisatiedot}
              </p>
              <p>Havainnoija: {havainto.user.username}</p>
              <Togglable buttonLabel="Muokkaa havaintoa">
                <div>
                  <h4>Päivitä havainto</h4>
                  <form className="changeForm">
                    <div>
                      Määrä:
                      <input
                        value={changedmaara}
                        onChange={handleUpdateMaaraChange}
                      />
                    </div>
                    <div>
                      Kunta:
                      <input
                        value={changedkunta}
                        onChange={handleUpdateKuntaChange}
                      />
                    </div>
                    <div>
                      Paikka:
                      <input
                        value={changedpaikka}
                        onChange={handleUpdatePaikkaChange}
                      />
                    </div>
                    <div>
                      Lisätiedot:
                      <input
                        value={changedlisatiedot}
                        onChange={handleUpdateTiedotChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      onClick={() => changeHavainto(havainto.id)}
                    >
                      Tallenna
                    </button>

                    <button type="reset" className="btn">
                      Tyhjennä
                    </button>
                  </form>
                </div>
              </Togglable>
              <button className="btn" onClick={() => deleteHavainto(havainto)}>
                Poista havainto
              </button>
              <input
                type="button"
                className="btn"
                onClick={() => printHavainto(havainto.id)}
                value="Tulosta havainto"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Havainto;
