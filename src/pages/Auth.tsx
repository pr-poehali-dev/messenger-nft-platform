import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    setCodeSent(true);
  };

  const handleAuth = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-slate-950 dark:via-violet-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-3xl shadow-2xl mb-4 animate-scale-in">
            <Icon name="MessageCircle" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Monov
          </h1>
          <p className="text-muted-foreground">
            Анонимный мессенджер нового поколения
          </p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl animate-slide-up">
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full bg-white/50 dark:bg-black/30">
              <TabsTrigger value="login" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
                Вход
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
                Регистрация
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={authMode === 'phone' ? 'default' : 'outline'}
                  className={authMode === 'phone' ? 'gradient-primary text-white flex-1 border-0' : 'flex-1'}
                  onClick={() => setAuthMode('phone')}
                >
                  <Icon name="Phone" size={16} className="mr-2" />
                  Телефон
                </Button>
                <Button
                  variant={authMode === 'email' ? 'default' : 'outline'}
                  className={authMode === 'email' ? 'gradient-primary text-white flex-1 border-0' : 'flex-1'}
                  onClick={() => setAuthMode('email')}
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Email
                </Button>
              </div>

              {authMode === 'phone' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl border-white/20"
                      disabled={codeSent}
                    />
                  </div>
                  {codeSent && (
                    <div className="animate-fade-in">
                      <Label htmlFor="code">Код подтверждения</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="Введите 6-значный код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        className="rounded-xl border-white/20"
                      />
                    </div>
                  )}
                  {!codeSent ? (
                    <Button
                      onClick={handleSendCode}
                      className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                    >
                      Получить код
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAuth}
                      className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                    >
                      Войти
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-login">Пароль</Label>
                    <Input
                      id="password-login"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl border-white/20"
                    />
                  </div>
                  <Button
                    onClick={handleAuth}
                    className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                  >
                    Войти
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={authMode === 'phone' ? 'default' : 'outline'}
                  className={authMode === 'phone' ? 'gradient-primary text-white flex-1 border-0' : 'flex-1'}
                  onClick={() => setAuthMode('phone')}
                >
                  <Icon name="Phone" size={16} className="mr-2" />
                  Телефон
                </Button>
                <Button
                  variant={authMode === 'email' ? 'default' : 'outline'}
                  className={authMode === 'email' ? 'gradient-primary text-white flex-1 border-0' : 'flex-1'}
                  onClick={() => setAuthMode('email')}
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Email
                </Button>
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="@your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-xl border-white/20"
                />
              </div>

              {authMode === 'phone' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone-reg">Номер телефона</Label>
                    <Input
                      id="phone-reg"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl border-white/20"
                      disabled={codeSent}
                    />
                  </div>
                  {codeSent && (
                    <div className="animate-fade-in">
                      <Label htmlFor="code-reg">Код подтверждения</Label>
                      <Input
                        id="code-reg"
                        type="text"
                        placeholder="Введите 6-значный код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        className="rounded-xl border-white/20"
                      />
                    </div>
                  )}
                  {!codeSent ? (
                    <Button
                      onClick={handleSendCode}
                      className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                    >
                      Получить код
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAuth}
                      className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                    >
                      Создать аккаунт
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-reg">Email</Label>
                    <Input
                      id="email-reg"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-reg">Пароль</Label>
                    <Input
                      id="password-reg"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl border-white/20"
                    />
                  </div>
                  <Button
                    onClick={handleAuth}
                    className="w-full gradient-primary text-white border-0 hover:scale-105 transition-transform"
                  >
                    Создать аккаунт
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <p className="text-xs text-center text-muted-foreground mb-3">Или войти через</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                <Icon name="Github" size={18} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                <Icon name="Chrome" size={18} className="mr-2" />
                Google
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
            <div className="flex gap-3">
              <Icon name="Shield" size={20} className="text-violet-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                  End-to-End шифрование
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ваши сообщения защищены криптографией высшего уровня
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Регистрируясь, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  );
}
