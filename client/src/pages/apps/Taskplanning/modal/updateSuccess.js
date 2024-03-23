import Swal from 'sweetalert2';
import api from '_api';

async function updateSuccess(values, fetchWorkTable) {
  try {
    const updateStatus = await api.work.updateStatusSuccess({ work_id: values.work_id }).then(() => {
      fetchWorkTable();
      console.log('updateStatus', updateStatus);
    });
  } catch (error) {
    console.error(error);
  }
}

async function updateSuccessArray(values, fetchWorkTable) {
  try {
    console.log('Display Data Value', values);
    const updatePromises = values.map(async (value) => {
      return api.work.updateStatusSuccess({ work_id: value });
    });

    const updateStatusArray = await Promise.all(updatePromises);
    console.log('updateStatus', updateStatusArray);

    fetchWorkTable();
  } catch (error) {
    console.error(error);
  }
}

async function handleUpdate(values, fetchWorkTable) {
  try {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'When saved, the status will change to Success and cannot be edited.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0066FF',
      cancelButtonColor: '#0066FF',
      reverseButtons: true,
      confirmButtonText: 'Confirm',
      customClass: {
        confirmButton: 'confirm-rounded-button',
        cancelButton: 'outlined-button'
      },
      iconHtml:
        '<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#FBC756"/></svg>'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (Array.isArray(values)) {
          const updateValues = values.map((item) => item.work_id);
          await updateSuccessArray(updateValues, fetchWorkTable);
        } else {
          await updateSuccess(values, fetchWorkTable);
        }

        Swal.fire({
          title: 'Success',
          customClass: 'modal-success',
          allowEscapeKey: true,
          timer: 2000,
          showConfirmButton: false,
          iconHtml:
            '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export default handleUpdate;
