import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from "../../services/user-slice.js"
import { useState, useEffect } from 'react';

function ProtectedPage({ type, element }) {

    const [ isUserLoaded, setIsUserLoaded ] = useState(false)
    const [ authUser, setAuthUser ] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        async function getUserInfo() {
            const response = await dispatch(setUser())
            setIsUserLoaded(true)
            // let result = response.payload.success
            // if (type === "auth") {
            //     result = !result
            // }
            setAuthUser(response.payload.success)
        }
        getUserInfo()
    }, [dispatch])

    if (!isUserLoaded) {
        return null
    }

    if (type === "unauth") {
        return authUser ? element : <Navigate to="/login" replace state={{ from: location }} />
    } else if (type === "auth") {
        return authUser ? <Navigate to="/" replace /> : element
    }
}

export default ProtectedPage