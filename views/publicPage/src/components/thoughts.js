import React, {Component} from "react";
import $ from 'jquery'


class Thoughts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[],
      parentURL:"https://506ec12ec0da.ngrok.io"
    }
  }
  componentDidMount(){
    this.getPosts();
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
  getPosts(){
    $.ajax({
      type:"GET",
      url:this.state.parentURL+"/api/thought",
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
  nav(id){
    window.location.href = "/singleProject/"+id;
  }
  render(){
    return (
     <div className="foreground">

       <div className="pageHeader span alignCenter spaceBetween">
          <h1 >Thoughts</h1>
       </div>

      <div id="blogContainer">
        {this.state.posts.map((item,index)=>{
          return(
          <div key={index} className="card span flexcol c5">
            <div className="postHeader span spaceBetween">
              <div className="borderBottom">
                <h2>{item.title}</h2>
                <div>{item.project_ref_name ? <h4 className="clickable" onClick={()=>{this.nav(item.project_ref_id)}}style={{margin:0}}>{item.project_ref_name}</h4>:(<h4 style={{margin:2}}>Off the dome</h4>)}</div>
              </div>
            </div>
            <div className="cardContent c3">
              <p>{item.text_content}</p>
            </div>
          </div>
          )
        })}
      </div>
      
     </div>
    );
  }
}

export default Thoughts;
