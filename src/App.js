import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import LintuService from "./services/LintuService";
import Havainto from "./components/Havainto";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import Linnut from "./components/Linnut";
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
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState(null);
  const [changedmaara, setChangedMaara] = useState("");
  const [changedkunta, setChangedKunta] = useState("");
  const [changedpaikka, setChangedPaikka] = useState("");
  const [changedlisatiedot, setChangedLisatiedot] = useState("");
  const [wikiData, setWikiData] = useState({});

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
    LintuService.getUser().then((initialUsers) => {
      setUserList(initialUsers);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedLintupongariUser"
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      LintuService.setToken(user.token);
    }
  }, []);

  // Whenever field changes, the useEffect makes the wiki search. This way it finds the info before submitting.
  // Not the ideal way, because it is done many times depending on the length of the birds name.

  useEffect(() => {
    if (!laji) {
      console.log("No data yet");
    } else {
      LintuService.getWikiHaku(laji)
        .then((returnedData) => {
          setWikiData(returnedData);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  }, [laji]);

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

    if (
      lintuList.some((lintu) => lintu.laji.toLowerCase() === laji.toLowerCase())
    ) {
      window.alert(laji + " on jo lintutaulussa.");
    } else {
      const taxonomyData =
        wikiData?.[0]?.cirrusdoc?.[0].source?.auxiliary_text[0];
      if (taxonomyData !== undefined) {
        const lahkopalat = taxonomyData.split("Lahko: ");
        if (lahkopalat !== undefined) {
          const lahko = lahkopalat[1].split(" ");
          if (lahko[0].includes("linnut")) {
          const heimopalat = taxonomyData.split("Heimo: ");
          const heimo = heimopalat[1].split(" ");
          const sukupalat = taxonomyData.split("Suku: ");
          const suku = sukupalat[1].split(" ");
          const luokituspalat = taxonomyData.split("Uhanalaisuusluokitus ");
          if (taxonomyData.includes("Uhanalaisuusluokitus")) {
            const luokitus = luokituspalat[1].split(" ");
            const tieteellisetpalat = taxonomyData.split("Kaksiosainen nimi ");
            const tieteellinen = tieteellisetpalat[1].split(" ");

            const newWiki = {
              laji: wikiData?.[0]?.title,
              tieteellinenNimi: `${tieteellinen[0]} ${tieteellinen[1]}`,
              kuvaWikipediastaAPI: wikiData?.[0]?.original?.source,
              lahko: `${lahko[0]} ${lahko[1]}`,
              heimo: `${heimo[0]} ${heimo[1]}`,
              suku: `${suku[0]} ${suku[1]}`,
              elinvoimaisuus: luokitus[0],
            };
            LintuService.createLintu(newWiki).then((returnedLintu) => {
              setLintuList(lintuList.concat(returnedLintu));
              setWikiData("");
              console.log(lintuList);
            });
          } else {
            window.alert(
              laji +
                "-lajista ei saatu t??ydellist?? lintukorttia luotua. Luodaan silti havainto."
            );
          }
        } else {
          window.alert(
              "Laji ei vaikuttaisi olevan lintu.")
        }
        } else {
          window.alert(
            laji +
              "-lajista ei saatu t??ydellist?? lintukorttia luotua. Luodaan silti havainto."
          );
        }
      } else {
        window.alert(laji + "-virheellinen laji.");
      }
    }

    LintuService.createHavainto(newObject).then((returnedHavainto) => {
      setHavaintoList(havaintoList.concat(returnedHavainto));
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

  const changeHavainto = (id) => {
    const oldHavainto = havaintoList.find((h) => h.id === id);
    console.log(oldHavainto.laji);

    const updatedHavainto = {
      laji: oldHavainto.laji,
      maara: changedmaara,
      kunta: changedkunta,
      paikka: changedpaikka,
      lisatiedot: changedlisatiedot
    };

    console.log(`${changedmaara}, ${changedkunta}, ${changedpaikka}, ${changedlisatiedot}`)

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
  };

  const printHavainto = (havainto) => {
    var mywindow = window.open("", "PRINT", "height=400,width=600");
    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write("<h1>" + document.title + "</h1>");
    mywindow.document.write(document.getElementById(havainto).innerHTML);
    mywindow.document.write("</body></html>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();

    return true;
  };

  const registerForm = () => (
    <Togglable buttonLabel="Rekister??idy">
      <div className="loginLaatikko">
        <h2>Rekister??i k??ytt??j??tunnus</h2>
        <form onSubmit={handleNewUser}>
          <label>
            <p>M????rit?? k??ytt??j??tunnus:</p>
            <input
              type="text"
              size="15"
              value={newUsername}
              onChange={handleNewUsernameChange}
            />
          </label>
          <label>
            <p>M????rit?? salasana:</p>
            <input
              type="password"
              size="15"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </label>
          <div>
            <p>
              <button className="btn" type="submit">
                Rekister??idy
              </button>
            </p>
          </div>
        </form>
      </div>
    </Togglable>
  );

  const loginForm = () => (
    <div className="loginLaatikko">
      <h2>Kirjaudu sis????n</h2>
      <form onSubmit={handleLogin}>
        <div>
          <p>K??ytt??j??tunnus: </p>
          <input
            type="text"
            size="15"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <p>Salasana: </p>
          <input
            type="password"
            size="15"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <p>
          <button className="btn" type="submit">
            Kirjaudu
          </button>
        </p>
      </form>
    </div>
  );

  const lintuForm = () => (
    <div className="newSighting">
      <h4>Lis???? uusi havainto:</h4>
      <form onSubmit={addHavainto} className="lintuform">
        <div>
          Laji: <input value={laji} onChange={handleLajiChange} />
        </div>
        <div>
          M????r??: <input value={maara} onChange={handleMaaraChange} />
        </div>
        <div>
          Kunta: <input value={kunta} onChange={handleKuntaChange} />
        </div>
        <div>
          Paikka: <input value={paikka} onChange={handlePaikkaChange} />
        </div>
        <div>
          Lis??tiedot: <input value={lisatiedot} onChange={handleTiedotChange} />
        </div>
        <br></br>
        <button className="btn" type="submit">
          Tallenna
        </button>
        <button className="btn" type="reset">
          Tyhjenn??
        </button>
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

  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
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

  const handleNewUser = (event) => {
    event.preventDefault();
    const newUser = {
      username: newUsername,
      password: newPassword,
    };
    LintuService.createUser(newUser).then((returnedUser) => {
      setUserList(userList.concat(returnedUser));
    });

    window.alert("Tervetuloa " + newUsername);
    setNewUsername("");
    setNewPassword("");
  };

  return (
    <div>
      <div>
        <BrowserRouter>
          <div>
            <ul className="links">
              <li>
                <NavLink to="/havainnot">Havainnot</NavLink>
              </li>
              <li>
                <NavLink to="/linnut">Linnut</NavLink>
              </li>
              <h1>Lintupongari</h1>
            </ul>
            <div className="content">
              <div className="toggleBox">
                {user === null ? (
                  loginForm()
                ) : (
                  <div>
                    <p className="newSighting">
                      Logged in as: <br /> {user.username}
                      <br />
                      <br />
                      <button className="btn" onClick={handleLogout}>
                        Log out
                      </button>{" "}
                    </p>
                    <br />
                    {lintuForm()}
                  </div>
                )}
                <div>{user === null ? registerForm() : <div></div>}</div>
              </div>
              <Route path="/havainnot">
                <Havainto
                  user={user}
                  changeHavainto={changeHavainto}
                  havaintoList={havaintoList}
                  deleteHavainto={deleteHavainto}
                  printHavainto={printHavainto}
                  changedmaara={changedmaara}
                  handleUpdateMaaraChange={handleUpdateMaaraChange}
                  changedkunta={changedkunta}
                  handleUpdateKuntaChange={handleUpdateKuntaChange}
                  changedpaikka={changedpaikka}
                  handleUpdatePaikkaChange={handleUpdatePaikkaChange}
                  changedlisatiedot={changedlisatiedot}
                  handleUpdateTiedotChange={handleUpdateTiedotChange}
                />
              </Route>
              <Route path="/linnut">
                <h2 className="lintuOtsikko"> Lintutaulu </h2>
                <Linnut lintuList={lintuList} />
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
