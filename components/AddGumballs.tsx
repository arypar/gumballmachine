import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAccount, useContractRead, useContractWrite, useWriteContract } from "wagmi";


const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_gumballs","type":"uint256"}],"name":"addGumballs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getGumballs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playGumballsMachine","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xdc8fd0a4e818c6e1a82af53d7ef8affd411e92e8';

export function AddGumballs() {
    const { writeContract } = useWriteContract();
async function addGumballs(gumballs: number) {
    const response = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "addGumballs",
      args: [gumballs],
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Gumballs</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Enter Gumball Count</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Input
            id="gumballs"
            defaultValue="1"
            className="w-3/4"
          />
        </div>
          <Button type="submit" className="w-auto" onClick={() => {
            const gumballInput = document.getElementById("gumballs") as HTMLInputElement;
            const gumballCount = parseInt(gumballInput.value); 
            addGumballs(gumballCount);
          const dialog = document.querySelector('[role="dialog"]');
          if (dialog) {
            dialog.dispatchEvent(new Event('close'));
          }
          }}>Add Gumballs</Button>
      </DialogContent>
    </Dialog>
  )
}