Esta es mi primer API creada con TypeScript, PostgreSQL y Express.

Este proyecto se enfoca en comunicar una base de datos montada en AWS mediante un API para poder interactuar con la información desde una solución de Power PLatform.

La estructura del api es la siguiente:

app.ts => routers => controller => dbFunction => validation

Descripción de los elementos:

    app.ts: Es el origen de la app, cada petición que reciba el API va a ser recibida primeramente por el app.ts y después se delega el procesamiento a los demás elementos.

    routers: Son enrutadores que permiten agrupar las funciones especificas de cada db en un archivo.

    controller: En este archivo se almacena la lógica de negocio para las interacciones con las bases de datos, cada tabla tiene un controller exclusivo, así se le da un mejór orden al proyecto.

    dbFunction: Aquí se declaran las funciones que tienen los queries a la base de datos, se tienen algunas funciones que funcionan de forma trasnversal en cualquier base de datos, y también se tienen otras funciones especificas para cada tabla.

    validation: Este archivo almacena funciones de validación específicas para revisar los datos que se ingresan, estas funciones de validación tienen distintos objetivos:
    Validar tipo de datos de entrada.
    Validar estructura de los datos según los requisitos de cada tabla.
    Algunos campos de bases de datos reciben solo ciertos valores definidos, hay una función que lee los requisitos del campo y valida que el dato que se quiera ingresar esté permitido.