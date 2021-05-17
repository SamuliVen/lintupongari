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
  const formInput = ({ subject, value, onChange }) => (
    <tr>
      <td>{subject}</td>
      <td>
        <input value={value} onChange={onChange} />
      </td>
    </tr>
  );

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
                              {formInput({
                                subject: "Määrä:",
                                changedmaara,
                                handleUpdateMaaraChange,
                              })}
                              {formInput({
                                subject: "Kunta:",
                                changedkunta,
                                handleUpdateKuntaChange,
                              })}
                              {formInput({
                                subject: "Paika:",
                                changedpaikka,
                                handleUpdatePaikkaChange,
                              })}
                              {formInput({
                                subject: "Lisätiedot:",
                                changedlisatiedot,
                                handleUpdateTiedotChange,
                              })}
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
      </ul>
    </div>
  );
};

export default Havainto;
