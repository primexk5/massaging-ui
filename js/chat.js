// Sample data structure for users and messages
const users = [
    {
        id: 1,
        name: 'Bash Newking',
        avatar: '/assets/positive-dark-skinned-female-with-afro-hairstyle_273609-28747.webp',
        lastMessage: 'Hello, how are you?'
    },
    {
        id: 2,
        name: 'Tony',
        avatar: '/assets/large-man-making-funny-surprised-face.webp',
        lastMessage: 'See you tomorrow!'
    },
    // Add more users as needed
];

const conversations = {
    1: [
        { sender: 'Bash Newking', message: 'Hello', timestamp: '2024-03-20T10:00:00', isSelf: false },
        { sender: 'You', message: 'Great mate.', timestamp: '2024-03-20T10:01:00', isSelf: true },
        { sender: 'Bash Newking', message: 'nice how is work and family?', timestamp: '2024-03-20T10:02:00', isSelf: false }
    ]
};

let currentChat = null;

// DOM Elements
const chatsList = document.getElementById('chatsList');
const messagesArea = document.getElementById('messagesArea');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const searchInput = document.getElementById('searchInput');

// Render chat list
function renderChatList(users) {
    chatsList.innerHTML = users.map(user => `
        <div class="flex gap-5 p-2 cursor-pointer hover:bg-slate-700" onclick="selectChat(${user.id})">
            <img src="${user.avatar}" alt="${user.name}" class="rounded-full w-12 h-12">
            <div>
                <h3 class="text-sm font-bold text-white">${user.name}</h3>
                <p class="text-gray-400">${user.lastMessage}</p>
            </div>
        </div>
    `).join('');
}

// Render messages for selected chat
function renderMessages(chatId) {
    const messages = conversations[chatId] || [];
    messagesArea.innerHTML = messages.map(msg => `
        <div class="flex ${msg.isSelf ? 'flex-col justify-end md:flex-row md:ml-auto' : 'gap-5'} mt-4 p-2">
            ${!msg.isSelf ? `<img src="${users.find(u => u.name === msg.sender)?.avatar}" alt="${msg.sender}" class="rounded-full w-12 h-12">` : ''}
            <div>
                <h3 class="text-md font-extrabold ${msg.isSelf ? 'text-blue-700' : 'text-blue-900'}">${msg.sender}</h3>
                <div class="w-full md:w-96 ${msg.isSelf ? 'bg-gray-100' : 'bg-gray-300'} rounded-lg p-2">
                    <p>${msg.message}</p>
                </div>
            </div>
            ${msg.isSelf ? `<img src="/assets/YS0wLmpwZw.webp" alt="user" class="rounded-full w-12 h-12">` : ''}
        </div>
    `).join('');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Select chat
function selectChat(chatId) {
    currentChat = chatId;
    renderMessages(chatId);
}

// Send message
function sendMessage() {
    if (!currentChat || !messageInput.value.trim()) return;
    
    const newMessage = {
        sender: 'You',
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString(),
        isSelf: true
    };

    if (!conversations[currentChat]) {
        conversations[currentChat] = [];
    }
    
    conversations[currentChat].push(newMessage);
    renderMessages(currentChat);
    messageInput.value = '';
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.lastMessage.toLowerCase().includes(searchTerm)
    );
    renderChatList(filteredUsers);
});

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial render
renderChatList(users); 