import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CardContainer from '../../components/CardContainer'

const CardHandler = ({ categories }) => {
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    })
  }, [longitude, latitude])
  return (
    <Container className='mb-5'>
      <Row>
        {categories.map((category) => {
          return (
            <Col lg={3} md={4} sm={3} className='m-lg-0 m-md-0 m-sm-3'>
              <CardContainer
                id={category._id}
                image={category.imageUrl}
                name={category.name}
              />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default CardHandler
