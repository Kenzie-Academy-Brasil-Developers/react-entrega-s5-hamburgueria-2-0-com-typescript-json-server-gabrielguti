import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCart } from "../../Providers/Add To Cart";
import { useAuth } from "../../Providers/Auth";
import api from "../../services/api";
import "./style.css";
interface Products {
  image: string;
  title: string;
  price: number;
  userId: number;
}
const Home = () => {
  const { addToCart } = useCart();
  const { userId, authToken } = useAuth();
  const [products, setProducts] = useState<Products[]>([]);
  const history = useHistory();
  useEffect(() => {
    api.get("/products").then((response) => setProducts(response.data));
  }, []);

  const addProduct = (data: Products, token: string) => {
    if (authToken) {
      const newProductData = {
        image: data.image,
        title: data.title,
        price: data.price,
        userId: Number(userId),
      };
      addToCart(newProductData, token);
    } else {
      toast.warning("Faça o login para comprar");
      history.push("/login");
    }
  };

  return (
    <div className="Content">
      <Header />
      <div className="ProductsContent">
        {products.map((item, index) => (
          <div className="ProductBox" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="ProductInfo">
              <h3>{item.title}</h3>
              <p id="price">R$ {item.price}</p>
              <button onClick={() => addProduct(item, authToken)}>
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
