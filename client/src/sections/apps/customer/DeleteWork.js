import React from 'react';
import Swal from 'sweetalert2';
import api from '_api';
import { useNavigate } from 'react-router-dom';

const DeleteWork = ({ worknoId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่',
      text: 'จะลบข้อมูลจริงๆ ละน้า เอาคืนไม่ได้เน้อ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ฉันต้องการลบ',
      cancelButtonText: 'ฉันไม่ต้องการลบ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.workno.deleteWorkNo({ worknoId });
          Swal.fire('ลบข้อมูลเรียบร้อยแล้ว', '', 'success');
          navigate('/delete-work'); // Replace '/delete-work' with the actual URL you want to navigate to
        } catch (error) {
          console.error(error);
          Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
      }
    });
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteWork;
