import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'reactstrap'
import Loader from '../../assets/animations'
import Drawer from '../../components/Drawer'
import NoData from '../../components/NoData'
import { ACNetwork, config, Urls } from '../../config'
import AddressForm from '../Order/AddressForm'
import AddressCards from './AddressCards'

export default function Address() {
  const [loading, setLoading] = useState(true)
  const [addressList, setAddressList] = useState([])
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    GetAddresses()
  }, [])
  const GetAddresses = async () => {
    setLoading(true)
    const response = await ACNetwork.get(
      Urls.getAddresses,
      (
        await config()
      ).headers
    )
    setAddressList(response.data.addresses)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    setAddressList(addressList.filter((address) => address._id !== id))
    const response = await ACNetwork.delete(
      Urls.deleteAddress(id),
      {},
      (
        await config()
      ).headers
    )
    if (!response.ok) {
      return toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT })
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='btn-align'>
            <Button onClick={() => setShowModal(true)} className='amazon-btn'>
              Add Address
            </Button>
          </div>
          <Drawer open={showModal} setOpen={setShowModal} Header='Add Address'>
            <AddressForm
              setOpen={setShowModal}
              setAddress={setAddressList}
              addressList={addressList}
            />
          </Drawer>

          {addressList?.length !== 0 ? (
            <AddressCards
              addressList={addressList}
              handleDelete={handleDelete}
            />
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  )
}
