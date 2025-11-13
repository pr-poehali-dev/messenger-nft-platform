import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Chat {
  id: number;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Friend {
  id: number;
  username: string;
  avatar: string;
  status: string;
  online: boolean;
}

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
  special?: boolean;
}

const MOCK_CHATS: Chat[] = [
  { id: 1, username: 'alex_dev', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true },
  { id: 2, username: 'maria_design', avatar: '', lastMessage: 'Отправил макеты', time: '12:15', unread: 0, online: true },
  { id: 3, username: 'ivan_pro', avatar: '', lastMessage: 'Созвонимся?', time: 'Вчера', unread: 1, online: false },
];

const MOCK_FRIENDS: Friend[] = [
  { id: 1, username: 'alex_dev', avatar: '', status: 'Работаю над проектом', online: true },
  { id: 2, username: 'maria_design', avatar: '', status: 'Доступна', online: true },
  { id: 3, username: 'ivan_pro', avatar: '', status: 'Не беспокоить', online: false },
  { id: 4, username: 'kate_manager', avatar: '', status: 'На встрече', online: false },
];

const MOCK_NFTS: NFT[] = [
  { id: 1, name: 'Анонимный +777', image: '📱', price: 200, special: true },
  { id: 2, name: 'Анонимный +888', image: '📞', price: 200, special: true },
  { id: 3, name: 'Статуэтка monov', image: '🗿', price: 200, special: true },
  { id: 4, name: 'Космический кот', image: '🚀', price: 200 },
  { id: 5, name: 'Единорог', image: '🦄', price: 200 },
  { id: 6, name: 'Огненный дракон', image: '🐉', price: 200 },
  { id: 7, name: 'Звездная пыль', image: '✨', price: 200 },
  { id: 8, name: 'Радужная звезда', image: '🌟', price: 200 },
  { id: 9, name: 'Корона короля', image: '👑', price: 200 },
  { id: 10, name: 'Алмазное сердце', image: '💎', price: 200 },
  { id: 11, name: 'Золотой трофей', image: '🏆', price: 200 },
  { id: 12, name: 'Космическая ракета', image: '🚀', price: 200 },
  { id: 13, name: 'Магический кристалл', image: '🔮', price: 200 },
  { id: 14, name: 'Огненный феникс', image: '🔥', price: 200 },
  { id: 15, name: 'Ледяной дракон', image: '❄️', price: 200 },
  { id: 16, name: 'Молния Зевса', image: '⚡', price: 200 },
  { id: 17, name: 'Радужный единорог', image: '🌈', price: 200 },
  { id: 18, name: 'Золотая монета', image: '🪙', price: 200 },
  { id: 19, name: 'Пиратский череп', image: '💀', price: 200 },
  { id: 20, name: 'Меч самурая', image: '⚔️', price: 200 },
  { id: 21, name: 'Волшебная палочка', image: '🪄', price: 200 },
  { id: 22, name: 'Космический шлем', image: '👨‍🚀', price: 200 },
  { id: 23, name: 'Пламенный меч', image: '🗡️', price: 200 },
  { id: 24, name: 'Щит героя', image: '🛡️', price: 200 },
  { id: 25, name: 'Драконий глаз', image: '👁️', price: 200 },
  { id: 26, name: 'Лунный камень', image: '🌙', price: 200 },
  { id: 27, name: 'Солнечный диск', image: '☀️', price: 200 },
  { id: 28, name: 'Робот будущего', image: '🤖', price: 200 },
  { id: 29, name: 'Инопланетянин', image: '👽', price: 200 },
  { id: 30, name: 'НЛО', image: '🛸', price: 200 },
  { id: 31, name: 'Космическая звезда', image: '⭐', price: 200 },
  { id: 32, name: 'Планета Земля', image: '🌍', price: 200 },
  { id: 33, name: 'Сатурн', image: '🪐', price: 200 },
  { id: 34, name: 'Комета', image: '☄️', price: 200 },
  { id: 35, name: 'Галактика', image: '🌌', price: 200 },
  { id: 36, name: 'Черная дыра', image: '🕳️', price: 200 },
  { id: 37, name: 'Взрыв сверхновой', image: '💥', price: 200 },
  { id: 38, name: 'Кибер-панк', image: '🌃', price: 200 },
  { id: 39, name: 'Неоновый город', image: '🏙️', price: 200 },
  { id: 40, name: 'Летающая машина', image: '🚗', price: 200 },
  { id: 41, name: 'Голограмма', image: '📡', price: 200 },
  { id: 42, name: 'Виртуальная реальность', image: '🥽', price: 200 },
  { id: 43, name: 'Квантовый компьютер', image: '💻', price: 200 },
  { id: 44, name: 'ИИ ассистент', image: '🧠', price: 200 },
  { id: 45, name: 'Биткоин', image: '₿', price: 200 },
  { id: 46, name: 'Эфириум', image: '💠', price: 200 },
  { id: 47, name: 'NFT галерея', image: '🖼️', price: 200 },
  { id: 48, name: 'Метавселенная', image: '🌐', price: 200 },
  { id: 49, name: 'Цифровой аватар', image: '👤', price: 200 },
  { id: 50, name: 'Блокчейн', image: '⛓️', price: 200 },
  { id: 51, name: 'Токен власти', image: '🎭', price: 200 },
  { id: 52, name: 'Цифровое искусство', image: '🎨', price: 200 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; own: boolean }>>([
    { text: 'Привет! Как твои дела?', own: false },
    { text: 'Все отлично! Работаю над новым проектом', own: true },
    { text: 'Круто! Расскажешь подробнее?', own: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, own: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-slate-950 dark:via-violet-950 dark:to-slate-900">
      <header className="glass-dark border-b border-white/10 p-4 animate-slide-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="MessageCircle" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Monov
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Icon name="Settings" size={20} />
            </Button>
            <Avatar className="ring-2 ring-violet-500 cursor-pointer hover:scale-110 transition-transform">
              <AvatarFallback className="gradient-primary text-white font-semibold">Я</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex gap-4 overflow-hidden">
        <aside className="w-80 glass rounded-2xl p-4 flex flex-col gap-4 animate-fade-in shadow-xl">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по username..."
              className="pl-10 rounded-xl border-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-4 gap-1 bg-white/50 dark:bg-black/30 p-1 rounded-xl">
              <TabsTrigger value="chats" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="MessageSquare" size={18} />
              </TabsTrigger>
              <TabsTrigger value="friends" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="Users" size={18} />
              </TabsTrigger>
              <TabsTrigger value="calls" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="Phone" size={18} />
              </TabsTrigger>
              <TabsTrigger value="nft" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="Sparkles" size={18} />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chats" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {MOCK_CHATS.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedChat === chat.id
                          ? 'gradient-primary text-white shadow-lg'
                          : 'bg-white/50 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-violet-400 to-pink-400 text-white">
                              {chat.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold truncate">@{chat.username}</p>
                            <span className="text-xs opacity-70">{chat.time}</span>
                          </div>
                          <p className="text-sm opacity-70 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <Badge className="gradient-accent text-white border-0">{chat.unread}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="friends" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {MOCK_FRIENDS.map((friend) => (
                    <div
                      key={friend.id}
                      className="p-3 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                              {friend.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {friend.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">@{friend.username}</p>
                          <p className="text-sm opacity-70 truncate">{friend.status}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="hover:scale-110 transition-transform">
                          <Icon name="MessageCircle" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="calls" className="flex-1 mt-4">
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-scale-in">
                  <Icon name="Video" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Видеозвонки</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Выберите друга для звонка
                  </p>
                </div>
                <Button className="gradient-primary text-white border-0 hover:scale-105 transition-transform">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Начать звонок
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="nft" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_NFTS.map((nft) => (
                    <div
                      key={nft.id}
                      className={`p-3 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                        nft.special
                          ? 'gradient-accent text-white shadow-lg ring-2 ring-orange-400 animate-scale-in'
                          : 'bg-white/50 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="text-4xl mb-2 text-center">{nft.image}</div>
                      <p className="font-semibold text-xs truncate text-center">
                        {nft.name}
                      </p>
                      <p className={`text-xs text-center mt-1 ${nft.special ? 'font-bold' : 'opacity-70'}`}>
                        {nft.price} ETH
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </aside>

        <section className="flex-1 glass rounded-2xl flex flex-col animate-fade-in shadow-xl">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-violet-400 to-pink-400 text-white">
                      {MOCK_CHATS.find(c => c.id === selectedChat)?.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">@{MOCK_CHATS.find(c => c.id === selectedChat)?.username}</p>
                    <p className="text-xs text-muted-foreground">В сети</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="hover:scale-110 transition-transform">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:scale-110 transition-transform">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:scale-110 transition-transform">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.own ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          msg.own
                            ? 'gradient-primary text-white rounded-br-sm'
                            : 'bg-white/70 dark:bg-white/10 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="hover:scale-110 transition-transform">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    className="flex-1 rounded-xl border-white/20"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    className="gradient-primary text-white border-0 hover:scale-105 transition-transform"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center animate-scale-in shadow-2xl">
                <Icon name="MessageCircle" size={48} className="text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Выберите чат
                </h2>
                <p className="text-muted-foreground mt-2">
                  Начните общение с друзьями
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}