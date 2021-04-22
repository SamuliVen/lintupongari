import React, { useState, useEffect } from 'react'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import LintuService from './services/LintuService'
import LintuForm from './components/LintuForm'
import Havainnot from './Havainnot'
import Login from './components/Login'
import Register from './components/Register'
import Linnut from './Linnut'
import "./index.css"


const App = () => {
  const [havaintoList, setHavaintoList] = useState([])
  const [lintuList, setLintuList] = useState([])
  const [laji, setLaji] = useState()
  const [maara, setMaara] = useState()
  const [kunta, setKunta] = useState()
  const [paikka, setPaikka] = useState()
  const [lisatiedot, setLisatiedot] = useState()
  const [pvm, setPvm] = useState()
  const [havainnoija, setHavainnoija] = useState()

  useEffect(() => {
    LintuService
      .getHavainto().then(initialHavainnot => {
        setHavaintoList(initialHavainnot)
      })
  }, [])
  
  useEffect(() => {
    LintuService
    .getLintu().then(initialLinnut => {
      setLintuList(initialLinnut)
    }) 
  }, [])

  const addHavainto = (event) => {
    event.preventDefault()
    const newObject = {
      laji: laji,
      maara: maara,
      kunta: kunta,
      paikka: paikka,
      lisatiedot: lisatiedot,
      havainnoija: havainnoija
    }

    LintuService
      .createHavainto(newObject)
      .then(returnedLintu => {
        setHavaintoList(havaintoList.concat(returnedLintu))
        setLaji('')
        setMaara('')
        setKunta('')
        setPaikka('')
        setLisatiedot('')
        setPvm('')
        setHavainnoija('')
      })
  }

  const deleteHavainto = havainto => {
    if (window.confirm("Poista " + havainto.laji + "?")) {

      LintuService
        .removeHavainto(havainto.id)
        .then(removedHavainto => {
          setHavaintoList(havaintoList.filter(bird => bird.id !== havainto.id))
        })
    }
  }

  // const updateHavainto = ???

  const handleLajiChange = (event) => {
    setLaji(event.target.value)
  }

  const handleMaaraChange = (event) => {
    setMaara(event.target.value)
  }

  const handleKuntaChange = (event) => {
    setKunta(event.target.value)
  }

  const handlePaikkaChange = (event) => {
    setPaikka(event.target.value)
  }

  const handlePvmChange = (event) => {
    setPvm(event.target.value)
  }

  const handleTiedotChange = (event) => {
    setLisatiedot(event.target.value)
  }

  const handleHavainnoijaChange = (event) => {
    setHavainnoija(event.target.value)
  }

  return (
    <div>
      <div>
        <BrowserRouter>
          <div>
            <h1>Lintupongari</h1>
            <ul className="Links">
              <li><NavLink exact to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/havainnot">Havainnot</NavLink></li>
              <li><NavLink to="/linnut">Linnut</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/havainnot">
                <Havainnot havaintoList={havaintoList}
                  deleteHavainto={deleteHavainto} />
              </Route>
              <Route path="/linnut">
                <Linnut lintuList={lintuList} />
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
      <div>
        <h4>Lisää uusi havainto:</h4>
        <LintuForm addHavainto={addHavainto} newLaji={laji} maara={maara} pvm={pvm} kunta={kunta} paikka={paikka}
          lisatiedot={lisatiedot} havainnoija={havainnoija} handleLajiChange={handleLajiChange} handleMaaraChange={handleMaaraChange} handlePvmChange={handlePvmChange}
          handleKuntaChange={handleKuntaChange} handlePaikkaChange={handlePaikkaChange} handleTiedotChange={handleTiedotChange} handleHavainnojaChange={handleHavainnoijaChange} />
      </div>
    </div>
  )
}

export default App