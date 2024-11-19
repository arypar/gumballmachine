"use client";

import Image from "next/image";
import WalletProvider from "../components/wallet-provider";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NavigationHeader from "@/components/NavigationHeader";
import Gumballs from "@/components/Gumballs";

export default function Home() {
  return (
    <WalletProvider>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-4 sm:px-1 font-[family-name:var(--font-geist-sans)]">
      <NavigationHeader />
      <Gumballs />  
    </div>       
    </WalletProvider>
  );
}
