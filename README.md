# E-Commerce GeeksHubs

_Proyecto final de GeeksHubs montando un backend para el e-commerce._

## Comenzando 🚀

_El proyecto está dividido en 2 carpetas: Frontend y Backend_

### FrontEnd

_Contiene una página web creada en React para mostrar todo lo que hemos hecho en el Backend_
_Se ejecuta en el puerto 3000_

#### Instalar e Iniciar

```
cd /frontend
npm i
npm start
```

### Backend

_Contiene lo desarrollado para el funcionamiento de la api rest._
_Se ejecuta en el puerto 4000_
_Usa una bbdd de mongoose subida a internet_
_Tiene datos preinstalados_

#### Instalar e Iniciar

```
cd /backend
npm i
npm start
```

## Cosas Pendientes
_Aun quendan cosas pendientes. Debido a un alto volumen de trabajo a nivel personal no he podido dedicar más tiempo a este proyecto._
* Finalizar la compra (me he quedado en el punto de seleccionar dirección de entrega)
_Sin la compra finalizada, no hay datos para coger los más vendidos y hacer un listado de pedidos_

## ¿Cómo funciona?
_El FrontOffice está optimizado para que el trabajador tenga un submenú de vendedor_
* Usuario: vendor
* Pswd: vendor

### Usuario
_Se usa un token guardado en LocalStorage. Backend lo desencripta y Valida_

### Carrito
_Se usa un token guardado en localStorage donde está todo guardado. El Backend lo desencripta y lo devuelve con la inforamción necesaria_

### MiddleWares Backend
_En todos los puntos de salida de la api hay middlewares para asegurarnos que lo que estamos manipulando esté correcto y no haya errores_

---
⌨️ con ❤️ por [UriMarti](https://urimarti.com) 😊
