import React from "react";
import { Button } from "./primitives";
import { FaStripe } from "react-icons/fa";
import mercadoIcon from "../../../public/mercadopago-icon.png";
import Image from "next/image";
interface Props {
  isLoading: boolean;
  onOrderCreation: (service: "mercadopago" | "stripe") => Promise<void>;
}
export const PaymentButtonGroup = ({ isLoading, onOrderCreation }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <Button
        disabled={isLoading}
        onClick={() => onOrderCreation("stripe")}
        className="gap-2 bg-indigo-600 hover:bg-indigo-500"
      >
        <FaStripe size="35px" className="text-white" />
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => onOrderCreation("mercadopago")}
        className="gap-2 bg-sky-600 hover:bg-sky-700"
      >
        <Image
          src={mercadoIcon}
          alt="Logo for Mercado Pago"
          height={30}
          width={30}
        />
        Mercado Pago
      </Button>
    </div>
  );
};
