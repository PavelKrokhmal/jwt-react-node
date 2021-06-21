import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from './index';
import LoginForm from './components/LoginForm'
import { observer } from 'mobx-react-lite';
import UserService from './service/UserService';

const App: FC = () => {
  const {store} = useContext(Context)
  const [users, setUsers] = useState([] as any)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.ckeckAuth()
    }
  }, [store])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm/>
        <button onClick={getUsers}>Get users list</button>
      </div>
    )
  }

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>{store.isAuth ? `User is authorized: ${store.user.email}`: null}</h1>
      <button onClick={()=> store.logout()}>Log out</button>

      <div>
        <button onClick={getUsers}>Get users list</button>
      </div>

      {users.map((user: any) => (
        <div key={user.email}>{user.email}</div>
      ))}

    </div>
  )
}

export default observer(App);
