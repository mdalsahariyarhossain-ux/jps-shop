import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  // if user not logged in, go to login page
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
