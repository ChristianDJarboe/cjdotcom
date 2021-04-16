import React, {Component} from "react";
import $ from 'jquery'


class ListPrompt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        promptOpen:false,
        noPosts:false,
        posts:[]
    }
  }
  nav(id){
    window.location.href = "/post/"+id;
  }
  componentDidMount(){
   
  }
  
  getRelatedPosts(project_id){
    console.log(project_id)
    console.log(this.props.id)

    if(this.state.posts.length ==0){ //prevents repeated requests
      $.ajax({
        type:"GET",
        url:"/api/relatedPosts",
        contentType: "application/json; charset=utf-8",
        headers:{project_id:project_id},
        success:(response) =>{
           console.log(response)
           this.setState({posts:response.data})
           if(response.data.length ==0){
             this.setState({noPosts:true});
           }
        },
        error:(response)=>{
          console.log("error:");
          console.log(response);
        }
      }
      )
    }else{
      console.log("exists b")
    }
  
  }
  render(){
    return (
    <div className="listPrompt">
        <h3 className="clickable" onClick={()=>{this.getRelatedPosts(this.props.id); this.setState({promptOpen:true})}}>{this.props.promptName}</h3>
        {this.state.promptOpen ?(
          <div className="prompt" onClick={(e)=>{if(e.target.className=="prompt"){this.setState({promptOpen:false})}}}>
            <div className="promptClickableArea justifyCenter flexcol ">
                {this.state.noPosts ? (
                  <div className="selectList c5 roundCorners">
                    <div className="span spaceBetween">
                      <h1>{this.props.notFound}</h1>
                      <button onClick={()=>{this.setState({promptOpen:false})}}>Close</button>
                    </div>
                  </div>
                ):(
                  <div className="selectList c5 roundCorners">
                    <div className="span spaceBetween">
                      <h1>{this.props.promptName}</h1>
                      <button onClick={()=>{this.setState({promptOpen:false})}}>Close</button>
                    </div>
                    {this.state.posts.map((item,index)=>{
                      console.log(item);
                      let x = item.text_content;
                      x = x.substring(0,30) +"..."
                      return(
                        <div className="c2 pad roundCorners" key={index} onClick={()=>{this.nav(item.id)}}>
                          <h3>{item.title}</h3>
                          <p>{x}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
          
            </div>
          </div>
        ):(null)}
     
    </div>

    );
  }
}

export default ListPrompt;
