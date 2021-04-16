import React, {Component} from "react";
import $ from 'jquery'
import Select from "./gotolib/select";



class Thoughts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newPostPrompt:false,
      editorPrompt:false,

      updatedPostTitle:"",
      updatedPostContent:"",

      newPostTitle:"",
      newPostContent:"",
      mediaRef:"",
      projectRef:{},
      selectedPost:{},
      posts:[],
      projects:[]

    }
    this.updateProjectRef = this.updateProjectRef.bind(this);
  }
  componentDidMount(){
    console.log("/thoughts")
    this.getProjects();
    this.getPosts();
    console.log("aa")
  }
  getProjects(){
    console.log("get projects");
    $.ajax({
      type:"GET",
      url:"http://localhost:8080/api/project",
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token")},
      success:(response) =>{
       this.setState({projects:response.data});
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
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
  newPostPrompt(){
    if(this.state.newPostPrompt){
      this.setState({newPostPrompt:false})
    }else{
      this.setState({newPostPrompt:true})
    }
  }

  updateClient(data){
    let x = this.state.posts;
    x.push(
      {
        id:data.id
      }
    )
  }


  getPosts(){
    $.ajax({
      type:"GET",
      url:"http://localhost:8080/api/thought",
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token")},
      success:(response) =>{
         console.log(response)
        this.setState({posts:response.data})
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }

  newPost(){
    this.newPostPrompt();
    //ajax
    let data={
      title:this.state.newPostTitle,
      text_content:this.state.newPostContent,
      project_ref_id:this.state.projectRef.id,
      project_ref_name:this.state.projectRef.project_name,

      media_ref:this.state.mediaRef
    }
    console.log(data);
    $.ajax({
      type:"POST",
      url:"http://localhost:8080/api/thought",
      data:JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      token:this.getCookie("token"),
      headers:{token:this.getCookie("token")},
      success:(response) =>{
        this.updateClient(data);
         console.log(response)
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }

  updatePost(){
    console.log("update");
    let data={
      title:this.state.updatedPostTitle,
      text_content:this.state.updatedPostContent,
      id:this.state.selectedPost.id,
    }
    console.log(data);
    $.ajax({
      type:"PUT",
      url:"http://localhost:8080/api/thought",
      data:JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      headers:{token:this.getCookie("token")},

      success:(response) =>{
          //call ui update
         console.log(response)
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }

  deletePost(){
    console.log("delete")
    $.ajax({
      type:"DELETE",
      url:"http://localhost:8080/api/thought",
      contentType: "application/json; charset=utf-8",
      headers:{
        token:this.getCookie("token"),
        post_id:this.state.selectedPost.id
      },
      success:(response) =>{
          //call ui update
         console.log(response)
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }

  handleFormChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  updateProjectRef(payload){
    this.setState({projectRef:payload})
  }
  openEditor(id){
    console.log(id);
    this.state.posts.map((item,index)=>{
      console.log(item);
      if(item.id == id){
        this.setState({selectedPost:item})
        this.setState({editorPrompt:true})
        console.log(this.state.selectedPost)
        this.setState({updatedPostTitle:item.title})
        this.setState({updatedPostContent:item.text_content})

      }
    })
  }

  nav(id){
    console.log(id);
  }
  render(){
    return (
     <div className="foreground">
       <div className="pageHeader span alignCenter spaceBetween">
          <h1 >Thoughts</h1>
          <div>
            <button onClick={()=>{this.newPostPrompt()}}>New Post</button>
          </div>
       </div>
       {this.state.newPostPrompt ?(
         <div className="prompt" onClick={(e)=>{if(e.target.className=="prompt"){this.setState({newPostPrompt:false})}}}>
           <div className="promptClickableArea justifyCenter flexcol ">
            <form>
              <input name="newPostTitle" onChange={(e)=>{this.handleFormChange(e)}} value={this.state.newPostTitle} className="promptInput" type="text" placeholder="title"></input>
              <textarea name="newPostContent" onChange={(e)=>{this.handleFormChange(e)}} value={this.state.newPostContent} className="promptTextArea" cols={100}rows={32}></textarea>
            </form>
           <div className="span scaleChildren">
            <button className="promptClose" onClick={()=>{this.newPost()}}>Post!</button>
            <Select values={this.state.projects} update={this.updateProjectRef} ></Select>
           </div>
           </div>
   
         </div>
       ):(null)}

      {this.state.editorPrompt ?(
         <div className="prompt" onClick={(e)=>{if(e.target.className=="prompt"){this.setState({editorPrompt:false})}}}>
           <div className="promptClickableArea justifyCenter flexcol ">
            <div>
              <button onClick={()=>{this.updatePost(this.state.selectedPost.id)}}>Save</button>
              <button onClick={()=>{this.deletePost(this.state.selectedPost.id)}}>Delete</button>
            </div>
            <form>
              <input name="updatedPostTitle" onChange={(e)=>{this.handleFormChange(e)}} value={this.state.updatedPostTitle} className="promptInput" type="text" placeholder="title"></input>
              <textarea name="updatedPostContent" onChange={(e)=>{this.handleFormChange(e)}} value={this.state.updatedPostContent} className="promptTextArea" cols={100}rows={32}></textarea>
            </form>
         
           </div>
   
         </div>
       ):(null)}
        


      <div id="blogContainer">
        {this.state.posts.map((item,index)=>{
          return(
          <div key={index} className="card span flexcol">
            <div className="postHeader span spaceBetween">
              <div>
                <h2>{item.title}</h2>
                <div>{item.project_ref_name ? <h4 onClick={()=>{this.nav(item.project_ref_id)}}style={{margin:0}}>{item.project_ref_name}</h4>:(<h4 style={{margin:2}}>Off the dome</h4>)}</div>
              </div>
              <button id="specialboi" onClick={()=>{this.openEditor(item.id)}}>Edit</button>
            </div>
          
            <div className="cardContent">
              <p>{item.text_content}</p>
            </div>
            <div className="cardImages"></div>
          </div>
          )
        })}
     
      </div>

     </div>
    );
  }
}

export default Thoughts;
