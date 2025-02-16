import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react';


function ProtectedPage({ type, element }) {

    const [ isUserLoaded, setIsUserLoaded ] = useState(false)
    const [ authUser, setAuthUser ] = useState(false)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    console.log("FROM: ", from, location)

    const userState = useSelector(state => state.user)

    useEffect(() => {
        async function getUserInfo() {
            if (userState.loaded) {
                setIsUserLoaded(true)
            }
            if (userState.isAuth) {
                setAuthUser(true)
            }
        }

        getUserInfo()
    }, [userState])

    if (!isUserLoaded) {
        return null
    }

    if (type === "unauth") {
        return authUser ? element : <Navigate to="/login" replace state={{ from: location }} />
    } else if (type === "auth") {
        return element
        // console.log("GONAV")
        // return authUser ? <Navigate to={from} replace /> : element
    }
}

export default ProtectedPage