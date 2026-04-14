/* >>> RECUERDA: Reemplazar esta URL con la tuya generada en Apps Script <<< */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwi98pvM5crhrQnT_xE-w-1ct4tsX05H-QJJj7ytjrI6WQBOTjR4W4vVRsSfkrTvb8a/exec"; 

const form = document.getElementById('registroForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Cambiamos el estado del botón a "Cargando"
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    // Preparamos los datos
    const formData = new FormData(form);
    const urlEncodedData = new URLSearchParams(formData).toString();

    // Enviamos los datos vía fetch
    fetch(SCRIPT_URL, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData 
    })
    .then(response => {
        // Éxito
        showToast("¡Registro exitoso! Tus datos han sido guardados.");
        form.reset(); // Limpia el formulario
    })
    .catch(error => {
        // Error
        console.error('Error!', error.message);
        showToast("Error de conexión. Asegúrate de configurar la URL de Apps Script.", true);
    })
    .finally(() => {
        // Restauramos el botón
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    });
});

// Función para mostrar alertas bonitas (Toasts)
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    
    if (isError) {
        toast.style.backgroundColor = '#EF4444'; // Rojo para error
        toast.querySelector('i').className = 'fa-solid fa-circle-exclamation mr-2';
    } else {
        toast.style.backgroundColor = '#10B981'; // Verde para éxito
        toast.querySelector('i').className = 'fa-solid fa-circle-check mr-2';
    }

    toast.classList.add('show');
    
    // Ocultar la notificación después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
