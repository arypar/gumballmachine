"use client"

import { useContractRead, useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button"
import { AddGumballs } from "@/components/AddGumballs"
import { useEffect, useState } from "react";

const contractABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[{"internalType":"uint256","name":"_gumballs","type":"uint256"}],"name":"addGumballs","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"getGumballs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"playGumballsMachine","outputs":[],"stateMutability":"nonpayable","type":"function"}
];
const contractAddress = '0xdc8fd0a4e818c6e1a82af53d7ef8affd411e92e8';

export function Gumballs() {
  const { writeContract } = useWriteContract();
  
  async function getAGumball() {
    await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "playGumballsMachine",
      args: [],
    });
  }
  const { data, refetch: refetchGumballs } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getGumballs',
  });

  const [gumballs, setGumballs] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setGumballs(data as number);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking gumballs");
      refetchGumballs();
    }, 1000);
    
    return () => clearInterval(interval); 
  }, [refetchGumballs]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">Gumballs: {gumballs?.toString()}</p>
      <div className="flex space-x-4 mt-4">
        <AddGumballs />
        <Button onClick={() => getAGumball()}>Play Gumball Machine</Button>
      </div>
    </div>
  )
}
export default Gumballs;
