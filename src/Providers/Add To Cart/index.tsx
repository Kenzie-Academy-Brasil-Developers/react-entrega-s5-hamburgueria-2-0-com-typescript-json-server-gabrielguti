import { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useAuth } from "../Auth";
import { useCartItems } from "../CartItems";

interface AddToCartProps {
  children: ReactNode;
}

interface ProductData {
  title: string;
  image: string;
  price: number;
  userId: number;
}

interface AddToCartData {
  authToken?: string;
  addToCart: (newProductData: ProductData, token: string) => void;
  removeToCart: (id: number, authToken: string, userId: number) => void;
}

const AddToCartContext = createContext<AddToCartData>({} as AddToCartData);

export const AddToCartProvider = ({ children }: AddToCartProps) => {
  const { authToken } = useAuth();
  const { getCart } = useCartItems();

  const addToCart = (newProductData: ProductData, token: string) => {
    api
      .post("/cart", newProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Adicionado!");
      })
      .catch((err) => console.log(err));
  };

  const removeToCart = (id: number, authToken: string, userId: number) => {
    if (authToken) {
      api
        .delete(`/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          getCart(userId, authToken);
          toast.warning("Removido!");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <AddToCartContext.Provider
      value={{
        authToken,
        addToCart,
        removeToCart,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

export const useCart = () => useContext(AddToCartContext);
