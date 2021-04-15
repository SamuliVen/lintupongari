import React, { useState, useEffect } from 'react'
import { HashRouter, NavLink, Route } from 'react-router-dom'
import LintuService from './services/LintuService'
import LintuForm from './components/LintuForm'
import Havainnot from './Havainnot'
import Havainto from './components/Havainto'
import Login from './components/Login'
import Register from './components/Register'
import Linnut from './Linnut'
import "./index.css"


const App = () => {
  const [linnut, setLinnut] = useState([])
  const [newLaji, setNewLaji] = useState("")
  const [maara, setMaara] = useState()
  const [kunta, setKunta] = useState()
  const [paikka, setPaikka] = useState()
  const [lisatiedot, setLisatiedot] = useState()

  useEffect(() => {
    LintuService
      .getAll().then(initialLinnut => {
        setLinnut(initialLinnut)
      })
  }, [])

  const addHavainto = (event) => {
    event.preventDefault()
    const newHavainto = {
      laji: newLaji,
      maara: maara,
      pvm: new Date().toISOString(),
      kunta: kunta,
      paikka: paikka,
      lisatiedot: lisatiedot
    }

    LintuService
      .create(newHavainto)
      .then(returnedLintu => {
        setLinnut(linnut.concat(returnedLintu))
        setNewLaji('')
        setMaara('')
        setKunta('')
        setPaikka('')
        setLisatiedot('')
      })
  }

  const handleLajiChange = (event) => {
    console.log(event.target.value)
    setNewLaji(event.target.value)
  }


  return (
    <HashRouter>
      <div>
        <h1>Lintupongari</h1>
        <ul className="Links">
          <li><NavLink exact to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/havainnot">Havainnot</NavLink></li>
          <li><NavLink to="/linnut">Linnut</NavLink></li>
        </ul>
        <div className="content">
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/havainnot" component={Havainnot} />
          <Route path="/linnut" component={Linnut} />
        </div>
      </div>
    </HashRouter>
  )
}

export default App