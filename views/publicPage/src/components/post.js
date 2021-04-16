import React, {Component} from "react";
import $, { post } from 'jquery'

class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post:{}
    }
  }
  componentDidMount(){
      console.log(this.props);
    this.getData(this.props.data.id);
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
  getData(post_id){
    $.ajax({
      type:"GET",
      url:"/api/singlePost",
      contentType: "application/json; charset=utf-8",
      headers:{post_id:post_id},
      success:(response) =>{
         console.log(response)
        this.setState({post:response.data[0]})
      },
      error:(response)=>{
        console.log("error:");
        console.log(response);
      }
    }
    )
  }
  nav(id){
    window.location.href = "/singleProject/"+id;
  }
  render(){
    return (
        <div className="foreground c5 singlePage">
           <div className="card c2 span flexcol">
             <div className="postHeader span spaceBetween">
               <div>
                 <h2>{this.state.post.title}</h2>
                 <div className="clickable">{this.state.post.project_ref_name ? <h4 onClick={()=>{this.nav(this.state.post.project_ref_id)}}style={{margin:0}}>{this.state.post.project_ref_name}</h4>:(<h4 style={{margin:2}}>Off the dome</h4>)}</div>
               </div>
             </div>
             <div className="cardContent">
               <p>{this.state.post.text_content}</p>
             </div>
             <div className="cardImages"></div>
           </div>

        </div>
    );
  }
}

export default Post;
