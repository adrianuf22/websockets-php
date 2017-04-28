(function() {
    var btnStart = document.querySelector('button[name="start_poll"]');
    var btnSend = document.querySelector('button[name="send_poll"]');
    var chatBox = document.querySelector('textarea[name="chat_poll"]');
    var lastMessageTS = null;
    
    btnStart.addEventListener('click', function() {
        setInterval(function() {
            $.get('polling/polling.php', {timestamp: lastMessageTS}).then(function(data) {
                if (data) {
                    lastMessageTS = data.timestamp;
                    if (data.message) {
                        chatBox.value += "\n" + new Date(data.timestamp * 1000).toLocaleString() + ": " + data.message;
                    }
                }
            });
        }, 1000);
    }, false);
    
    btnSend.addEventListener('click', function() {
        let message = document.querySelector('input[name="message_poll"]');
        
        $.post('polling/send.php', {message: message.value}).then(function() {
            message.value = '';
        });
    }, false);
    
}());