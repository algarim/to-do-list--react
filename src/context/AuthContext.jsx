import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        //signInWithPopup(auth, provider);
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        signOut(auth)
        .then( res => navigate('/home') )
    }

    useEffect ( () => {
        const unsubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser);
        } );
        return () => {
            unsubscribe();
        };
    }, [] )

    return (
        <AuthContext.Provider value={ {googleSignIn, logOut, user} } >
            { children }
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}