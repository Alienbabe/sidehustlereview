import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setConfirmation('');
    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });
      if (!result.error) {
        setConfirmation('Sign up successful! Please check your email to verify your account.');
      }
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }
    if (result.error) setError(result.error.message);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        style={{ marginRight: 8 }}
        onClick={() => { setShowForm(true); setIsSignUp(false); }}
      >
        Sign In
      </button>
      <button
        onClick={() => { setShowForm(true); setIsSignUp(true); }}
      >
        Sign Up
      </button>
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setShowForm(false)}
        >
          <div
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 24,
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              minWidth: 320,
              maxWidth: '90vw',
            }}
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
              <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ marginTop: 4 }}>
                Close
              </button>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {confirmation && <div style={{ color: 'green' }}>{confirmation}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


