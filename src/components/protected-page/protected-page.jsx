import { Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from "../../services/user-slice.js"
import { useState, useEffect } from 'react';

function ProtectedPage({ element }) {

    const [ isUserLoaded, setIsUserLoaded ] = useState(false)
    const [ authUser, setAuthUser ] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        async function getUserInfo() {
            const response = await dispatch(setUser())
            setIsUserLoaded(true)
            setAuthUser(response.payload.success)
        }
        getUserInfo()
    }, [dispatch])

    if (!isUserLoaded) {
        return null
    }

    return authUser ? element : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedPage