"use client";
import { Welcome } from '../components/Welcome/Welcome';
import { SignUp } from '../components/SignUp/SignUp';
import { Address } from '../components/SignUp/ProvideAddress';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Routes, Route } from 'react-router-dom';


export default function HomePage() {
  return (
    <>
       <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/ProvideAddress" element={<Address/>} />
      </Routes>
    </>
  );
}

