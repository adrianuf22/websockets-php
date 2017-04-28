(function(){
    var btnStart = document.querySelector('button[name="start_longpoll"]');
    var btnSend = document.querySelector('button[name="send_longpoll"]');
    var chatBox = document.querySelector('textarea[name="chat_longpoll"]');
    var lastMessageTS = null;
    
    btnStart.addEventListener('click', function() {
        connect();
    }, false);
    
    btnSend.addEventListener('click', function() {
        let message = document.querySelector('input[name="message_longpoll"]');
        
        $.post('longpolling/send.php', {message: message.value}).then(function() {
            message.value = '';
        });
    }, false);
    
    function connect() {
        $.get('longpolling/longpolling.php', {timestamp: lastMessageTS}).then(function(data) {
            if (data && data.empty !== true) {
                lastMessageTS = data.timestamp;
                if (data.message) {
                    chatBox.value += "\n" + new Date(data.timestamp * 1000).toLocaleString() + ": " + data.message;
                }
            }
            connect();
        });
    }
}());
