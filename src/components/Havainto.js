import React from "react";
import Togglable from "./Togglable";

const Havainto = ({
  user,
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
    <div>
      <h2 className="lintuOtsikko"> Havainnot </h2>
      <div className="havainnot">
        {havaintoList.map((havainto) => (
          <li key={havainto.id} style={{ listStyleType: "none" }}>
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
              <div>
                {" "}
                {user !== null ? (
                  <div>
                    <Togglable buttonLabel="Muokkaa havaintoa">
                      <div>
                        <h4>Päivitä havainto</h4>
                        <form className="changeForm">
                          <table>
                            <tbody>
                            <tr>
                              <td>Määrä:</td>
                              <td>
                                <input
                                  value={changedmaara}
                                  onChange={handleUpdateMaaraChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Kunta:</td>
                              <td>
                                <input
                                  value={changedkunta}
                                  onChange={handleUpdateKuntaChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Paikka:</td>
                              <td>
                                <input
                                  value={changedpaikka}
                                  onChange={handleUpdatePaikkaChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Lisätiedot:</td>
                              <td>
                                <input
                                  value={changedlisatiedot}
                                  onChange={handleUpdateTiedotChange}
                                />
                              </td>
                            </tr>
                            </tbody>
                          </table>
                          <br></br>
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
                    <br></br>
                    <br></br>
                    <button
                      className="btn"
                      onClick={() => deleteHavainto(havainto)}
                    >
                      Poista havainto
                    </button>
                    <input
                      type="button"
                      className="btn"
                      onClick={() => printHavainto(havainto.id)}
                      value="Tulosta havainto"
                    />{" "}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Havainto;
