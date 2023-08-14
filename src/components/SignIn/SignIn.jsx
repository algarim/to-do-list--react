import { UserAuth } from "../../context/AuthContext"
import GoogleButton from "react-google-button"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import './SignIn.css'

const SignIn = () => {
    const {googleSignIn, user} = UserAuth();
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        if (user != null) {
          navigate('/home');
        }
      }, [user] )

    return (
        <div className="todo-list-container signin-container">

            <h2> Login </h2>

            <p> Para usar este sitio, debe iniciar sesión. </p>

            <div>
                < GoogleButton onClick={handleGoogleSignIn}/>
            </div>


        </div>
    )
}

export default SignIn