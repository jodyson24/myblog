import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { GlobalState } from './GlobalState'

import Default from './Default'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Dashboard from './components/pages/admin/Dashboard'

function App() {
  const state = useContext(GlobalState)

  const [isLogged] = state.userAPI.isLogged
  
  return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/" component={Default} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/register" component={isLogged ? Default : Register} />

              <Route exact path="/admin" component={Dashboard} />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
