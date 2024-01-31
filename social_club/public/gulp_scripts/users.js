$(document).ready(() => {
  start_config();
});
function start_config() {
  $('#main').prop("disabled", false);
  $('#cards').prop("disabled", true);
  $('#setting').prop("disabled", false);
  $('#id01').removeAttr("style").hide();
  $('#id02').removeAttr("style").hide();
  $('#tables').removeAttr("style").hide();
  $('#cancel').on('click', function () {
    $('#id02').removeAttr("style").hide();
    $('#edit').show();
    $('#info').show();
    $('#chat').show();
  });
  $('#cancel1').on('click', function () {
    $('#id01').removeAttr("style").hide();
    $('#new').show();
    $('#chat').show();
    $('#edit').show();
  });
  // При клике на кнопку "Редактировать"
}
function editUser() {
  $('#info').removeAttr("style").hide();
  $('#id02').show();
  $('#edit').removeAttr("style").hide();
  $('#new').removeAttr("style").hide();
  $('#chat').removeAttr("style").hide();
  //$('#edit');
}
function new_message() {
  $('#id01').show();
  $('#new').removeAttr("style").hide();
  $('#chat').removeAttr("style").hide();
  $('#edit').removeAttr("style").hide();
}
function showChats() {
  $('#tables').show();
  $('#chat').removeAttr("style").hide();
  $('#edit').removeAttr("style").hide();
  $('#new').removeAttr("style").hide();
}
function hideChats() {
  $('#tables').removeAttr("style").hide();
  $('#chat').show();
  $('#edit').show();
  $('#new').show();
}