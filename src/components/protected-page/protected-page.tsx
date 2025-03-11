import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from "../app/app"
import { useState, useEffect, ReactNode } from 'react';
import { IUser } from '../../utils/types'

type TProtectedPageProps = {
    type: string,
    element: React.JSX.Element
}

type TProtectedPageReturnType = React.JSX.Element | null

const ProtectedPage = ({ type, element }: TProtectedPageProps): TProtectedPageReturnType => {

    const [ isUserLoaded, setIsUserLoaded ] = useState<boolean>(false)
    const [ authUser, setAuthUser ] = useState<boolean>(false)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const userState = useAppSelector((state: { user: IUser }) => state.user)

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
        return authUser ? element as React.JSX.Element : <Navigate to="/login" replace state={{ from: location }} />
    } else if (type === "auth") {
        return authUser ? <Navigate to={from} replace /> : element as React.JSX.Element
    }
    
    return null
}

export default ProtectedPage