import { useAuth } from "../../Providers/Auth";
import "./style.css";
import { FiLogOut } from "react-icons/fi";
const Footer = () => {
  const { email, Logout } = useAuth();

  return (
    <div className="Footer">
      <h4>{email && email}</h4>
      {email && <FiLogOut onClick={Logout} id="OutIcon" />}
    </div>
  );
};
export default Footer;
