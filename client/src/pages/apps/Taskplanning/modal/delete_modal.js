import Swal from 'sweetalert2';
import api from '_api';

async function updateModuleClient(values, fetchWorkTable) {
  try {
    const deleted = await api.work.deleteClient({ client_id: values.client_id }).then(() => {
      fetchWorkTable();
    });
    console.log('deleted', deleted);
  } catch (error) {
    console.error(error);
  }
}

async function updateModuleProject(values, fetchWorkTable) {
  try {
    const deleted = await api.work.deleteProject({ client_id: values.client_id, project_id: values.project_id }).then(() => {
      fetchWorkTable();
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(values, fetchWorkTable, type) {
  try {
    let updateFunction;

    if (type === 'client') {
      updateFunction = updateModuleClient;
    } else if (type === 'project') {
      updateFunction = updateModuleProject;
    } else {
      // Handle unsupported type or provide a default behavior
      throw new Error(`Unsupported type: ${type}`);
    }

    await Swal.fire({
      title: 'Remove',
      text: 'After removing the Information, this process will not be able to be undone.',
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
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#ff0000"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateFunction(values, fetchWorkTable);
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

export default handleDelete;
