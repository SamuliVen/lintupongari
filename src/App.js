import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import LintuService from "./services/LintuService";
import Havainnot from "./Havainnot";
import loginService from "./services/login";
import Register from "./components/Register";
import Linnut from "./Linnut";
import "./index.css";

const App = () => {
  const [havaintoList, setHavaintoList] = useState([]);
  const [lintuList, setLintuList] = useState([]);
  const [laji, setLaji] = useState();
  const [maara, setMaara] = useState();
  const [kunta, setKunta] = useState();
  const [paikka, setPaikka] = useState();
  const [lisatiedot, setLisatiedot] = useState();
  const [pvm, setPvm] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      LintuService.setToken(user.token)
    }
  }, [])

  const addHavainto = (event) => {
    event.preventDefault();
    const newObject = {
      laji: laji,
      maara: maara,
      kunta: kunta,
      paikka: paikka,
      lisatiedot: lisatiedot,
    };

    LintuService.createHavainto(newObject).then((returnedLintu) => {
      setHavaintoList(havaintoList.concat(returnedLintu));
      setLaji("");
      setMaara("");
      setKunta("");
      setPaikka("");
      setLisatiedot("");
      setPvm("");
    });
  };

  const deleteHavainto = (havainto) => {
    if (window.confirm("Poista " + havainto.laji + "?")) {
      LintuService.removeHavainto(havainto.id).then((removedHavainto) => {
        setHavaintoList(havaintoList.filter((bird) => bird.id !== havainto.id));
      });
    }
  };
  // const updateHavainto = ???

  const loginForm = () => (
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
      <button type="submit">login</button>
    </form>
  );

  const lintuForm = () => (
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
        <div>Havainnoija:</div>
        <button type="submit">Tallenna</button>
        <button type="reset">Tyhjennä</button>
      </form>
    </div>
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

  const handlePvmChange = (event) => {
    setPvm(event.target.value);
  };

  const handleTiedotChange = (event) => {
    setLisatiedot(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      LintuService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
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
                  <p>{user.name} logged in</p>
                  {lintuForm()}
                </div>
              )}

              <Route path="/register">
                <Register />
              </Route>
              <Route path="/havainnot">
                <Havainnot
                  havaintoList={havaintoList}
                  deleteHavainto={deleteHavainto}
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
