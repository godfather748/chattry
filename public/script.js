let socket = io()

// let username;

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
})


socket.on('logged-in', () => {
    // username = data.username
    $('#loginBox').hide()
    $('#chatBox').show()
})

socket.on('login failed',()=>{
    window.alert('incorrect username or password')
})

$('#btnSend').click(()=>{
    socket.emit('msg_send',{
        // from: username,
        to: $('#inpToUser').val(),
        message: $('#inpMessage').val()
    })
    $('#ulMessageList').append($('<li>').text(`You: ${$('#inpMessage').val()}`))
    $('#inpMessage').val('')
})

socket.on('msg_rcvd',(data)=>{
    $('#ulMessageList').append($('<li>').text(`${data.from}: ${data.message}`))
})


// let btnSend = document.getElementById('btnSend')
// let inpMessage = document.getElementById('inpMessage')
// let ulMessageList = document.getElementById('ulMessageList')

// btnSend.onclick = function () {
//     socket.emit('msg_send', {
//         message: inpMessage.value
//     })
//     inpMessage.value=''
// }

// socket.on('msg_rcvd',(data)=>{
//     let liNewMessage=document.createElement('li')
//     liNewMessage.innerText=data.message
//     ulMessageList.appendChild(liNewMessage)
// })