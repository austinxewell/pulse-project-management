import Swal from 'sweetalert2'
import type { SweetAlertIcons } from '@/types/SweetAlert'

export const showToast = (icon: SweetAlertIcons, message: string) => {
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })
}

export const showAlert = (icon: SweetAlertIcons, title: string, message: string) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
  })
}
