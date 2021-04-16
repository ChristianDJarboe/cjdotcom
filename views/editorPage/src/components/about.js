import React, {Component} from "react";
import $ from 'jquery'
import Fb from "../images/fb.png"
import Ig from "../images/ig.png"
import Tw from "../images/tw.png"
import In from "../images/in.png"

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  componentDidMount(){
    console.log("/about")
  }


  render(){
    return (
     <div className="foreground">
          <div className="span flexcol" >
          <div>
          <h1>Social Pages</h1>
          <p>Gotta plug my socials. I'm most active on Instagram. I also stream on Twitch
            occasionally so check me out when I'm live. I have a LinkedIn but I don't use it as often as I should. The only reason I'm active on there
            is for recruiters. Facebook is kinda a legacy social media so I don't use it anymore but I figured I'd link it anyways.
          </p>
          </div>
          <div className="span ">
              <a href="https://www.instagram.com/rover_blvd/">
                <img src={Ig} className="socialIcon"></img>
              </a>
              <a href="https://www.linkedin.com/in/christian-jarboe-9385b8170/">
              <img src={In} className="socialIcon"></img>
              </a>
              <a href="https://www.twitch.tv/seadeejay">
              <img src={Tw} className="socialIcon"></img>
              </a>
              <a href="https://www.facebook.com/christian.jarboe.5/">
              <img src={Fb} className="socialIcon"></img>
                </a>
          </div>
        </div>
        <h1>About me.</h1>
        <div id="aboutParagraphs">
          <p>Well for one, I have a hard time writing about myself.</p>
          <div>
            <p>I’m 20 years old, born in California, raised in Washington, and now living in Texas. I’ve been working on/with computers since I was 9 when my mom gave me a broken laptop and said “if you want a computer, fix this one” and so I did. <br></br><br></br>
            I graduated High School in 2018 a year earlier than expected. Not because I was exceptional, I couldn’t stay another week in that building, so I made it happen. After HS I worked with my dad painting houses and doing the odd job here and there for my neighbors. I also immediately signed up for a hands on programming course at the Austin Coding Academy learning full-stack javascript.</p>
            <img id="about_img_1" src="/images/1.jpg"></img>
          </div>

          <div>
          <img id="about_img_2" src="/images/5.jpg"></img>
          <p>I attended college at Shoreline Community College in Seattle for a semester in 2019. The plan was to get my basics done at Shoreline where it was cheaper, and then transfer into a four year. Without getting specific, that plan fell apart, and I moved back to San Antonio to live with my parents. I still enjoyed the experience, the best part was being close to my family working in software. I got to shadow my uncle at his company and do some bottom level work for him.
          <br></br><br></br>A year after my college plan failed, I moved to Seattle again with the hopes of working on a startup with my friends and my uncle. That plan also failed greatly. We bit off much more than we could chew and things quickly fell apart. On top of that, this is the summer that covid and the riots hit big so it was difficult to travel and network during those conditions. After 2 months, I drove home to San Antonio. I still have “30 hours” by Kanye stuck in my head because of that drive.</p>

          </div>

          
          <div>
            <p>Now, I have finished my classes at Austin Coding Academy. Covid slowed things down and I took a couple classes off to pursue my dreams but it finally happened. I can build a front end in react or vanilla js+jquery, a back-end in express.js, and a mysql database. I’m ready to get to work.
            <br></br><br></br>Thanks for reading. I will try to keep this website up to date, check back later cutie.</p>
            <img id="about_img_5" src="/images/4.jpg"></img>
          </div>

          <p></p>
        </div>


        
     

        <footer>
        </footer>
     </div>
    );
  }
}

export default About;
