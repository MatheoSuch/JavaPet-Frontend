import javaPetApi from '../../../../api/javaPetApi';
import Swal from 'sweetalert2';

export const eliminarPaciente = async (id, callback) => {
	try {
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: '¡Esta acción eliminará al paciente permanentemente!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
			customClass: {
				popup: 'swal2-custom-popup',
				title: 'swal2-custom-title',
				content: 'swal2-custom-content',
				confirmButton: 'swal2-custom-confirm-button',
				cancelButton: 'swal2-custom-cancel-button',
			},
		});

		if (result.isConfirmed) {
			const resp = await javaPetApi.delete(`/admin/eliminarPaciente/${id}`);

			if (callback) {
				callback();
			}
			Swal.fire({
				icon: 'success',
				title: '¡Paciente eliminado!',
				text: 'El paciente ha sido eliminado correctamente.',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK',
				customClass: {
					popup: 'swal2-custom-popup',
					title: 'swal2-custom-title',
					content: 'swal2-custom-content',
					confirmButton: 'swal2-custom-confirm-button',
				},
			});
		}
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No se pudo eliminar el paciente. Inténtalo de nuevo más tarde.',
			footer: '<a href="#">Why do I have this issue?</a>',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Cerrar',
			customClass: {
				popup: 'swal2-custom-popup',
				title: 'swal2-custom-title',
				content: 'swal2-custom-content',
				footer: 'swal2-custom-footer',
				confirmButton: 'swal2-custom-confirm-button',
			},
		});
	}
};
