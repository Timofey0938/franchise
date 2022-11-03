import { FC, useState } from 'react';

interface FormProps {
  buttonTitle: string;
  submitHandler: (username: string, email: string, password: string) => void;
}

const Form: FC<FormProps> = ({ buttonTitle, submitHandler }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <input
      type='text'
      value={username}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      placeholder='Имя пользователя'
      />
      <input
      type='email'
      value={email}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      placeholder='Электронная почта'
      />
      <input
      type='password'
      value={password}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      placeholder='Пароль'
      />
      <button onClick={() => submitHandler(username, email, password)}>{buttonTitle}</button>
    </div>
  );
}

export default Form;