import {Link} from 'react-router-dom'
import { auth } from '../Config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'

const Navbar = () => {
    const [user] = useAuthState(auth);
    return <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <div>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="100" height="100"/>
        </div>
    </div>
};

export default Navbar;