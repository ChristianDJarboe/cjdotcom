//COMPONENTS
import About from "./containers/about"
import Projects from "./containers/projects"
import Thoughts from "./containers/thoughts"

import React from 'react'
import { Switch, Route } from 'react-router'

export default function Router (){
    return(
        <Switch>
            {/* CORE COMPONENTS */}
            <Route path="/editor/about"> 
               <About></About>
            </Route>
            <Route path="/editor/projects"> 
               <Projects></Projects>
            </Route>
     
            <Route path="/editor/"> 
               <Thoughts></Thoughts>
            </Route>
        </Switch>
    )
}

