import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Input, Label } from 'reactstrap'
import NavRoutes from '../common/NavRoutes'
import '../styles/CartPage.css'

const initialValues = {
  code: '',
}

export default function CodeVerify() {
  let location = useLocation()
  let navigate = useNavigate()

  const onSubmit = (data) => {
    if (location.state.code != data.code) {
      return toast.error('Not matched', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    navigate(NavRoutes.newPassword, {
      state: {
        email: location.state.email,
      },
    })
  }

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'
      style={{
        height: '80vh',
      }}
    >
      {location && location.state.code}
      <div className='border p-5'>
        <h1>Verify email address</h1>
        <p>
          To verify your email. we've send a One Time Password (OTP) to testing
        </p>
        <Label>Enter OTP</Label>
        <Input
          name='code'
          type='text'
          onChange={handleChange}
          value={values.code}
        />
        <Button
          className='amazon-btn mt-3'
          style={{ marginLeft: '140px' }}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
