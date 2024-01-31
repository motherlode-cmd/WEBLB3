var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var router = express.Router();
router.use(bodyParser.json());

const usersData = require('./public/json/users');
const friendsData = require('./public/json/friends');
const messagesData = require('./public/json/messages');
const { time } = require('console');


router.get('/', function(req,res,next) {
    res.render('index', {title:'Главная страница', users: usersData.users});
});

router.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const currentUser = usersData.users.find(user => user.id == req.params.userId);
    const userFriends = friendsData.friends.filter(friend => friend.userId === userId);
    const friendIds = userFriends.map(friend => friend.friendId);
    const friendList = usersData.users.filter(user => friendIds.includes(user.id));
    const dialog = usersData.users.filter(user =>
        messagesData.messages.find(mes => mes.senderId == userId && mes.recipientId == user.id ||
            mes.senderId == user.id && mes.recipientId == userId) != undefined
    );
    res.render('user', {friends: friendList, dialog: dialog, user: currentUser}); 
});
  
  // Маршрут для получения списка друзей пользователя
router.get('/friends/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userFriends = friendsData.friends.filter(friend => friend.userId === userId);
    const friendIds = userFriends.map(friend => friend.friendId);
    const friendList = usersData.users.filter(user => friendIds.includes(user.id));

    // Получаем данные о пользователе
    const currentUser = usersData.users.find(user => user.id === userId);
    // Передаем данные в шаблон
    res.render('friends', { user: currentUser, friends: friendList });
});
  
  // Маршрут для получения списка сообщений между пользователями
router.get('/messages/:userId/:recipientId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const recipientId = parseInt(req.params.recipientId);
    const userMessages = messagesData.messages.filter(
      message => (message.senderId == userId && message.recipientId == recipientId) ||
                 (message.senderId == recipientId && message.recipientId == userId)
    );
    const senderName = usersData.users.find(user=> user.id == userId);
    const recipientName = usersData.users.find(user=> user.id == recipientId);
    res.render('messages', {messages: userMessages, sender: senderName, recipient: recipientName});
});
//Маршрут для сообщений пользователя
router.get('/messages/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userMessages = messagesData.messages.filter(
      message => (message.senderId === userId || message.recipientId === userId)
    );
    res.json(userMessages);
});
  
router.delete('/deleteUser/:num', (req,res) => {
    const userId = req.params.num;
    const userIndex = usersData.users.findIndex(user => user.id == userId);
    if (userIndex !== -1) {
        usersData.users.splice(userIndex, 1);
    }
    messagesData.messages = messagesData.messages.filter(message =>
        message.senderId !== userId && message.recipientId !== userId
    );
    friendsData.friends = friendsData.friends.filter(friend =>
        friend.userId !== userId && friend.friendId !== userId
    );
    res.send('/');
});

router.delete('/deleteMessage', (req,res) => {
    const mess = req.body.message;
    messagesData.messages = messagesData.messages.filter(message =>
        message.senderId != mess.senderId ||
        message.recipientId != mess.recipientId ||
        message.text != mess.text ||
        message.timestamp != mess.timestamp
    );
    res.send(`mess`);
});

router.post('/deleteFriend/:userId/:friendId', (req,res) => {
    const userId = parseInt(req.params.userId);
    const friendId = parseInt(req.params.friendId);
    friendsData.friends = friendsData.friends.filter(frnds => !(frnds.userId === userId && frnds.friendId === friendId));

    console.log(friendsData.friends);
    res.redirect(`/friends/${userId}`);
});


router.post('/addUser', (req, res) => {
    // Извлекаем данные из тела запроса
    const newUser = {
      id: usersData.users.length + 1, // Просто пример, можете использовать свою логику генерации id
      name: req.body.name,
      birthdate: req.body.bthd,
      role: req.body.role,
      status: req.body.status,
      email: req.body.email,
      photo: req.body.photo
    };
  
    // Добавляем нового пользователя в массив
    usersData.users.push(newUser);
  
    // Отправляем ответ клиенту (можете перенаправить на другую страницу или что-то еще)
    res.redirect(`/`);
  });

router.post('/addFriend/:userId', (req, res) => {
    const user = req.params.userId;
    const friendName = req.body.name; 
    const friendIndex = usersData.users.find(u => u.name == friendName);
    if(friendIndex) {
        friendsData.friends.push( {
            userId: parseInt(user),
            friendId: friendIndex.id
        })
    }
    res.send(`/friends/${user}`);
});

router.post('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const editedUser = {
        id: parseInt(userId),
        name: req.body.name,
        birthdate: req.body.bthd,
        role: req.body.role,
        status: req.body.status,
        email: req.body.email,
        photo: req.body.photo
    };

    const index = usersData.users.findIndex(usr => usr.id == userId);

    // Если пользователь найден, заменяем его
    if (index !== -1) {
        usersData.users[index] = editedUser;
        // Отправляем ответ клиенту (можете перенаправить на другую страницу или что-то еще)
        res.redirect(`/users/${userId}`);
    } else {
        // Если пользователь не найден, отправляем соответствующий ответ
        res.status(404).send('User not found');
    }
});



router.post('/newMessage/:senderId', (req, res) => {
    // Извлекаем данные из тела запроса
    const recipientName = req.body.name;
    const messageText = req.body.message;
    const senderInfo = req.params.senderId;

    // Определяем время отправки сообщения
    const time = new Date().toISOString();
    // Здесь вы можете выполнить необходимую логику для сохранения нового сообщения в базе данных
    const recipientId = usersData.users.find(user => user.name == recipientName);

    if(recipientId) {
        const message = {
            id: messagesData.messages.length + 1, // Используем уникальный идентификатор для сообщений
            senderId: parseInt(senderInfo),
            recipientId: recipientId.id,
            text: messageText,
            timestamp: time
        };
        messagesData.messages.push(message);
        res.send(`/messages/${senderInfo}/${recipientId.id}`);
    }

    // Отправляем ответ клиенту
    //res.send(messagesData.messages);
    res.send(`user ${recipientName} not found`);
});




router.get('/*', (req, res) => {
    res.end("Not found");
});


module.exports = router;