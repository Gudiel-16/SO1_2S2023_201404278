import Swal from "sweetalert2";

export const show_alert = (msg,icon) => {
    Swal.fire({ title: msg, icon: icon, buttonsStyling: true });
}

export const confirmation = async(pid, url, redir) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title: 'Seguro que desea detener el proceso ' + pid + ' ?',
        icon: 'question', showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, elimianr',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then( (result) => {
        if(result.isConfirmed){
            // Peticion eliminar
        }
    });
}

export default show_alert;