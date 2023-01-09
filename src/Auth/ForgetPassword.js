import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Input, Label } from 'reactstrap'
import NavRoutes from '../common/NavRoutes'
import { ACNetwork, config, Urls } from '../config'
import '../styles/CartPage.css'
import { ForgetPassSchema } from '../validations/ForgetPassSchema'

const initialValues = {
  email: '',
}

export default function ForgetPassword() {
  let navigate = useNavigate()
  const onSubmit = async (data) => {
    const response = await ACNetwork.post(
      Urls.forgetPassword,
      data,
      (
        await config()
      ).headers
    )

    if (response.status == '404') {
      return toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    navigate(NavRoutes.codeVerification, {
      state: { code: response.data.code, email: data.email },
    })
  }

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: ForgetPassSchema,
  })

  return (
    <div
      className='d-flex align-items-center justify-content-center flex-column'
      style={{ height: '80vh' }}
    >
      <div className='border p-5 mt-4'>
        <h1>Password assistance</h1>
        <p>Enter the email address associated with you Amazon account</p>
        <Label>Email</Label>
        <Input
          name='email'
          type='email'
          value={values.email}
          onChange={handleChange}
        />
        <span style={{ color: 'red' }}>{errors && errors['email']}</span>
        <br />
        <Button
          className='amazon-btn mt-4'
          style={{ marginLeft: '110px' }}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
