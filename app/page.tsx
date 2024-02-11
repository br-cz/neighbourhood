'use client'; // This is a client component

import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import LoginForm from '@/components/Login/loginForm.client';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <LoginForm />
    </>
  );
}
