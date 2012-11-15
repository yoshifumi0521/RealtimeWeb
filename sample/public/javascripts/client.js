jQuery(function($) {
   
   //socket.ioのサーバに接続
   var socket = io.connect();
   console.log("クライアントで接続"); 

   //入力されたらする処理。
   $("#input").keyup(function(){
      var text = $(this).val();
      //ここに入力する。
      $("#comment").text(text);
   });  

   
   //sendボタンがクリックされたとき
   $("#send").click(function(){
      console.log("クリックされたー");
      var text = $('#input').val();
      
      if(text !== ''){
         //サーバーにテキストを送信
         socket.emit("message",{text:text});
         $('#list').prepend($('<div/>').text(text));
         $("#input").val("");
         $("#comment").text("");
      }
   
   });
   
       


















});







