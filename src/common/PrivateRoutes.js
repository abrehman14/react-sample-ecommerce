import Address from '../Pages/Address'
import Card from '../Pages/Card'
import Order from '../Pages/Order'
import ConfirmOrder from '../Pages/Order/ConfirmOrder'
import OrderDetails from '../Pages/OrderDetails'
import Profile from '../Pages/Profile'
import NavRoutes from './NavRoutes'

export const PrivateRoutes = [
  {
    link: NavRoutes.Order,
    element: <Order />,
  },
  {
    link: NavRoutes.confirmOrder,
    element: <ConfirmOrder />,
  },
  {
    link: NavRoutes.myOrder,
    element: <OrderDetails />,
  },
  {
    link: NavRoutes.myCards,
    element: <Card />,
  },
  {
    link: NavRoutes.profile,
    element: <Profile />,
  },
  {
    link: NavRoutes.address,
    element: <Address />,
  },
]
