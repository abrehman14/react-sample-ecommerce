import { useEffect, useState } from 'react'
import { Button, Container } from 'reactstrap'
import Loader from '../../assets/animations'
import Drawer from '../../components/Drawer'
import { ACNetwork, config, Urls } from '../../config'
import CardForm from '../Order/CardForm'
import UserCard from './UserCard'

export default function Card() {
  const [loading, setLoading] = useState(true)
  const [userCards, setUserCards] = useState([])
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    getCards()
  }, [])
  const getCards = async () => {
    setLoading(true)
    const response = await ACNetwork.get(
      Urls.getCards,
      (
        await config()
      ).headers
    )

    setUserCards(response.data.cards)
    setLoading(false)
  }
  return (
    <>
      <Container className='d-flex flex-column'>
        <div className='mt-4 float-right'>
          <Button onClick={() => setShowModal(true)} className='amazon-btn'>
            Add Card
          </Button>
        </div>
        <Drawer open={showModal} setOpen={setShowModal} Header='Add Card'>
          <CardForm setShowModal={setShowModal} addCard={setUserCards} />
        </Drawer>
        {loading ? (
          <Loader />
        ) : (
          userCards.map((card) => {
            return <UserCard card={card} />
          })
        )}
      </Container>
    </>
  )
}
