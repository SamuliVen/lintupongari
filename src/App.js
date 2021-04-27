import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import LintuService from "./services/LintuService";
import Havainto from "./components/Havainto";
import loginService from "./services/login";
import Register from "./components/Register";
import Togglable from "./components/Togglable";
import Linnut from "./Linnut";
import "./index.css";

const App = () => {
  const [havaintoList, setHavaintoList] = useState([]);
  const [lintuList, setLintuList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [laji, setLaji] = useState("");
  const [maara, setMaara] = useState("");
  const [kunta, setKunta] = useState("");
  const [paikka, setPaikka] = useState("");
  const [lisatiedot, setLisatiedot] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [changedmaara, setChangedMaara] = useState("");
  const [changedkunta, setChangedKunta] = useState("");
  const [changedpaikka, setChangedPaikka] = useState("");
  const [changedlisatiedot, setChangedLisatiedot] = useState("");

  const havaintoFromRef = useRef()

  useEffect(() => {
    LintuService.getHavainto().then((initialHavainnot) => {
      setHavaintoList(initialHavainnot);
    });
  }, []);

  useEffect(() => {
    LintuService.getLintu().then((initialLinnut) => {
      setLintuList(initialLinnut);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      LintuService.setToken(user.token);
    }
  }, []);

  const addHavainto = (event) => {
    event.preventDefault();
    const newObject = {
      laji: laji,
      maara: maara,
      kunta: kunta,
      paikka: paikka,
      lisatiedot: lisatiedot,
      user: user.username,
    };

    LintuService.createHavainto(newObject).then((returnedLintu) => {
      setHavaintoList(havaintoList.concat(returnedLintu));
      setLaji("");
      setMaara("");
      setKunta("");
      setPaikka("");
      setLisatiedot("");
    });
  };

  const deleteHavainto = (havainto) => {
    if (window.confirm("Poista " + havainto.laji + "?")) {
      LintuService.removeHavainto(havainto.id).then((removedHavainto) => {
        setHavaintoList(havaintoList.filter((bird) => bird.id !== havainto.id));
      });
    }
  };

  // const changeHavainto = (havainto) => {
  //   if (window.confirm("Päivitä " + havainto.laji + "?")) {

  //     const oldHavainto = havaintoList.find(h => h === havainto)

  //     const updatedHavainto = {
  //       ...oldHavainto,
  //       maara: changedmaara,
  //       kunta: changedkunta,
  //       paikka: changedpaikka,
  //       lisatiedot: changedlisatiedot,
  //     }

  //     const id = oldHavainto.id
  //     LintuService
  //       .updateHavainto(id, updatedHavainto)
  //       .then((returnedHavainto) => {
  //         setHavaintoList(havaintoList.map((h) => (h.id !== id ? h : returnedHavainto)))
  //         setChangedMaara("");
  //         setChangedKunta("");
  //         setChangedPaikka("");
  //         setChangedLisatiedot("");
  //       })
  //   }
  // }

  const changeHavainto = (id) => {

    

    const oldHavainto = havaintoList.find((h) => h.id === id);
    console.log(oldHavainto.laji);
    if (window.confirm("Päivitä " + oldHavainto.laji + "?")) {
      

      const updatedHavainto = {
        ...oldHavainto,
        maara: changedmaara,
        kunta: changedkunta,
        paikka: changedpaikka,
        lisatiedot: changedlisatiedot,
      };

      LintuService.updateHavainto(id, updatedHavainto).then(
        (returnedHavainto) => {
          setHavaintoList(
            havaintoList.map((h) => (h.id !== id ? h : returnedHavainto))
          );
          setChangedMaara("");
          setChangedKunta("");
          setChangedPaikka("");
          setChangedLisatiedot("");
        }
      );
    }
  };

  const printHavainto = (havainto) => {
    // let printContent = document.getElementById(havainto).innerHTML
    // let originalContent = document.body.innerHTML
    // document.body.innerHTML = printContent
    window.print();
    // document.body.innerHTML = originalContent
  };

  

  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </Togglable>
  );

  const lintuForm = () => (
    <Togglable buttonLabel="Lisää uusi havainto">
      <div>
        <h4>Lisää uusi havainto:</h4>
        <form onSubmit={addHavainto} className="lintuform">
          <div>
            Laji: <input value={laji} onChange={handleLajiChange} />
          </div>
          <div>
            Määrä: <input value={maara} onChange={handleMaaraChange} />
          </div>
          <div>
            Kunta: <input value={kunta} onChange={handleKuntaChange} />
          </div>
          <div>
            Paikka: <input value={paikka} onChange={handlePaikkaChange} />
          </div>
          <div>
            Lisätiedot:{" "}
            <input value={lisatiedot} onChange={handleTiedotChange} />
          </div>
          <button type="submit">Tallenna</button>
          <button type="reset">Tyhjennä</button>
        </form>
      </div>
    </Togglable>
  );

  const updateForm = (id) => (
    <Togglable buttonLabel="Muokkaa HAVAINTOA" ref={havaintoFromRef}>
      <div>
        <h4>Päivitä havainto</h4>
        <form onSubmit={changeHavainto(id)} className="changeForm">
          <div>
            Määrä:
            <input value={changedmaara} onChange={handleUpdateMaaraChange} />
          </div>
          <div>
            Kunta:
            <input value={changedkunta} onChange={handleUpdateKuntaChange} />
          </div>
          <div>
            Paikka:
            <input value={changedpaikka} onChange={handleUpdatePaikkaChange} />
          </div>
          <div>
            Lisätiedot:
            <input
              value={changedlisatiedot}
              onChange={handleUpdateTiedotChange}
            />
          </div>
          <button type="submit" className="btn">
            Tallenna
          </button>
          <button type="reset" className="btn">
            Tyhjennä
          </button>
        </form>
      </div>
    </Togglable>
  );

  const handleLajiChange = (event) => {
    setLaji(event.target.value);
  };

  const handleMaaraChange = (event) => {
    setMaara(event.target.value);
  };

  const handleKuntaChange = (event) => {
    setKunta(event.target.value);
  };

  const handlePaikkaChange = (event) => {
    setPaikka(event.target.value);
  };

  const handleTiedotChange = (event) => {
    setLisatiedot(event.target.value);
  };

  const handleUpdateMaaraChange = (event) => {
    setChangedMaara(event.target.value);
  };

  const handleUpdateKuntaChange = (event) => {
    setChangedKunta(event.target.value);
  };

  const handleUpdatePaikkaChange = (event) => {
    setChangedPaikka(event.target.value);
  };

  const handleUpdateTiedotChange = (event) => {
    setChangedLisatiedot(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedLintupongariUser",
        JSON.stringify(user)
      );

      LintuService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedLintupongariUser");
    setUser(null);
  };

  return (
    <div>
      <div>
        <BrowserRouter>
          <div>
            <h1>Lintupongari</h1>
            <ul className="Links">
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/havainnot">Havainnot</NavLink>
              </li>
              <li>
                <NavLink to="/linnut">Linnut</NavLink>
              </li>
            </ul>
            <div className="content">
              {user === null ? (
                loginForm()
              ) : (
                <div>
                  <p>
                    {user.username} logged in
                    <button className="btn" onClick={handleLogout}>
                      Log out
                    </button>{" "}
                  </p>
                  {lintuForm()}
                </div>
              )}

              <Route path="/register">
                <Register />
              </Route>
              <Route path="/havainnot">
                <Havainto
                  havaintoList={havaintoList}
                  deleteHavainto={deleteHavainto}
                  updateForm={updateForm}
                  
                  // changeHavainto={changeHavainto}
                  printHavainto={printHavainto}
                />
              </Route>
              <Route path="/linnut">
                <Linnut lintuList={lintuList} />
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
      <div></div>
    </div>
  );
};

export default App;
