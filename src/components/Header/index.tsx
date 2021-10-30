import "./style.css";
import { MdShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Providers/Auth";
import { useCartItems } from "../../Providers/CartItems";
import { useCart } from "../../Providers/Add To Cart";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Header = () => {
  const history = useHistory();
  const { authToken, userId } = useAuth();
  const { cart, getCart } = useCartItems();
  const { removeToCart } = useCart();
  const [showCart, setShowCart] = useState<boolean>(false);

  const handleClick = () => {
    if (authToken) {
      getCart(userId, authToken);
      setShowCart(!showCart);
    } else {
      history.push("/login");
    }
  };
  const total = cart.reduce((valor1, valor2) => {
    return Math.round(valor1 + valor2.price);
  }, 0);

  return (
    <>
      <div className="HeaderBox">
        <h2>
          Kenzie <span className="burger">burger</span>
        </h2>
        <div>
          <MdShoppingCart onClick={handleClick} className="shopIcon" />
        </div>
      </div>
      {showCart && (
        <div className="CartItems">
          <div className="infoExit">
            R$ {total}
            <AiOutlineCloseCircle
              id="exit"
              onClick={() => setShowCart(!showCart)}
            />
          </div>
          {cart.map((item, index) => (
            <div className="ProductBoxCart" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="ProductInfoCart">
                <h3>{item.title}</h3>
                <p id="price">R$ {item.price}</p>
                <TiDelete
                  id="deleteIcon"
                  onClick={() => removeToCart(item.id, authToken, userId)}
                ></TiDelete>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
