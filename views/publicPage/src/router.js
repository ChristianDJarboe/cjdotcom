//COMPONENTS
import About from "./containers/about"
import Projects from "./containers/projects"
import Thoughts from "./containers/thoughts"
import SingleProjectContainer from "./containers/singleProject"
import PostContainer from "./containers/post"

import React from 'react'
import { Switch, Route } from 'react-router'

export default function Router (){
    return(
        <Switch>
            {/* CORE COMPONENTS */}
            <Route path="/about"> 
               <About></About>
            </Route>
            <Route path="/projects"> 
               <Projects></Projects>
            </Route>
            <Route path="/singleProject/:id"> 
               <SingleProjectContainer></SingleProjectContainer>
            </Route>
            <Route path="/post/:id"> 
               <PostContainer></PostContainer>
            </Route>

            <Route path="/"> 
               <Thoughts></Thoughts>
            </Route>

        </Switch>
    )
}

