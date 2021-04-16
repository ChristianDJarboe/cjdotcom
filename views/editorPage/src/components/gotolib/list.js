import { data } from "jquery";
import React, {Component} from "react";


class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        newItem:"",
        data:[]
    }
  }


  componentDidMount(){
    console.log(this.props);
    //pass prop function update. pushes submission to parent state
  }
  submit(e){
    
    let x = this.props.data;
    x.push(this.state.newItem);
    this.props.update(this.props.name,x,"newProject");
    this.setState({newItem:""})
  }
  remove(i){
    let x = this.props.data;
    x.map((item,index)=>{
        if(index==i){
            x.splice(index,1)
            this.setState({newItem:""})
            this.props.update(this.props.name,x,"newProject");
        }
    })
  }

  render(){
    return (
     <div className="listContainer ">
        <div >
          <input type="text" value={this.state.newItem} onChange={(e)=>{this.setState({newItem:e.target.value})}}></input>
          <button onClick={(e)=>{e.preventDefault();this.submit()}}>Add</button>
        </div>
            
        
        <div className="ass">
            {this.props.data.map((item,index)=>{
                return(
                    <div key={index}>
                      <h4 className="noMargin" key={index}>{item}</h4>
                      <button onClick={()=>{this.remove(index)}}>Remove</button>
                    </div>
                )
            })}
        </div>
     </div>
    );
  }
}

export default List;
