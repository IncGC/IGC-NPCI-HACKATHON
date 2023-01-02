import Modal from '../../UIComp/Modal';
import certificateImg from '../../../assets/img/certificate.png'

function CertificateAsPdf({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="w-11/12 sm:w-4/5"
      title=' '
    >
      <img src={certificateImg} alt="" />
    </Modal>
  )
}

export default CertificateAsPdf