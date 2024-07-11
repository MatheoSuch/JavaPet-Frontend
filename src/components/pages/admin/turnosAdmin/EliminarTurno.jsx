import javaPetApi from '../../../../api/javaPetApi';
import Swal from 'sweetalert2';

export const eliminarTurno = async (id, callback) => {
	try {
		const resp = await javaPetApi.delete(`/admin/eliminarTurno/${id}`);
		console.log(resp);
		if (callback) {
			callback(); // Llama a la función de retorno de llamada para actualizar la lista de turnos
		}
		Swal.fire({
			icon: 'success',
			title: '¡Turno eliminado!',
			text: 'El turno ha sido eliminado correctamente.',
		});
	} catch (error) {
		console.error('Error al eliminar turno:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No se pudo eliminar el turno. Inténtalo de nuevo más tarde.',
			footer: '<a href="#">Why do I have this issue?</a>',
		});
	}
};
