$(document).ready(() => {
  start_config();
});
function start_config() {
  $('#main').removeAttr("style").hide();
  $('#id02').removeAttr("style").hide();
  $('#addUser').on('click', function () {
    // Отмена отправки формы
    $('#addUser').removeAttr("style").hide();
    $('#id02').show();
  });
  $('#cancel').on('click', function () {
    // Отмена отправки формы
    $('#id02').removeAttr("style").hide();
    $('#addUser').show();
  });
}
;
function deleteUsr(userId) {
  if (confirm('Вы уверены, что хотите удалить пользователя?')) {
    $.ajax({
      url: '/deleteUser/' + userId,
      type: 'DELETE',
      success: function (response) {
        // Обработка успешного удаления
        console.log(response);
        // Перезагрузите страницу или выполните другие необходимые действия
        location.reload();
      },
      error: function (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    });
  }
}
;