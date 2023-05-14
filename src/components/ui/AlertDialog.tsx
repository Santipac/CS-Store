import React from "react";
import * as Dialog from "@radix-ui/react-alert-dialog";
import { api } from "@/utils/api";
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";
import { Spinner } from "./Spinner";
import { useRouter } from "next/router";

interface Props {
  label: string;
  title: string;
  description: string;
}

const AlertDialog: React.FC<Props> = ({ label, title, description }) => {
  const router = useRouter();
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
  const clearCart = useCartStore((state) => state.removeAll);
  const orderItems = items.map((item) => {
    return { quantity: item.quantity, productId: item.id };
  });

  const onOrderCreation = async () => {
    await createOrder({ total, numberOfItems: count, orderItems });
    router.replace("/checkout");
    clearCart();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
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
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-xl font-medium tracking-tighter text-gray-800">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-4 text-sm leading-normal text-gray-600">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-[25px]">
            <Dialog.Cancel asChild>
              <button className="rounded-xl border-2 border-red-800 px-6 py-2 text-red-800 shadow-sm">
                Cancel
              </button>
            </Dialog.Cancel>
            <Dialog.Action asChild>
              <button
                className="rounded-xl bg-zinc-800 px-6 py-2 text-white"
                onClick={onOrderCreation}
              >
                Confirm
              </button>
            </Dialog.Action>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;
