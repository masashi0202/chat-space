$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main__comments__list" data-message-id=${message.id}>
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
       `<div class="main__comments__list" data-message-id=${message.id}>
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
      $('.main__comments').append(html).animate({ scrollTop: $('.main__comments')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.main__postmenu__group__btn').prop('disabled', false);
    })
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main__comments__list:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main__comments').append(insertHTML);
        $('.main__comments').animate({ scrollTop: $('.main__comments')[0].scrollHeight});
      }
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 20000);
  }
});