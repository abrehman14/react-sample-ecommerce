import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default function Notification({ isOpen, handleNotification, message }) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={function noRefCheck() {}}>
        <ModalHeader charCode='Y' toggle={function noRefCheck() {}}>
          Modal title
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={function noRefCheck() {}}>
            Do Something
          </Button>{' '}
          <Button onClick={() => handleNotification()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
