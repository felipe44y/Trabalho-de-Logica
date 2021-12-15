import { BrowserRouter, Route, Switch } from 'react-router-dom';
import T1 from './pages/T1';
import T2  from './pages/T2';

export default function App(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={T1}/>
                <Route path="/Q2" component={T2}/>
            </Switch>
        </BrowserRouter>
      );
}