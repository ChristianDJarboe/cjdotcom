import React, {Component} from "react";
import ReactDOM from "react-dom";
export default class BackgroundCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state={
            height:window.innerHeight,
            width:window.innerWidth,
            height2:document.body.scrollHeight - window.innerHeight,
            pointCount:30,
            pointArray:[]
        }
    }
   



    componentDidMount(){
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'rgba(0,0,0,.5)';
        ctx.lineWidth = 10;
        canvas.width=this.state.width;
        canvas.height=this.state.height;

        ctx.beginPath();
        ctx.moveTo(522,canvas.height);
        ctx.lineTo(500,(500));
        ctx.stroke();
   //Adds points to array
    var x = this.state.pointArray;
   for(var i=0;i<this.state.pointCount;i++){    
    x.push(new point(this.state.width,this.state.height));
    }
    this.setState({pointArray:x})


    for(let i=0;i<this.state.pointCount;i++){
        this.state.pointArray[i].move();
        this.Drawpoint(this.state.pointArray[i]);
    }

this.timerID = setInterval(
    () => this.tick(),
    10
  );
}
//draws the points for the second canvas particle effects
Drawpoint(point){
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(234, 50, 50,.4)';

    ctx.beginPath();
    ctx.arc(point.xPos,point.yPos,point.size,0,2*Math.PI);
    ctx.fill();
}
updateWidth(){
    let canvas = document.getElementById("fancyBox");
    let ctx = canvas.getContext('2d');                 //get context
    this.setState({width:window.innerWidth});
    canvas.width=this.state.width;
}
//Updates height to prevent weird resizeing issues when not in full screen desktop mode
updateHeight(){
    

}
//draws the points for the second canvas particle effects


tick(){
    try{
  // console.log("tick")
  let canvas = document.getElementById("fancyBox");
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,this.state.width,this.state.height);

  for(let i=0;i<this.state.pointCount;i++){
      this.state.pointArray[i].move(this.state.width,this.state.height);
      this.Drawpoint(this.state.pointArray[i]);
  }
    }catch(e){
        console.log("dropped frame")
    }
}

render(){
    return (
        <div>
        <canvas  id="fancyBox" ref="canvas" />
        </div>
        )
}
}
//updates thhe width of the canvases


class point {
    constructor(width,height2) {   
        this.xPos = Math.random()*width;
        this.yPos = Math.random()*height2;
        this.size = Math.random()*20;
        this.opacity = Math.random()*1;
        if(Math.random()*2>1){              //X Direction
            this.velX =(Math.random()*2);   //Pos speed
        }else{
            this.velX =(Math.random()*-2);  //Neg speed
        }
        if(Math.random()*2>1){              //Y Direction
            this.velY =Math.random()*2;     //Pos speed
        }else{  
            this.velY =Math.random()*-2;    //Neg speed
        }
    }
    move(width,height2){                                 //updates position
        this.xPos+=this.velX/3; 
        this.yPos+=this.velY/3; 
        //Catches particles that go outside the right border
        if(this.xPos > width+100){
            this.xPos =-99;
        }
        //Catches particles that go outside the left border
        if(this.xPos <-100){
            this.xPos = width+100;
        }
        //catches particles that go outside the bottom border
        if(this.yPos > height2){
            this.yPos =0;
        }
        //catches particles that go outside the top border
        if(this.yPos <0){
            this.yPos=height2;
        }
    }
}