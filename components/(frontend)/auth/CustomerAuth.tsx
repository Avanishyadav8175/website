// utils
import { memo } from "react";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import CustomerAuthDrawer from "./components/CustomerAuthDrawer";
import CustomerAuthDialog from "./components/CustomerAuthDialog";

function CustomerAuth() {
  const {
    // isMobile,
    auth: {
      data: { showAuth },
      method: { onChangeShowAuth }
    }
  } = useAppStates();


  return (
    <CustomerAuthDialog
      showDialog={showAuth}
      onChangeShowDialog={onChangeShowAuth}
    />
  );

  /* return isMobile ? (
    <CustomerAuthDrawer
      showDrawer={showAuth}
      onChangeShowDrawer={onChangeShowAuth}
    />
  ) : (
    <CustomerAuthDialog
      showDialog={showAuth}
      onChangeShowDialog={onChangeShowAuth}
    />
  ); */
}

export default memo(CustomerAuth);
