"use client"

import { useAccount, useContractRead, useContractWrite, useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button"
import { AddGumballs } from "@/components/AddGumballs"
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_gumballs","type":"uint256"}],"name":"addGumballs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getGumballs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playGumballsMachine","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xdc8fd0a4e818c6e1a82af53d7ef8affd411e92e8';

export function Gumballs() {

const { writeContract } = useWriteContract();
async function getAGumball() {
    const response = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "playGumballsMachine",
      args: [],
    });
  }


  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getGumballs',
  });
  

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? <p>Loading...</p> : <p className="text-2xl font-bold">Gumballs: {data?.toString()}</p>}
      {<p className="text-2xl font-bold">Tx: {}</p>}
      <div className="mt-4"> 
      <div className="flex space-x-4">
      <AddGumballs />
        <Button onClick={() => getAGumball()}>Play Gumball Machine</Button>
      </div>
      </div>
    </div>
  )
}
export default Gumballs;
