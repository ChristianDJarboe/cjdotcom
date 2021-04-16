import './App.css';
import React from "react";
import Router from "./router.js";
import { BrowserRouter } from "react-router-dom";
import Header from "./containers/headerContainer";
import { Provider } from 'react-redux'
import store from './redux/store'
import $ from "jquery"
import BackgroundCanvas from "./components/backgroundCanvas";
class App extends React.Component {
  constructor(){
    super();
    this.state={
      loginOpen:true,

      loginCred:{
        username:"",
        pass:""
      },
    }

  }
  getCookie(name) 
  {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return(match[2])
    }
    else{
        console.log('--could not find cookie---');
        return false
    }
  }
  setCookies(token) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = "token" + '=' + token + ';expires=' + expires.toUTCString();
  }

  login(){
    var data = {
      username: this.state.loginCred.username, 
      password: this.state.loginCred.pass
    }
    console.log(data);
    $.ajax({
        type:"POST",
        url:"http://localhost:8080/auth/login",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:(response) =>{
          this.setCookies(response.token);
          this.setState({loginOpen:false})
          console.log("Login Successful")
          
        },
        error:(response)=>{
          console.log("error:");
          console.log(response);
        }
    }
    )
  }
  updateForms(parent,e){
    let x = this.state[parent];
    x[e.target.name] = e.target.value;
    this.setState({[parent]:x})
  }
  componentDidMount(){
    if(this.getCookie("token")!==false){
      //load normal page
      console.log("editor found");
      this.setState({loginOpen:false});
    }else{
      //load login page
      console.log("login page")
      this.setState({loginOpen:true})
    }
  }
  render(){

      return (
        <div className="App primary">
          {this.state.loginOpen ?(
             <div className="formContainer"> 
             <h2>Login</h2>
             <form>
               <input name="username" value ={this.state.loginCred.username} onChange={(e)=>{this.updateForms("loginCred",e)}} placeholder="Username"></input>
               <input type="password" name="pass" value ={this.state.loginCred.pass} onChange={(e)=>{this.updateForms("loginCred",e)}} placeholder="Password"></input>
               <h3 className="fauxButton" onClick={()=>{this.login()}}>Login</h3>
             </form>
           </div>
          ):(<div>
         <Provider store={store}>
            <BrowserRouter>
              <div>
                <Header></Header>
                <BackgroundCanvas></BackgroundCanvas>
                <Router></Router>
              </div>
            </BrowserRouter>
          </Provider>
          </div>)}
 
        </div>
      );
    }

}

export default App;
