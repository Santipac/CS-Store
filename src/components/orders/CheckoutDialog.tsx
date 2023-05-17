import { useRouter } from "next/router";
import { api } from "@/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "../ui";
import type { Order } from "@/pages/orders/[id]";

interface DialogProps {
  label: string;
  title: string;
  description: string;
  order: Order;
}

const CheckoutDialog: React.FC<DialogProps> = ({
  label,
  title,
  description,
  order,
}) => {
  const router = useRouter();
  const { mutateAsync: checkout, isLoading } =
    api.checkout.checkoutSession.useMutation({
      onSuccess: ({ url }) => {
        router.push(url);
      },
    });

  const onOrderCreation = async () => {
    await checkout(order);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn-block btn text-gray-200">
          {isLoading ? (
            <Spinner
              height="h-8"
              width="h-8"
              colorText="text-gray-600"
              fill="fill-gray-100"
            />
          ) : (
            label
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="self-center">
        <DialogHeader>
          <DialogTitle className="text-left text-gray-800">{title}</DialogTitle>
          <DialogDescription className="text-left text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4">
          <DialogTrigger asChild>
            <button className="rounded-xl border-2 border-red-500 px-6 py-2 text-red-500 shadow-sm">
              Cancel
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button
              className="rounded-xl bg-zinc-800 px-6 py-2 text-white"
              onClick={onOrderCreation}
            >
              Confirm
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
