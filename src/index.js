const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mysql = require("mysql")


//middlewares
app.use(morgan('dev')) //Para ver detalles de la peticiones en la consola
app.use(express.urlencoded({extended: false})) //Por si nos envian datos como formularios, para entenderlos
app.use(express.json()) //Le permite al servidor, recibir formatos json y entenderlos
app.use(cors())



//Puerto
app.set('port', process.env.PORT || 5000); //Lo asignamos asi, porque lo vamos a subir a un hosting y el procces.env.PORT sera usado por ese hosting


//Crear la conexion a la base de datos
const db = mysql.createPool({
    host: "db4free.net",
    user: "adminfrsftw",
    password: "test1234",
    database: "freesoftware",
});

//Ruta de las regiones
app.get('/region/:id', (req, res) => {

    const idSucursal = req.params.id;

    const selectRegion = `Select 
    c.comercioNombre,
    d.deptoNombre,
    m.municipioNombre,
    s.sucursalDireccion,
    q.quejaFecha,
    q.quejaDescripcion
    from Queja as q 
    inner join Sucursal as s using (idSucursal)
    join Comercio as c using(idComercio)
    join Municipio as m using(idMunicipio)
    join Departamento as d using(idDepto)
    where idRegion = ${idSucursal}
    order by idSucursal`;

    db.query(selectRegion, (error, resultado)=>{
        if (error) {
            throw error
        }else{

            res.json(resultado)
        }
    })


})

//Ruta de los municipio
app.get('/municipio/:id', (req, res) => {

    const idMunicipio = req.params.id;

    const selectMunicipio = `Select 
    c.comercioNombre,
    s.sucursalDireccion,
    q.quejaFecha,
    q.quejaDescripcion
    from Queja as q 
    inner join Sucursal as s using (idSucursal)
    join Comercio as c using(idComercio)
    join Municipio as m using(idMunicipio)
    join Departamento as d using(idDepto)
    where idMunicipio = ${idMunicipio}
    order by idSucursal`;

    db.query(selectMunicipio, (error, resultado)=>{
        if (error) {
            throw error
        }else{

            res.json(resultado)
        }
    })


})

//Ruta de los departamento
app.get('/departamento/:id', (req, res) => {

    const idDepartamento= req.params.id;

    const selectDepartamento = `Select 
    c.comercioNombre,
    m.municipioNombre,
    s.sucursalDireccion,
    q.quejaFecha,
    q.quejaDescripcion
    from Queja as q 
    inner join Sucursal as s using (idSucursal)
    join Comercio as c using(idComercio)
    join Municipio as m using(idMunicipio)
    join Departamento as d using(idDepto)
    where idDepto = ${idDepartamento}
    order by idSucursal`;

    db.query(selectDepartamento, (error, resultado)=>{
        if (error) {
            throw error
        }else{

            res.json(resultado)
        }
    })


})

//Ruta de comercios
app.get('/comercio/:id', (req, res) => {

    const idComercio= req.params.id;

    const selectComercio = `Select 
    d.deptoNombre,
    m.municipioNombre,
    s.sucursalDireccion,
    q.quejaFecha,
    q.quejaDescripcion
    from Queja as q 
    inner join Sucursal as s using (idSucursal)
    join Comercio as c using(idComercio)
    join Municipio as m using(idMunicipio)
    join Departamento as d using(idDepto)
    where idComercio = ${idComercio}
    order by idSucursal`;

    db.query(selectComercio, (error, resultado)=>{
        if (error) {
            throw error
        }else{

            res.json(resultado)
        }
    })


})




//Iniciando el servidor
app.listen(app.get('port'), ()=>{
    console.log(`Aplicativo corriendo en el puerto siguiente ---> ${app.get('port')}`);
})