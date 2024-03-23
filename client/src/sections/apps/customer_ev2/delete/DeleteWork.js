import React from 'react';
import Swal from 'sweetalert2';
import api from '_api';

const DeleteWork = ({ customerId }) => {
  console.log('customerId', customerId);
  const handleDeleteClick = () => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่',
      text: 'จะลบข้อมูลจริงๆ ละน้า เอาคืนไม่ได้เน้อ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ฉันต้องการลบ',
      cancelButtonText: 'ฉันไม่ต้องการลบ'
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await api.work.deleteCustomer({ customerId });
          console.log('response', response);
          Swal.fire('ลบข้อมูลเรียบร้อยแล้ว', '', 'success').then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error(error);
          Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
      }
    });
  };

  return handleDeleteClick;
};

export default DeleteWork;
