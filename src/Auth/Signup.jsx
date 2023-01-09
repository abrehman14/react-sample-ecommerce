import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Logo from '../assets/logo2.png'
import NavRoutes from '../common/NavRoutes'
import { ACNetwork, config, Urls } from '../config'
import useToken from '../hooks/useToken'
import '../styles/Form.css'
import { signupSchema } from '../validations'
import GeneralInfoForm from './Signup/GeneralForm'

const initialValues = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
}

const Signup = () => {
  let navigate = useNavigate()
  const { Login, setProfile } = useToken()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values) => {
    setLoading(true)
    const obj = {}
    const response = await ACNetwork.post(
      Urls.signUp,
      values,
      (
        await config()
      ).headers
    )
    if (!response.ok) {
      setLoading(false)
      return toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    setLoading(false)
    Login(response.data.token)
    setProfile(response.data.customer)
    navigate(NavRoutes.Homepage)
  }
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: signupSchema,
  })

  const { t } = useTranslation(['Signup'])
  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'
      style={{ height: '100vh' }}
    >
      <Link to={NavRoutes.Homepage}>
        <img src={Logo} alt='Amazaon Logo' style={{ width: '200px' }} />
      </Link>
      <div className='border ps-5 pe-5 pt-4 pb-4 mt-3 Signup-form'>
        <h2>{t('createaccount')}</h2>
        <GeneralInfoForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          onSignUp={handleSubmit}
          loading={loading}
        />
        <div className='text-center'>
          Already have an account? <Link to={NavRoutes.Login}>Login</Link>
        </div>
      </div>
    </div>
  )
}
export default Signup
