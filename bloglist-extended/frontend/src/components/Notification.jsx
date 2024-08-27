import { useSelector } from "react-redux";
import "../index.css";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

  const margin = {
    margin: '20 0px',
  };

  if (message === null) {
    return null;
  }

  return <div className={type} style={margin}>{message}</div>;
};

export default Notification;
