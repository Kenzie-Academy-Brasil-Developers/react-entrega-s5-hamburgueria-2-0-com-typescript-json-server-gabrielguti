import { createContext, ReactNode, useContext, useState } from "react";
import api from "../../services/api";
interface CartProps {
  children: ReactNode;
}

interface ProductData {
  title: string;
  image: string;
  price: number;
  userId: number;
  id: number;
}
interface CartData {
  cart: ProductData[];
  getCart: (userId: number, authToken: string) => void;
}

const CartContext = createContext<CartData>({} as CartData);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<ProductData[]>([]);

  const getCart = (userId: number, authToken: string) => {
    api
      .get(`/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartItems = () => useContext(CartContext);
