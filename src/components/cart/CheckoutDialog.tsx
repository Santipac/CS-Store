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
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";
import { Spinner } from "../ui";

interface DialogProps {
  label: string;
  title: string;
  description: string;
}

const CheckoutDialog: React.FC<DialogProps> = ({
  label,
  title,
  description,
}) => {
  const router = useRouter();
  const { mutateAsync: checkout } = api.checkout.checkoutSession.useMutation({
    onSuccess: ({ url }) => {
      router.push(url);
    },
  });
  const { mutateAsync: createOrder, isLoading } =
    api.order.createOrder.useMutation();
  const { items, count, total } = useCartStore(
    (cart) => ({
      items: cart.items,
      total: cart.computed.total,
      count: cart.computed.count,
    }),
    shallow
  );

  const orderItems = items.map((item) => {
    return { quantity: item.quantity, productId: item.id };
  });

  const onOrderCreation = async () => {
    const order = await createOrder({
      total,
      numberOfItems: count,
      orderItems,
    });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-800">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-4">
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
