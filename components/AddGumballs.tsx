import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"



const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_gumballs","type":"uint256"}],"name":"addGumballs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getGumballs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playGumballsMachine","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xdc8fd0a4e818c6e1a82af53d7ef8affd411e92e8';

const formSchema = z.object({
    count: z
      .string()
      .transform((v) => Number(v) || 0)
      .refine((v) => v >= 1, { message: "Count must be greater than or equal to 1" }),
  });



export function AddGumballs() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

    const { writeContract } = useWriteContract();
async function addGumballs(values: z.infer<typeof formSchema>) {
    await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "addGumballs",
      args: [values.count],
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

        <Form {...form}>
        <form onSubmit={form.handleSubmit(addGumballs)} className="space-y-8">
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}