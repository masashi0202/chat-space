

$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main__comments__list">
          <div class="main__comments__list__top">
            <div class="main__comments__list__top__name">
              ${message.user_name}
            </div>
            <div class="main__comments__list__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__comments__list__bottom">
            <p class="main__comments__list__bottom__comment">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="main__comments__list">
          <div class="main__comments__list__top">
            <div class="main__comments__list__top__name">
              ${message.user_name}
            </div>
            <div class="main__comments__list__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__comments__list__bottom">
            <p class="main__comments__list__bottom__comment">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  } 
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__comments').append(html).animate({ scrollTop: $('.main__comments')[0].scrollHeight});;
      $('form')[0].reset();
      $('.main__postmenu__group__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main__postmenu__group__btn').prop('disabled', false);
    });
  });
});