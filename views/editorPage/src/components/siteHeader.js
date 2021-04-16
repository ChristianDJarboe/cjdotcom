import React, {Component} from "react";
import $ from 'jquery'
import { Link } from "react-router-dom"

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  componentDidMount(){
 this.setActive();
  }
  setActive(){
    let x = window.location.pathname;
    if(x == "/editor/"){
      $("#thoughtsButton").toggleClass("active")
    }
    if(x == "/editor/projects"){
      $("#projectsButton").toggleClass("active")
    }

    if(x == "/editor/about"){
      $("#aboutButton").toggleClass("active")
    }
  }
  focus(e){
    $(".active").toggleClass("active");
    $("#"+e.target.id).toggleClass("active");
  }
  render(){
    return (
      <div id="headerSpan">
        <header id="siteHeader" className="header_hor fixed span">
         <h1>Christian Jarboe</h1>
         <Link onClick={(e)=>{this.focus(e)}} id="thoughtsButton" className="siteHeaderLink" to="/editor/">Thoughts</Link>
         <Link onClick={(e)=>{this.focus(e)}} id="projectsButton" className="siteHeaderLink" to="/editor/projects">Projects</Link>
        <Link onClick={(e)=>{this.focus(e)}} id="aboutButton" className="siteHeaderLink" to="/editor/about">About</Link>
    
        </header>
      </div>

    );
  }
}

export default Header;
