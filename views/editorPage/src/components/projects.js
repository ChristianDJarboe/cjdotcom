import React, {Component} from "react";
import $ from 'jquery'
import List from "./gotolib/list";


class Projects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newProjectPrompt:false,
      editProjectPrompt:false,

      noProjects:false,

      projects:[],
      newProject:{
        project_name:"",
        discription:"",
        media_ref:"",
        git_repo:"",
        demo_link:"",
        contributors:[],
        technologies:[]
      },

      selectedProject:{
        project_name:"",
        discription:"",
        media_ref:"",
        git_repo:"",
        demo_link:"",
        contributors:[],
        technologies:[],
        id:0
      }
    }
    this.handleListChange = this.handleListChange.bind(this);

  }
  componentDidMount(){
    console.log("/projects")
    this.getProjects();
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
      url:"http://localhost:8080/api/project",
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
  createProject(){
    let data={
      project_name:this.state.newProject.project_name,
      discription:this.state.newProject.discription,
      media_ref:this.state.newProject.media_ref,
      git_repo:this.state.newProject.git_repo,
      demo_link:this.state.newProject.demo_link,
      contributors:this.state.newProject.contributors,
      technologies:this.state.newProject.technologies
    }
    if(data.project_name !="" && data.git_repo !=""){
      let x = data.contributors;
      let y =""
      for(let i=0;i<x.length;i++){
        y = y+x[i];
        if(i<x.length-1){
          y = y+"&"
        }
      }
      let x2 = data.technologies;
      let y2 =""
      for(let i=0;i<x2.length;i++){
        y2 = y2+x2[i];
        if(i<x2.length-1){
          y2 = y2+"&"
        }
      }
      data.contributors=y;
      data.technologies=y2;
      console.log(data);

      $.ajax({
        type:"POST",
        url:"http://localhost:8080/api/project",
        contentType: "application/json; charset=utf-8",
        token:this.getCookie("token"),
        headers:{token:this.getCookie("token")},
        data:JSON.stringify(data),
        success:(response) =>{
           console.log(response)
          //update ui call somewhere sometime
        },
        error:(response)=>{
          console.log("error:");
          console.log(response);
        }
      }
      )
    }else{
      alert("Missing required fields in new project form")
    }
  }

  updateProject(){
    let data={
      project_name:this.state.selectedProject.project_name,
      discription:this.state.selectedProject.discription,
      media_ref:this.state.selectedProject.media_ref,
      git_repo:this.state.selectedProject.git_repo,
      demo_link:this.state.selectedProject.demo_link,
      contributors:this.state.selectedProject.contributors,
      technologies:this.state.selectedProject.technologies,
      id:this.state.selectedProject.id
    }
    let x = data.contributors;
    let y =""
    for(let i=0;i<x.length;i++){
      y = y+x[i];
      if(i<x.length-1){
        y = y+"&"
      }
    }
    let x2 = data.technologies;
    let y2 =""
    for(let i=0;i<x2.length;i++){
      y2 = y2+x2[i];
      if(i<x2.length-1){
        y2 = y2+"&"
      }
    }
    data.contributors=y;
    data.technologies=y2;

    console.log(data);
    $.ajax({
      type:"PUT",
      url:"http://localhost:8080/api/project",
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token")},
      data:JSON.stringify(data),
      success:(response) =>{
         console.log(response)
        //update ui call somewhere sometime
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }
  deleteProject(){
    console.log(this.state.selectedProject.id)
    $.ajax({
      type:"DELETE",
      url:"http://localhost:8080/api/project",
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token"),project_id:this.state.selectedProject.id},
      success:(response) =>{
         console.log(response)
        //update ui call somewhere sometime
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }
  toggle(name){
    if(this.state[name]){
      this.setState({[name]:false});
    }else{
      this.setState({[name]:true});
    }
  }
  handleFormChange(e,parent){
    let x = this.state[parent]
    x[e.target.name] = e.target.value;
    this.setState({[parent]:x})
  }
  handleListChange(name,payload,parent){
    console.log(name)
    console.log(payload)
    console.log(parent)

    let x = this.state[parent]
    x[name] = payload;
    this.setState({[parent]:x})
  }
  setEditor(item){
    console.log(item);
    this.setState({selectedProject:item});
    this.setState({editProjectPrompt:true});
  }

  render(){
    console.log("render");
    return (
    <div className="foreground">
        <div className="pageHeader span alignCenter spaceBetween">
          <h1 >Projects</h1>
          <div>
            <button onClick={()=>{this.toggle("newProjectPrompt")}}>New Project</button>
          </div>
       </div>
      {this.state.newProjectPrompt ?(
        <div className="prompt" onClick={(e)=>{if(e.target.className=="prompt"){this.setState({newProjectPrompt:false})}}}>
        <div className="promptClickableArea justifyCenter flexcol ">
         <form>
            <input name="project_name" onChange={(e)=>{this.handleFormChange(e,"newProject")}} value={this.state.newProject.project_name} className="promptInput" type="text" placeholder="Project Name"></input>
            
            <input name="git_repo" onChange={(e)=>{this.handleFormChange(e,"newProject")}} value={this.state.newProject.git_repo} className="promptInput" placeholder="Git Repo"></input>
            <input name="demo_link" onChange={(e)=>{this.handleFormChange(e,"newProject")}} value={this.state.newProject.demo_link}  className="promptInput" placeholder="Demo Link"></input>
            
            <textarea name="discription" onChange={(e)=>{this.handleFormChange(e,"newProject")}} value={this.state.newProject.discription} placeholder="Discription" className="promptTextArea" cols={100}rows={14}></textarea>
     
            <div className="span alignTop surface pad spaceBetween" style={{minHeight:50}}>
              <h4 className="noMargin" >Contributors</h4>
              <List name="contributors" update={this.handleListChange} data={this.state.newProject.contributors}></List>
            </div>
            <div className="span alignTop surface pad spaceBetween">
              <h4 className="noMargin" >Technologies</h4>
              <List name="technlogies" update={this.handleListChange} data={this.state.newProject.technologies}></List>
            </div>
         </form>
        <div className="span scaleChildren">
         <button className="promptClose" onClick={()=>{this.createProject()}}>Post Project</button>
        </div>
        </div>

      </div>
      ):(null)}




       {this.state.editProjectPrompt ?(
        <div className="prompt" onClick={(e)=>{if(e.target.className=="prompt"){this.setState({editProjectPrompt:false})}}}>
        <div className="promptClickableArea justifyCenter flexcol ">
         <form>
            <input name="project_name" onChange={(e)=>{this.handleFormChange(e,"selectedProject")}} value={this.state.selectedProject.project_name} className="promptInput" type="text" placeholder="Project Name"></input>
            
            <input name="git_repo" onChange={(e)=>{this.handleFormChange(e,"selectedProject")}} value={this.state.selectedProject.git_repo} className="promptInput" placeholder="Git Repo"></input>
            <input name="demo_link" onChange={(e)=>{this.handleFormChange(e,"selectedProject")}} value={this.state.selectedProject.demo_link}  className="promptInput" placeholder="Demo Link"></input>
            
            <textarea name="discription" onChange={(e)=>{this.handleFormChange(e,"selectedProject")}} value={this.state.selectedProject.discription} placeholder="Discription" className="promptTextArea" cols={100}rows={14}></textarea>
     
            <div className="span alignTop surface pad spaceBetween" style={{minHeight:50}}>
              <h4 className="noMargin" >Contributors</h4>
              <List name="contributors" update={this.handleListChange} data={this.state.selectedProject.contributors}></List>
            </div>
            <div className="span alignTop surface pad spaceBetween">
              <h4 className="noMargin" >Technologies</h4>
              <List name="technlogies" update={this.handleListChange} data={this.state.selectedProject.technologies}></List>
            </div>
         </form>
        <div className="span scaleChildren">
         <button className="promptClose" onClick={()=>{this.updateProject()}}>Update Project</button>
         <button className="promptClose" onClick={()=>{this.deleteProject()}}>Delete Project</button>

        </div>
        </div>

      </div>
      ):(null)}



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
                <div key={index} className="cell">
                <div className="cellContentContainer">
                  <div className="span spaceBetween">
                    <h1>{item.project_name}</h1>
                    <button onClick={()=>{this.setEditor(item)}}>Edit</button>
                  </div>
                  <p>{item.discription}</p>
                  <div className="span spaceBetween" style={{borderBottom:"1px solid red",borderTop:"1px solid red"}}>
                    <div>
                      <h4>Contributors</h4>
                      <div>
                        {item.contributors.map((item2,index2)=>{
                          return(
                            <h4 key={index2}>{item2}</h4>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <h4>Libraries and Technologies</h4>
                      <div>
                        {item.technologies.map((item2,index2)=>{
                          return(
                            <h4 key={index2}>{item2}</h4>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  
                
                  <div className="span highlighted spaceAround">
                    <a href={item.git_repo}>
                      <h3>Github</h3>
                    </a>
                    <a href={item.demo_link}>
                    <h3>Demo</h3>
                    </a>
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
