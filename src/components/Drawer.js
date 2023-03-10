import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'
import '../styles/CartPage.css'

export default function Drawer({ children, open, setOpen, Header }) {
  return (
    <div>
      <Offcanvas isOpen={open} direction='end' toggle={() => setOpen(!open)}>
        <OffcanvasHeader toggle={() => setOpen(!open)}>
          {Header}
        </OffcanvasHeader>
        <OffcanvasBody>{children}</OffcanvasBody>
      </Offcanvas>
    </div>
  )
}
