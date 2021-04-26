import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import LintuService from "./services/LintuService";
import Havainnot from "./Havainnot";
import loginService from "./services/login";
import Register from "./components/Register";
import Togglable from "./components/Togglable";
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
      user: user.username
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

  const changeHavainto = (event) => {
    event.preventDefault();
    const updatedHavainto = {
      maara: changedMaara,
      kunta: changedKunta,
      paikka: changedPaikka,
      lisatiedot: changedLisatiedot,
    }
  }

  const updateHavainto = (havainto) => {
    const oldHavainto = havaintoList.find(h => h === havainto)
    const willUpdate = window.confirm(`Päivitä ${havainto.laji}`)
    if (willUpdate) {
      const updatedHavainto = {
        ...oldHavainto, maara: changedMaara,
        kunta: changedKunta, paikka: changedPaikka, lisatiedot: changedLisatiedot
      }
      const id = havainto.id
      return LintuService.updateHavainto(id, updatedHavainto).then((returnedHavainto) => {
        setHavaintoList(havaintoList.map((h) => (h.id !== id ? h : returnedHavainto)))
        setLaji("");
        setMaara("");
        setKunta("");
        setPaikka("");
        setLisatiedot("");
      })

    }



  }

  const printHavainto = (havainto) => {
    // let printContent = document.getElementById(havainto).innerHTML
    // let originalContent = document.body.innerHTML
    // document.body.innerHTML = printContent
    window.print()
    // document.body.innerHTML = originalContent
  }
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
        <button type="submit">login</button>
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
            Lisätiedot: <input value={lisatiedot} onChange={handleTiedotChange} />
          </div>
          <button type="submit">Tallenna</button>
          <button type="reset">Tyhjennä</button>
        </form>
      </div>
    </Togglable>
  );

  const updateForm = () => (
      <div>
        <h4>Päivitä havainto</h4>
        <form onSubmit={changeHavainto} className="changeForm">
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
            Lisätiedot: <input value={lisatiedot} onChange={handleTiedotChange} />
          </div>
          <button type="submit">Tallenna</button>
          <button type="reset">Tyhjennä</button>
        </form>
      </div>
  )

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedLintupongariUser', JSON.stringify(user)
      )

      LintuService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedLintupongariUser')
    setUser(null)
  }

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
                  <p>{user.username} logged in
                  <button onClick={handleLogout}>logout</button> </p>
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
                  updateHavainto={updateHavainto}
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
