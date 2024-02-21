import {Routes, Route} from 'react-router-dom';

import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Private from './Private';
import Profile from '../pages/Profile';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Signin/> }></Route>
            <Route path='/register' element= { <SignUp/> }/>
            <Route path='/dashboard' element={ <Private><Dashboard/></Private> }></Route>
            <Route path='/profile' element={ <Private><Profile/></Private>}/>
            
        </Routes>
    )
}

export default RoutesApp;