function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellidos').value.trim();
    const mail = document.getElementById('mail').value.trim();

    if (!nombre) {
        alert('Por favor, completa el campo Nombre.');
        return false;
    }

    if (!apellido) {
        alert('Por favor, completa el campo Apellido.');
        return false;
    }

    if (!mail) {
        alert('Por favor, completa el campo E-mail.');
        return false;
    }

}