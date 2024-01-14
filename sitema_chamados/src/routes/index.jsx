import {Routes, Route} from 'react-router-dom';

import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Signin/> }></Route>
            <Route path='/register' element= { <SignUp/> }/>
            <Route path='/dashboard' element={ <Dashboard/> }></Route>

            
        </Routes>
    )
}

export default RoutesApp;