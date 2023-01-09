import i18next from 'i18next'
import { useEffect, useState } from 'react'
import OneSignalReact from 'react-onesignal'

import Loader from '../../assets/animations'
import { ACNetwork, config, Urls } from '../../config'
import useToken from '../../hooks/useToken'
import CardHandler from './CardHandler'

const HomePage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser, token } = useToken()
  useEffect(() => {
    GetAllCategories()
  }, [])

  useEffect(() => {
    if (token) {
      OneSignalReact.init({
        appId: 'c39fd41f-9972-43bd-adc8-454cb203c9c0',
      })
      OneSignalReact.setExternalUserId(currentUser?._id)
    }
  }, [])

  const GetAllCategories = async () => {
    setLoading(true)
    const response = await ACNetwork.get(
      Urls.getCategories(i18next.language),
      (
        await config()
      ).headers
    )
    setCategories(response.data.categories)
    setLoading(false)
  }
  return <>{loading ? <Loader /> : <CardHandler categories={categories} />}</>
}

export default HomePage
