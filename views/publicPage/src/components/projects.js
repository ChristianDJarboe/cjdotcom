import React, {Component} from "react";
import $ from 'jquery'
import ListPrompt from "./gotolib/listPrompt";

class Projects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      noProjects:false,
      projects:[],
      mobileMenuOpen:false,
      parentURL:"https://506ec12ec0da.ngrok.io"

    }

  }
  componentDidMount(){
    this.getProjects();
  }
  nav(id){
    window.location.href = "/singleProject/"+id;
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
  getProjects(){
    $.ajax({
      type:"GET",
      url:this.state.parentURL+"/api/project",
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token")},
      success:(response) =>{
         console.log(response)
        // this.setState({projects:response.data})
        if(response.data.length ==0){
          this.setState({noProjects:true});
        }else{
          let z = response.data
          for(let i=0;i<z.length;i++){  //for each project returned, convert the sql storage method for contributors and technologies into an array
            console.log(z[i]);
            let x = z[i].contributors;
            let y = []
            let hit =0
            for(let i=0;i<=x.length;i++){
              if(x[i]=="&" ||i==x.length){
                y.push(x.substring(hit,i))
                hit=i
              }
            }
            let x2 = z[i].technologies;
            let y2 = []
            let hit2 =0
            for(let i=0;i<=x2.length;i++){
              if(x2[i]=="&" ||i==x2.length){
                y2.push(x2.substring(hit2,i))
                hit2=i+1
              }
            }
            console.log(y);
            console.log(y2);

            z[i].contributors = y;
            z[i].technologies = y2;
          }
          this.setState({projects:z});
        }
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }
  toggle(name){
    if(this.state[name] == true){
      this.setState({[name]:false})
    }else{
      this.setState({[name]:true})
    }
  }

  render(){
    console.log("render");
    return (
    <div className="foreground c5">
      <div className="leftAside">
       <h1 style={{marginTop:30}}>Projects</h1>

        {this.state.projects.map((item,index)=>{
          return(
            <h3 className="clickable" onClick={()=>{this.nav(item.id)}}  key={index} style={{margin:10}}>{item.project_name}</h3>
          )
        })}
      </div>
      <div className="mobileHeader">
        <button onClick={()=>{this.toggle("mobileMenuOpen")}}>Projects &#9776;</button>
        {this.state.mobileMenuOpen ?(
           <div className="mobileDropDown c1 pad roundCorners lightText">
               {this.state.projects.map((item,index)=>{
          return(
            <h3 className="clickable" onClick={()=>{this.nav(item.id)}} key={index} style={{margin:10}}>{item.project_name}</h3>
          )
        })}
           </div>
        ):null}
       
      </div>
      <div id="projectContainer" className="cellContainer">
        {this.state.noProjects ?(
          <div>
            <h2>No projects found</h2>
          </div>
        ):(
          <div>
            {this.state.projects.map((item,index)=>{
              console.log(item);
      
              return(
                <div key={index} className="cell c2 roundCorners">
                <div className="cellContentContainer">
                  <div className="span spaceBetween">
                    <h1>{item.project_name}</h1>
                  </div>
                  <p className="c3 roundCorners pad">{item.discription}</p>
                  <div className="span spaceBetween" style={{borderBottom:"1px solid black"}}>
                    <div >
                      <h4>Contributors</h4>
                      <div>
                        {item.contributors.map((item2,index2)=>{
                          return(
                            <h4 key={index2}>{item2}</h4>
                          )
                        })}
                      </div>
                    </div>
                    <div className="halfWidth">
                      <h4 className="span">Libraries and Technologies</h4>
                      <div className="inline">
                        {item.technologies.map((item2,index2)=>{
                          return(
                            <h4 className="inlineListItem" key={index2}>{item2}</h4>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="span spaceAround alignCenter">
                    <a href={item.git_repo} className="noTextStyle">
                      <h3 className="darkText ">Github</h3>
                    </a>
                    <a href={item.demo_link} className="noTextStyle">
                      <h3 className="darkText ">Demo</h3>
                    </a>
                    <ListPrompt id={item.id} notFound="No Related Posts" promptName="Related Posts" ></ListPrompt>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
    );
  }
}

export default Projects;
