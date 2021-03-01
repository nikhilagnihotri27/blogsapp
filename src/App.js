
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Home from './Home';
import Blogview from './Blogview';
import axios from 'axios';

function App() {

  const [blogData, setBlogData] = useState([]);
  const [blogContent, setBlogContent] = useState([]);
  const blogId = window.location.pathname.substring(1);

  useEffect(() => {
    axios.get(`https://api.theinnerhour.com/v1/bloglisting`)
      .then(res => {
        setBlogData(res.data.list);

        //Get blog content if url params contain a blogId
        if(res.data.list.length > 0 && blogId!==""){
          res.data.list.forEach(blog => {
            if(blog._id === blogId){
              setBlogContent(blog);
            }
          })
        }
      })
  },[])

  return (
      <BrowserRouter>
        <div className="Home">
          <Switch>
            {/*<Route exact path='/' component={Home} />*/}
            {/*<Route path='/:blog_id' component={Blogview}/>*/}
            <Route exact path="/" render={routeProps => <Home state={blogData} {...routeProps} />} />
            <Route path="/:blog_id" render={routeProps => <Blogview state={blogContent} {...routeProps} />} /> 
          </Switch>
        </div>
      </BrowserRouter> 
  );
}

export default App;
