import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";


function ProtectedPage({ type, element }) {

    const [ isUserLoaded, setIsUserLoaded ] = useState(false)
    const [ authUser, setAuthUser ] = useState(false)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const userState = useSelector(state => state.user)

    useEffect(() => {
        async function getUserInfo() {
            setIsUserLoaded(true)
            if (userState.isAuth) {
                setAuthUser(true)
            } else {
                setAuthUser(false)
            }
        }

        getUserInfo()
    }, [userState])

    if(!isUserLoaded) {
        return null
    }

    if (type === "unauth") {
        return authUser ? element : <Navigate to="/login" replace state={{ from: location }} />
    } else if (type === "auth") {
        return authUser ? <Navigate to={from} replace /> : element
    }
}

ProtectedPage.propTypes = {
    type: PropTypes.string.isRequired,
    element: PropTypes.node.isRequired
}

export default ProtectedPage