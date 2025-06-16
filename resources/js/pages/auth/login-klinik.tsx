// resources/js/Pages/auth/login-klinik.tsx

import { useForm } from '@inertiajs/react';

export default function LoginKlinik() {
  const { data, setData, post, errors } = useForm({
    email: '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login-klinik');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login Klinik</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            className="border w-full p-2"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            type="email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            className="border w-full p-2"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            type="password"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
