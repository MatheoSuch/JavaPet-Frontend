import javaPetApi from '../../../../api/javaPetApi';
import Swal from 'sweetalert2';

export const eliminarPaciente = async (id, callback) => {
	try {
		const resp = await javaPetApi.delete(`/admin/eliminarPaciente/${id}`);
		console.log(resp);
		if (callback) {
			callback();
		}
		Swal.fire({
			icon: 'success',
			title: '¡Paciente eliminado!',
			text: 'El paciente ha sido eliminado correctamente.',
		});
	} catch (error) {
		console.error('Error al eliminar paciente:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No se pudo eliminar el paciente. Inténtalo de nuevo más tarde.',
			footer: '<a href="#">Why do I have this issue?</a>',
		});
	}
};
