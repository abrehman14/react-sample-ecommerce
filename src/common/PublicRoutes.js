import NotFound from '../components/NotFound'
import CartPage from '../Pages/Cart'
import HomePage from '../Pages/Home'
import ProductPage from '../Pages/ProductPage'
import ProductDetail from '../Pages/ProductsDetails'
import NavRoutes from './NavRoutes'
export const PublicRoutes = [
  {
    link: NavRoutes.Homepage,
    element: <HomePage />,
  },
  {
    link: NavRoutes.ProductPage,
    element: <ProductPage />,
  },
  {
    link: NavRoutes.CartPage,
    element: <CartPage />,
  },
  {
    link: NavRoutes.ProductDetail,
    element: <ProductDetail />,
  },
  {
    link: NavRoutes.NotFound,
    element: <NotFound />,
  },
]
