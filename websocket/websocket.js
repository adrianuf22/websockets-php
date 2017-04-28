(function(){
    var chatBox = document.querySelector('textarea[name="chat_ws"]');
    let message = document.querySelector('input[name="message_ws"]');
    let file = document.querySelector('input[name="file_ws"]');
    
    var btnStart = document.querySelector('button[name="start_ws"]');
    var conn = null;
    btnStart.addEventListener('click', function() {
        conn = new WebSocket('ws://192.168.33.10:8181');
        conn.onmessage = onmessage;
        conn.onopen = onopen;
        conn.onclose = onclose;
    }, false);
    
    var btnSend = document.querySelector('button[name="send_ws"]');
    btnSend.addEventListener('click', function() {
        if (conn) {
            conn.send(message.value);
            message.value = '';
        }
    }, false);
    
    function onmessage(e) { 
        chatBox.value += "\n" + new Date().toLocaleString() + ": " + e.data;
    }
    
    file.addEventListener('change', function() {
        conn.sendBinary(this.files[0]);
    });
    
    function onopen(e) {
        console.log(e);
        chatBox.value = 'Connected, enjoy!';
    }
    
    function onclose(e) {
        chatBox.value += "Ooops, the server is down!"
        chatBox.parentNode.className += ' has-error';
        message.disabled = true;
    }
}());