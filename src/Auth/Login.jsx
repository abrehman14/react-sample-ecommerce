// Library Imports
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from 'reactstrap'

// Custom Imports
import Logo from '../assets/logo2.png'
import '../styles/Form.css'
import { loginSchema } from '../validations/LoginSchema'
import GoogleLogin from './AuthProviders/GoogleLogin'
import AuthInput from './Signup/AuthInput'
// import FacebookLogin from './AuthProviders/FacebookLogin';
import { Icons } from '../common'
import NavRoutes from '../common/NavRoutes'
import LoadingButton from '../components/LoadingButton'
import { ACNetwork, config, Urls } from '../config'
import useToken from '../hooks/useToken'

const initialValues = {
  email: '',
  password: '',
}

// const clientId = '602962461138-h83tgckucrbsbh5m4q7e9d1doh3hrq50.apps.googleusercontent.com';
const Login = () => {
  const { Login, setProfile } = useToken()
  const [loading, setLoading] = useState(false)
  const { FC } = Icons
  let navigate = useNavigate()
  const onSubmit = async (values) => {
    setLoading(true)
    const response = await ACNetwork.post(Urls.login, values, {})

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
    validationSchema: loginSchema,
  })

  useEffect(() => {}, [])

  // const handleGoogle = async () => {
  //     const response = await ACNetwork.get(Urls.googleLogin, (await config()).headers, {});

  //     console.log(response);
  // };

  const responseGoogle = async (response) => {
    console.log(response.tokenId)

    const obj = {
      tokenId: response.tokenId,
    }

    const res = await ACNetwork.post(
      Urls.googleLogin,
      obj,
      (
        await config()
      ).headers
    )
    if (!res.ok) {
      return toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    Login(res.data.token)
    setProfile(res.data.customer)
    navigate(NavRoutes.Homepage)
  }

  const { t } = useTranslation(['Login'])

  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'
      style={{ height: '100vh' }}
    >
      <Link to={NavRoutes.Homepage}>
        {' '}
        <img src={Logo} alt='Amazaon Logo' style={{ width: '200px' }} />
      </Link>

      <div className='border ps-5 pe-5 pt-4 pb-4 mt-3 login-form'>
        <h2>{t('Signin')}</h2>
        <div className='mt-3'>
          <AuthInput
            label='Email'
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            error={errors}
          />
        </div>
        <div className='mt-3'>
          <AuthInput
            label={t('Password')}
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
            error={errors}
          />
        </div>
        <Link
          to={NavRoutes.forgetPassword}
          style={{ float: 'right', fontSize: '0.75em' }}
        >
          ForgetPassword?
        </Link>
        <br />
        <div className='mt-3' onClick={handleSubmit}>
          <LoadingButton type='submit' loading={loading} text={t('Signin')} />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <GoogleLogin
            clientId='480584143172-8hj4e7ej9ca27i5uhv54p5cih7m4uskj.apps.googleusercontent.com'
            responseGoogle={responseGoogle}
          />
        </div>
        <NavLink to={NavRoutes.Signup}>
          <Button type='button' className='w-100 mt-3'>
            {t('I am a new customer')}
          </Button>
        </NavLink>
      </div>
    </div>
  )
}

export default Login

//  <FacebookLogin responseFacebook={responseFacebook  componentClicked={componentClicked} />
{
}
//  const responseGoogle = (response) => {
//      console.log(response);
//  };
//   const responseFacebook = (response) => {
//       console.log(response);
//   };
