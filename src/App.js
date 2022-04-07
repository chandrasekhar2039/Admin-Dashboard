import React, { useEffect,Redirect }  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {useSelector,useDispatch} from "react-redux";
import {set_auth_action} from "./Redux/Actions/Auth/action";



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
// eslint-disable-next-line
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


var App =()=> {
  var dispatch=useDispatch();
  useEffect(()=>{
    var token = localStorage.getItem('token');
    if(token){
      dispatch(set_auth_action(token));
    }
  },[])// eslint-disable-line

    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
          <Switch>

            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            <Route path="/" name="Home" render={props => <TheLayout {...props}/>}/>
            <Route path="*" exact ><Page404/></Route>


          </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
}

export default App;
