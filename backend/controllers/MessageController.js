const History = require('../models/History')

const MessageController = {
    showError(res, message, status = 202) {
        const m = errorList.filter(v => v.id == message)
        res.status(status)
            .json(m[0] ? m[0].value : message)
    },
    showSuccess(res, message, history = null, status = 200, token = null) {
        const m = successList.filter(v => v.id == message)
        if (history) {
            History.create(history)
        }
        if (token) {
            res.header("authorization", `Bearer ${token}`)
                .status(status)
                .json(m[0] ? m[0].value : message)
        } else {
            res.status(status)
                .json(m[0] ? m[0].value : message)
        }
    }
}

const errorList = [
    // usuarios
    {id: 1001, value: 'Rellena la contrasñea'},
    {id: 1002, value: 'Rellena los campos necesarios'},
    {id: 1003, value: 'Las contraseñas no coinciden'},
    {id: 1004, value: 'Rellena el Nombre de Usuario'},
    {id: 1005, value: 'El nombre de usuario tienes que ser de ' + process.env.LOGIN_LEN + ' o más caracteres'},
    {id: 1006, value: 'El e-mail es necesario'},
    {id: 1007, value: 'El nombre de usuario ya está registrado'},
    {id: 1008, value: 'El e-mail ya está registrado'},
    {id: 1009, value: 'La contraseña tiene que ser de ' + process.env.PASSWD_LEN + ' o más caracteres'},
    {id: 1010, value: 'Usuario no encontrado'},
    {id: 1011, value: 'Contraseña Incorrecta'},
    {id: 1012, value: 'Inicia Sesión para ver el contenido'},
    {id: 1013, value: 'Error con el formato del e-mail'},
    {id: 1014, value: 'Error con el token'},
    {id: 1015, value: 'Ya has iniciado sesión'},
    {id: 1016, value: 'Token inválido'},
    {id: 1017, value: 'Acceso denegado. No se ha facilitado token'},
    {id: 1030, value: 'No tienes permisos para entrar'},

    // productos
    {id: 2001, value: 'Producto eliminado correctamente'},
    {id: 2002, value: 'Error al eliminar el Producto'},
    {id: 2003, value: 'Rellena el nombre'},
    {id: 2004, value: 'Rellena el Enlace Amigable'},
    {id: 2005, value: 'El Enlace Amigable ya existe'},
    {id: 2006, value: 'El Precio es necesario'},
    {id: 2007, value: 'La Categoría es necesaria'},
    {id: 2008, value: 'La cantidad es necesaria'},

    // categorias
    {id: 3001, value: 'Rellena los campos'},
    {id: 3002, value: 'Error al eliminar la categoría'},
    {id: 3003, value: 'Rellena el nombre'},
    {id: 3004, value: 'Rellena el Enlace Amigable'},
    {id: 3005, value: 'El Enlace Amigable ya existe'},
    {id: 3006, value: 'No se ha podido actualizar la categoría'},
    {id: 3007, value: 'No se ha podido guardar la categoría'},
    
    // filtros
    {id: 4001, value: 'Error con los filtros'},

    // cart
    {id: 5001, value: 'Error en el carrito'},
    {id: 5002, value: 'Producto no encontrado'},
    {id: 5003, value: 'No hay suficiente stock del producto'},
]

const successList = [
    // usuarios
    {id: 1001, value: 'Token Eliminado'},
    {id: 1002, value: 'Token Creado'},
    {id: 1003, value: 'Contraseña actualizada correctamente'},
    {id: 1004, value: 'Cuenta creada correctamente'},

    // productos
    {id: 2001, value: 'Producto actualizado correctamente'},
    {id: 2002, value: 'No se ha podido actualizar el Producto'},
    {id: 2003, value: 'Producto creado correctamente'},
    {id: 2004, value: 'No se ha podido guardar el Producto'},
    
    // categorias
    {id: 3001, value: 'Categoría eliminada correctamente'},
    {id: 3002, value: 'Categoría actualizada correctamente'},
    {id: 3003, value: 'Categoría creada correctamente'},

    // carrito
    {id: 4001, value: 'Producto borrado del carrito'},
    {id: 4002, value: 'Producto añadido  del carrito'}
]

module.exports = MessageController