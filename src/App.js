
import React from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Home from './Home';
import Blogview from './Blogview'

function App() {

  return (
      <BrowserRouter>
        <div className="Home">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/:blog_id' component={Blogview}/>
          </Switch>
        </div>
      </BrowserRouter> 
  );
}

export default App;
