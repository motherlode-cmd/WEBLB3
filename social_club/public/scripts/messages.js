
$(document).ready(()=> {
    start_config();
});

function start_config() {
    $('#messageForm').removeAttr("style").hide();
    $('#writeMessage').on('click', function() {
        // Отмена отправки формы
        $('#messageForm').show();
    });
    $('#cancel').on('click', function() {
        // Отмена отправки формы
        $('#messageForm').removeAttr("style").hide();
    });
};

function callAjax() {
    const recipientName = recipientData.name;
    const messageText = $('#messageText').val();
    const senderInfo = senderData.id; // Assuming you have an element with id 'senderId'
    console.log(messageText);
    $.ajax({
      type: 'POST',
      url: `/newMessage/${senderInfo}`,
      data: { name: recipientName, message: messageText },
      success: function (data) {
        $('#messageForm').removeAttr("style").hide();
        location.reload();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

function deleteMessage(id) {
    let mess =  messagesData.findIndex(message => message.id == id);
    if (mess !== -1) {
    $.ajax({
            type: 'DELETE',
            url: `/deleteMessage`,
            data: { message: messagesData[mess]},
            success: function (data) {
              location.reload();
            },
            error: function (error) {
              console.log(error);
            }
        });
    }
}
  
