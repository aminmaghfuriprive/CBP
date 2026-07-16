import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './context/AuthContext';

function Consumer({ onReady }: { onReady: (api: any) => void }) {
  const auth = useAuth();
  React.useEffect(() => { onReady(auth); }, [auth, onReady]);
  return null;
}

describe('AuthContext (mock)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('login stores user in localStorage and sets user', async () => {
    let api: any;
    render(
      <AuthProvider>
        <Consumer onReady={(a) => (api = a)} />
      </AuthProvider>
    );

    await act(async () => {
      const ok = await api.login('budi@demo.com');
      expect(ok).toBe(true);
    });

    expect(localStorage.getItem('cbp_user')).toBeTruthy();
    const stored = JSON.parse(localStorage.getItem('cbp_user') || 'null');
    expect(stored.email).toBe('budi@demo.com');
    expect(api.user).not.toBeNull();
  });

  it('logout clears user and localStorage', async () => {
    let api: any;
    render(
      <AuthProvider>
        <Consumer onReady={(a) => (api = a)} />
      </AuthProvider>
    );

    await act(async () => {
      await api.login('budi@demo.com');
    });

    expect(api.user).not.toBeNull();

    act(() => {
      api.logout();
    });

    expect(api.user).toBeNull();
    expect(localStorage.getItem('cbp_user')).toBeNull();
  });
});
