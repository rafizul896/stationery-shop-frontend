import MenuItem from "./MenuItem";
import { ImProfile } from "react-icons/im";
import { IoReceiptOutline } from "react-icons/io5";

const UserMenu = () => {
  return (
    <>
      <MenuItem icon={ImProfile} label="Profile" address="profile" />
      <MenuItem icon={IoReceiptOutline} label="Orders" address="orders" />
    </>
  );
};

export default UserMenu;
