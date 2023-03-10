import i18next from 'i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'

import { useDispatch } from 'react-redux'

import { EmptyCart } from '../../app/CartHandler/CartSlice'
import NavRoutes from '../../common/NavRoutes'
import LoadingButton from '../../components/LoadingButton'
import { ACNetwork, config, Urls } from '../../config'
import '../../styles/CartPage.css'

export default function ConfirmOrder() {
  const products = useSelector((state) => state.cart.cartProducts)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const PlaceOrder = async () => {
    setLoading(true)
    let orderId = uuidv4()
    orderId = orderId.substring(0, 7)
    if (products.length == 0) {
      toast.warning('No Items in the Cart')
      setLoading(false)
      return
    }
    const newarray = products.map((product) => {
      return {
        _id: product._id,
        quantity: product.quantity,
      }
    })

    const obj = {
      paymentMethod: location.state.paymentMethod.mode,
      products: newarray,
      ...(location.state.cardId && { cardId: location.state.cardId }),
      orderId,
    }

    const response = await ACNetwork.post(
      Urls.addOrder(i18next.language),
      obj,
      (
        await config()
      ).headers
    )

    if (!response.ok) {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setLoading(false)
      return
    }
    // setNotification(true);
    toast.success('Order Placed', {
      position: toast.POSITION.TOP_RIGHT,
    })
    setLoading(false)
    dispatch(EmptyCart())
    navigate(NavRoutes.Homepage)
  }

  return (
    <>
      <Container>
        <Row>
          <Col lg={8} md={6} sm={12} className='p-5'>
            <Row>
              <Col sm={3} className='text-center'>
                <h5>Name</h5>
              </Col>
              <Col sm={3} className='text-center'>
                <h5>Image</h5>
              </Col>
              <Col sm={3} className='text-center'>
                <h5>Quantity</h5>
              </Col>
              <Col sm={3} className='text-center'>
                <h5>Total</h5>
              </Col>
            </Row>
            <hr />
            {products.map((product) => {
              return (
                <Row className='mt-2' key={product._id}>
                  <Col sm={3} className='text-center'>
                    {product.name}
                  </Col>
                  <Col sm={3} className='text-center'>
                    <img src={product.imageUrl} width='100px' />
                  </Col>
                  <Col sm={3} className='text-center'>
                    {product.quantity}
                  </Col>
                  <Col sm={3} className='text-center'>
                    Rs{product.sellingPrice * product.quantity}
                  </Col>
                </Row>
              )
            })}
            <hr />
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            style={{ backgroundColor: '#EDF0EA' }}
            className='p-5 mt-5'
          >
            <h4>OrderSummary</h4>
            <hr />
            <div className='d-flex flex-row justify-content-between'>
              <h6>Cart Subtotal</h6>
              <h6>{totalPrice}</h6>
            </div>
            <div className='d-flex flex-row justify-content-between mt-3'>
              <h6>Delivery Charges</h6>
              <h6>100</h6>
            </div>

            <hr />
            <div className='d-flex flex-row justify-content-between mt-3'>
              <h4>OrderTotal</h4>
              <h5>{totalPrice + 100}</h5>
            </div>
            <div className='d-flex flex-row justify-content-between mt-3'>
              <h6>PaymentMethod</h6>
              <h6>{location.state.paymentMethod.mode}</h6>
            </div>
            <div className='d-flex flex-row justify-content-between mt-3'>
              <h6>Address</h6>
              <h6>
                {location?.state.address.country},{' '}
                {location?.state.address.city},{location?.state.address.area},{' '}
                {location?.state.address.houseNumber},{' '}
                {location?.state.address.streetNumber}
              </h6>
            </div>
            <div className='mt-3' onClick={() => PlaceOrder()}>
              <LoadingButton loading={loading} text='Place Order' type='submit'>
                Place Order
              </LoadingButton>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
