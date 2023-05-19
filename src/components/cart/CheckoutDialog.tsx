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
} from "@/components/ui/primitives/dialog";
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";
import { Spinner } from "../ui";
import { Button } from "../ui/primitives/button";

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
    return {
      ...item,
      quantity: item.quantity,
      productId: item.id,
    };
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
        <Button className="w-full rounded bg-black text-gray-200">
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
        </Button>
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
            <Button
              className="0 rounded-xl px-6 py-2  shadow-sm"
              variant="destructive"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              className="rounded-xl bg-zinc-800 px-6 py-2 text-white"
              onClick={onOrderCreation}
            >
              Confirm
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
