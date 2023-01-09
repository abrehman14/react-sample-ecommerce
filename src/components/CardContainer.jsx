import { Button, Card, CardBody, CardImg, CardTitle } from 'reactstrap'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import NavRoutes from '../common/NavRoutes'

const CardContainer = ({ id, image, name }) => {
  const { t } = useTranslation(['Products'])
  return (
    <Card className='rounded-3 mt-3'>
      <CardImg
        alt='Card image cap'
        src={image}
        top
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        className='rounded'
      />
      <CardBody>
        <CardTitle tag='h5'>{name}</CardTitle>
        <Link
          to={NavRoutes.ProductPage}
          state={{ id: id }}
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'primary',
          }}
        >
          <Button color='danger'>{t('shopnow')}</Button>
        </Link>
      </CardBody>
    </Card>
  )
}

export default CardContainer
