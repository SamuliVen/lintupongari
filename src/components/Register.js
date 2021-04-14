import React from 'react'

const Register = () => {
    return (
        <div className="Login-laatikko">
            <h2>Rekisteröidy</h2>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default Register