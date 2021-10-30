import React from "react";
import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { AddToCartProvider } from "./Add To Cart";
import { CartProvider } from "./CartItems";
interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <CartProvider>
      <AddToCartProvider>
        <AuthProvider>{children}</AuthProvider>
      </AddToCartProvider>
    </CartProvider>
  );
};
export default Providers;
