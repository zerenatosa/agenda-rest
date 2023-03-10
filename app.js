const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaClientes = require('./routes/clientes');
const rotaClientes_perfil = require('./routes/clientes_perfil');
const rotaClientes_segmentacao = require('./routes/clientes_segmentacao');
const rotaNotas = require('./routes/notas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json()); //apenas json de entrada no body


app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }

    next();
})



app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/clientes', rotaClientes);
app.use('/clientes_perfil', rotaClientes_perfil);
app.use('/clientes_segmentacao', rotaClientes_segmentacao);
app.use('/notas', rotaNotas);

//qdo não encontrar a rota
app.use((req, res, next)=>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem:error.message
        }
    });
})

module.exports = app;