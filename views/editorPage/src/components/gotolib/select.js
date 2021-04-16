import React, {Component} from "react";


class Select extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue:"Select Project",
      selectedProjectId:0,
      selectOpen:false,
      noProjects:false,
    }
  }
  select(item){
    this.setState({selectedValue:item.project_name});
    this.setState({selectedProjectId:item.id});
    this.setState({selectOpen:false});
    this.props.update(item);
  }
  toggle(){
      console.log(this.state)
      if(this.state.selectOpen){
        this.setState({selectOpen:false})
      }else{
        this.setState({selectOpen:true})
      }
  }
  componentDidMount(){
      console.log(this.props);
      if(this.props.values.length == 0){
          this.setState({noProjects:true})
      }else{
        this.setState({noProjects:false})

      }
  }


  render(){
    return (
     <div className="selectContainer">
         <button className="selectOpenButton" onClick={()=>{this.toggle()}}>{this.state.selectedValue}</button>
        {this.state.selectOpen ?(
            <div className="selectPopup">
                {this.state.noProjects ?(
                    <div >
                        <h2>No projects found</h2>
                    </div>
                ):(
                    <div>
                        {this.props.values.map((item,index)=>{
                            return(
                                <button name={item.project_name} onClick={(e)=>{this.select(item)}}>{item.project_name}</button>
                            )
                        })}
                    </div>
                )}
             
            </div>
        ):(null)}
     </div>
    );
  }
}

export default Select;
