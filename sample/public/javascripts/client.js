jQuery(function($) {
   
   //socket.ioのサーバに接続
   var socket = io.connect();
   console.log("クライアントで接続"); 

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
   
   //サーバーからbraodcastがきたらする処理。
   socket.on("message",function(data){
      $('#list').prepend($('<div/>').text(data.text));
      console.log("broadcastしたー"); 
   
   });


















});







