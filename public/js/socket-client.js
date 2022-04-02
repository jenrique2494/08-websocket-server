console.log('Socket Client Running');

// referencias del html

const lblOnline=document.querySelector('#lblOnline');
const lblOffline=document.querySelector('#lblOffline');
const txtMessage=document.querySelector('#txtMessage');
const btnSend=document.querySelector('#btnSend');

const socket = io();

socket.on('connect', function() {
    //console.log('Connected to server');
    lblOffline.style.display='none';
    lblOnline.style.display='';
});

socket.on('disconnect', function() {
    //console.log('desconectado del server');
    lblOffline.style.display='';
    lblOnline.style.display='none';
});

socket.on('mensaje', function(message) {
    console.log('mensaje recibido: ', message);
});

btnSend.addEventListener('click', function() {
    const message = txtMessage.value;
    const payload = {
        message,
        from: 'user',
        createdAt: new Date().getTime(),
        id:'123abc'
    };

    console.log(payload);
    socket.emit('mensaje', payload, (id) => {
        console.log('desde el server: ', id);
    });

});