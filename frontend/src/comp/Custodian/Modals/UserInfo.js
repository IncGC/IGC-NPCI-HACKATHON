import Modal from '../../UIComp/Modal';
import Input from '../../Home/common/Input';

function UserInfo({ isOpen, data, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls=""
      title="User Information"
    >
      <div className='grid grid-cols-2 gap-4'>
        <Input
          lable='MBE ID'
          value={data.email}
        />
        <Input
          lable='Name'
          value={data.firstName + " " + data.lastName}
        />
        <Input
          lable='Father Name'
          value={data.fatherName}
        />
        <Input
          lable='DOB'
          value={data.DOB}
        />
        <Input
          lable='Email'
          value={data.email}
        />
        <Input
          lable='Mobile'
          value={data.phoneNumber}
        />
        <Input
          lable='Address'
          value={data.address}
        />
        <Input
          lable='Nationality'
          value={data.Nationality}
        />
      </div>
    </Modal>
  )
}

export default UserInfo