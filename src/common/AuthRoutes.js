import CodeVerify from '../Auth/CodeVerify'
import ForgetPassword from '../Auth/ForgetPassword'
import Login from '../Auth/Login'
import NewPassword from '../Auth/NewPassword'
import Signup from '../Auth/Signup'
import NavRoutes from './NavRoutes'

export const AuthRoutes = [
  {
    link: NavRoutes.Login,
    element: <Login />,
  },
  {
    link: NavRoutes.Signup,
    element: <Signup />,
  },
  {
    link: NavRoutes.forgetPassword,
    element: <ForgetPassword />,
  },
  {
    link: NavRoutes.codeVerification,
    element: <CodeVerify />,
  },
  {
    link: NavRoutes.newPassword,
    element: <NewPassword />,
  },
]
