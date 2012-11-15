
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
   //サーバーが起動したらする処理。
   console.log("Express server listening on port " + app.get('port'));
});

//socket.ioのインスタンス作成
var io = require("socket.io").listen(server);
//クライアントから接続あった時のイベント
io.sockets.on("connection",function(socket){
   //接続した
   console.log("サーバー接続");
   //クライアント側からmessageイベントが受信した時のイベント
   socket.on("message",function(data){
      var text = data.text;
      //念のためdataの値が正しいかチェック
      if(data && typeof text=== "string"){
         //メッセージを投げたクライアント以外のすべてのクライアントに投げる
         socket.broadcast.json.emit('message',{text:text});
         console.log("broadcastした");
      }
   });










});
















