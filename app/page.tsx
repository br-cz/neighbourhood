'use client'; // This is a client component

import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import SignUpForm from '@/components/Authorization/signUpForm.client';
import LoginForm from '@/components/Authorization/loginForm.client';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <SignUpForm />
      <LoginForm />
    </>
  );
}
