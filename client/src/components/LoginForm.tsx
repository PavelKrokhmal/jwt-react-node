import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { useState } from 'react'
import { Context } from '..'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    return (
        <div>
            <input type="email" 
                placeholder="Email" 
                onChange={(event) => setEmail(event.target.value)} 
                value={email}>
            </input>
            <input type="password" 
                placeholder="Password" 
                onChange={(event) => setPassword(event.target.value)} 
                value={password}>
            </input>
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    )
}

export default observer(LoginForm)
