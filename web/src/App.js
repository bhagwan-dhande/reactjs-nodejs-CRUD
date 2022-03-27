import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { routes } from './utils/Routes';
function App(props) {

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              exact
              path={route.path}
              component={route.component}
            />
          ))
        }
      </Switch>
    </Router>
  );
}

export default App;
