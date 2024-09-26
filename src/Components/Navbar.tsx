import {Link} from 'react-router-dom'
import { auth } from '../Config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const signUserOut = async () => {
        await signOut(auth);
        navigate("/login");
    }
    return <div>
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </div>
       

        <div>
            {
                user && <>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || ""} width="100" height="100"/>
                <button onClick={signUserOut}>Log Out</button>
            </>  
            }
        </div>
    </div>
};

export default Navbar;