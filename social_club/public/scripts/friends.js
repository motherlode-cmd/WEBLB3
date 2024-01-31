
$(document).ready(() => {
    start_config();
});
  
function start_config() {
  $('#addForm').removeAttr("style").hide();
}
function cancelAdd() {
  $('#addForm').removeAttr("style").hide();
  $('#addFriend').show();
}
function addFriend() {
  $('#addFriend').removeAttr("style").hide();
  $('#addForm').show();
}

function sendPost() {
  const friend = $('#newFriend').val();
  console.log("Send");
  console.log(friend);
  $.ajax({
    type: 'POST',
    url: `/addFriend/${user.id}`,
    data: { name: friend},
    success: function (data) {
      location.reload();
    },
    error: function (error) {
    }
  });
}
