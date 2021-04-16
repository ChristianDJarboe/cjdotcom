import React, {Component} from "react";
import $ from 'jquery'
import ListPrompt from "./gotolib/listPrompt";

class SingleProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        project:{
            contributors:[],
            technologies:[]
        }
       
    }
  }
  componentDidMount(){
      console.log(this.props);
    this.getData();
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

  getData(){
    $.ajax({
      type:"GET",
      url:"/api/singleProject",
      contentType: "application/json; charset=utf-8",
      headers:{project_id:this.props.data.id},
      success:(response) =>{
         console.log(response)
    
          let z = response.data[0]
            console.log(z);
            let x = z.contributors;
            let y = []
            let hit =0
            for(let i=0;i<=x.length;i++){
              if(x[i]=="&" ||i==x.length){
                y.push(x.substring(hit,i))
                hit=i
              }
            }
            let x2 = z.technologies;
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

            z.contributors = y;
            z.technologies = y2;
          
          this.setState({project:z});
        
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }
  
  render(){
    return (
    <div className="foreground c5 singlePage pad">
      <div className="span spaceBetween">
        <h1>{this.state.project.project_name}</h1>
      </div>
      <p>{this.state.project.discription}</p>
      <div className="span spaceBetween" style={{borderBottom:"1px solid red",borderTop:"1px solid red"}}>
        <div>
          <h4>Contributors</h4>
          <div>
            {this.state.project.contributors.map((item2,index2)=>{
              return(
                <h4 key={index2}>{item2}</h4>
              )
            })}
          </div>
        </div>
        <div className="halfWidth">
          <h4>Libraries and Technologies</h4>
          <div className="inline">
            {this.state.project.technologies.map((item2,index2)=>{
              return(
                <h4 className="inlineListItem" key={index2}>{item2}</h4>
              )
            })}
          </div>
        </div>
      </div>
      <div className="span spaceAround alignCenter">
        <a href={this.state.project.git_repo} className="noTextStyle">
          <h3 className="darkText clickable">Github</h3>
        </a>
        <a href={this.state.project.demo_link} className="noTextStyle">
          <h3 className="darkText clickable">Demo</h3>
        </a>
        <ListPrompt id={this.state.project.id} notFound="No Related Posts" promptName="Related Posts"></ListPrompt>
      </div>
    </div>
    );
  }
}

export default SingleProject;
