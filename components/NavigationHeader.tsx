"use client"
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "@/components/theme-toggle";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavigationHeader: React.FC = () => {
  
  return (
    <header className="w-full bg-background border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
        Gumball Machine
        </Link>
        <ul className="flex space-x-4 items-center">
            <li>
                <ConnectButton />
            </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;