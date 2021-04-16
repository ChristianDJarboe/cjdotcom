import React, {Component} from "react";
import $ from 'jquery'
import { Link } from "react-router-dom"
import Fb from "../images/fb.png"
import Ig from "../images/ig.png"
import Tw from "../images/tw.png"
import In from "../images/in.png"
class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobileHeaderOpen:false,
    }
  }
  componentDidMount(){
 this.setActive();
  }
  setActive(){
    let x = window.location.pathname;
    if(x == "/"){
      $("#thoughtsButton").toggleClass("active")
    }
    if(x == "/projects"){
      $("#projectsButton").toggleClass("active")
    }

    if(x == "/about"){
      $("#aboutButton").toggleClass("active")
    }
  }
  focus(e){
    $(".active").toggleClass("active");
    $("#"+e.target.id).toggleClass("active");
    this.setState({mobileHeaderOpen:false})
  }
  toggle(name){
    if(this.state[name] == true){
      this.setState({[name]:false})
    }else{
      this.setState({[name]:true})
    }
  }

  render(){
    return (
      <div id="headerSpan" className="c1">
        <header id="siteHeader" className="header_hor fixed span spaceBetween desktop">
          <div className="span alignCenter">
            <h1 style={{width:240,marginLeft:10}}>Christian Jarboe</h1>
            <Link onClick={(e)=>{this.focus(e)}} id="thoughtsButton" className="siteHeaderLink" to="/">Thoughts</Link>
            <Link onClick={(e)=>{this.focus(e)}} id="projectsButton" className="siteHeaderLink" to="/projects">Projects</Link>
            <Link onClick={(e)=>{this.focus(e)}} id="aboutButton" className="siteHeaderLink" to="/about">About</Link>
          </div>
         
          <div className="span alignCenter flexRight" >
            <a href="https://www.instagram.com/rover_blvd/">
              <img src={Ig} className="socialIcon"></img>
            </a>
            <a href="https://www.linkedin.com/in/christian-jarboe-9385b8170/">
              <img src={In} className="socialIcon"></img>
            </a>
            <a href="https://www.twitch.tv/seadeejay">
              <img src={Tw} className="socialIcon"></img>
            </a>
            <a href="https://www.facebook.com/christian.jarboe.5/">
              <img src={Fb} className="socialIcon"></img>
            </a>
            </div>
        </header>
        <header className="c1 fixed alignCenter span spaceBetween mobile">
            <h1 style={{width:240,color:"white",marginLeft:10}}>Christian Jarboe</h1>
            <button id="mobileHeaderButton" onClick={()=>{this.toggle("mobileHeaderOpen")}}>&#9776;</button>
            {this.state.mobileHeaderOpen ?
            (
              <div id="mobileHeaderDropDown" className="c1 pad roundCorners">
                <Link onClick={(e)=>{this.focus(e)}} id="thoughtsButton" className="siteHeaderLink" to="/">Thoughts</Link>
                <Link onClick={(e)=>{this.focus(e)}} id="projectsButton" className="siteHeaderLink" to="/projects">Projects</Link>
                <Link onClick={(e)=>{this.focus(e)}} id="aboutButton" className="siteHeaderLink" to="/about">About</Link>
                <div className="alignCenter span" >
                  <a href="https://www.instagram.com/rover_blvd/">
                    <img src={Ig} className="socialIcon"></img>
                  </a>
                  <a href="https://www.linkedin.com/in/christian-jarboe-9385b8170/">
                    <img src={In} className="socialIcon"></img>
                  </a>
                  <a href="https://www.twitch.tv/seadeejay">
                    <img src={Tw} className="socialIcon"></img>
                  </a>
                  <a href="https://www.facebook.com/christian.jarboe.5/">
                    <img src={Fb} className="socialIcon"></img>
                  </a>
                </div>
              </div>
            ):null}
         
            
     
        </header>
      </div>

    );
  }
}

export default Header;
