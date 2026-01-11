"use client";

// constants
import { IS_MOBILE, IS_TABLET } from "@/common/constants/mediaQueries";

// hooks
import {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "usehooks-ts";

// utils
import { createContext } from "react";
import {
  deleteLocalStorageAuth,
  getLocalStorageAuth,
  setLocalStorageAuth
} from "./utils/localStorageAuth";
import {
  getLocalStorageCity,
  setLocalStorageCity
} from "./utils/localStorageCity";
import {
  deleteLocalStorageProfile,
  getLocalStorageProfile,
  setLocalStorageProfile
} from "./utils/localStorageProfile";
import {
  deleteLocalStorageCart,
  getLocalStorageCart,
  setLocalStorageCart
} from "./utils/localStorageCart";
import {
  deleteLocalStorageSortBy,
  getLocalStorageSortBy,
  setLocalStorageSortBy
} from "./utils/localStorageSortBy";

// components
const LazyToaster = lazy(() =>
  import("@/components/ui/toaster").then(({ Toaster }) => ({
    default: Toaster
  }))
);

// types
import { type Auth } from "./types/auth";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CategoryPageSort } from "@/components/(frontend)/category/types/sort";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";
import { type CustomerDetail } from "./types/profile";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type ReactNode } from "react";

type AppStates = {
  isReady: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isOrdered: boolean;
  onOrder: () => void;
  location: {
    data: {
      selectedCity: CityDocument | null;
    };
    methods: {
      onChangeCity: (city: CityDocument) => void;
    };
  };
  auth: {
    data: {
      showAuth: boolean;
      isAuthenticated: boolean;
      customerId: string | null;
      userName: string | null;
    };
    method: {
      onChangeShowAuth: (showAuth: boolean) => void;
      onLogin: (auth: Auth) => void;
      onChangeUserName: (userName: string) => void;
      onLogout: () => void;
    };
  };
  profile: {
    data: {
      customer: CustomerDocument | null;
      detail: CustomerDetail | null;
      password: string | null;
      addresses: CustomerAddressDocument[];
      orders: OrderDocument[];
      reminders: CustomerReminderDocument[];
      cartId: string | null;
    };
    methods: {
      onChangeCustomer: (customer: CustomerDocument, from: string) => void;
    };
  };
  cart: {
    data: {
      cart: CartDocument | null;
      itemsCount: number;
    };
    method: {
      onChangeCart: (cart: CartDocument | null) => void;
      onAddItem: (cartItem: CartItemDocument) => void;
      onDeleteItem: (cartItemId: string) => void;
    };
  };
  sort: {
    data: {
      sortBy: string | null;
    };
    method: {
      onChangeSortBy: ({
        slug,
        sortBy
      }: {
        slug: string;
        sortBy: CategoryPageSort;
      }) => void;
    };
  };
};

// context
const AppStates = createContext<AppStates | undefined>(undefined);

// context provider
export function AppStatesProvider({ children }: { children: ReactNode }) {
  // hooks
  const { toast } = useToast();
  const isMobile = useMediaQuery(IS_MOBILE);
  const isTablet = useMediaQuery(IS_TABLET);

  // states
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  // states: location
  const [selectedCity, setSelectedCity] = useState<CityDocument | null>(null);

  // states: auth
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // states: auth
  const [cart, setCart] = useState<CartDocument | null>(null);

  // states: profile
  const [customer, setCustomer] = useState<CustomerDocument | null>(null);

  // states: sort by
  const [sortBy, setSortBy] = useState<string | null>(null);

  // variables profile
  const customerDetail = useMemo(
    () =>
      customer
        ? ({
            name: customer?.name || "User",
            mobileNumber: customer?.mobileNumber || undefined,
            mail: customer?.mail || undefined,
            gender: customer?.gender || undefined,
            dateOfBirth: customer?.dateOfBirth || undefined,
            registeredAt: customer?.createdAt || undefined
          } as CustomerDetail)
        : null,
    [customer]
  );
  const customerPassword = useMemo(
    () => customer?.password || null,
    [customer]
  );
  const customerAddresses = useMemo(
    () => customer?.addresses || [],
    [customer]
  );
  const customerOrders = useMemo(
    () => (customer?.orders as OrderDocument[]) || [],
    [customer]
  );
  const customerReminders = useMemo(
    () => customer?.reminders || [],
    [customer]
  );
  const customerCartId = useMemo(
    () => (customer?.cart as string) || null,
    [customer]
  );

  // event handlers: location
  const handleOrder = useCallback(() => {
    setIsOrdered(true);
  }, []);

  const handleLoadCity = useCallback(() => {
    const localCity = getLocalStorageCity();

    if (localCity) {
      setSelectedCity(localCity);
    }
  }, []);

  const handleChangeCity = useCallback((city: CityDocument) => {
    setSelectedCity(city);

    setLocalStorageCity(city);
  }, []);

  // event handlers: auth
  const handleLoadAuth = useCallback(() => {
    const localAuth = getLocalStorageAuth();

    if (localAuth) {
      setIsAuthenticated(true);
      setCustomerId(localAuth.customerId);
      setUserName(localAuth.userName);
    }
  }, []);

  const handleLogin = useCallback((auth: Auth) => {
    setIsAuthenticated(true);
    setCustomerId(auth.customerId);
    setUserName(auth.userName);
    setShowAuth(false);

    setLocalStorageAuth(auth);
  }, []);

  const handleChangeUserName = useCallback(
    (userName: string) => {
      setUserName(userName);

      setLocalStorageAuth({
        customerId: customerId as string,
        userName
      });
    },
    [customerId]
  );

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCustomerId(null);
    setUserName(null);
    setCart(null);
    setCustomer(null);

    deleteLocalStorageAuth();
    deleteLocalStorageProfile();

    toast({
      title: "Logged Out",
      description: `Goodbye!`,
      variant: "success"
    });
  }, [toast]);

  // event handlers: profile
  const handleLoadProfile = useCallback(() => {
    const localCustomer = getLocalStorageProfile();

    if (localCustomer) {
      setCustomer(localCustomer);
    }
  }, []);

  const handleChangeProfile = useCallback(
    (customer: CustomerDocument, from: string) => {
      setCustomer((prevCustomer) => {
        const newCustomer = {
          ...prevCustomer,
          ...customer
        } as CustomerDocument;
        setLocalStorageProfile(newCustomer);

        return newCustomer;
      });
    },
    []
  );

  // event handlers: cart
  const handleLoadCart = useCallback(() => {
    const localCart = getLocalStorageCart();

    if (localCart) {
      setCart(localCart);
    }
  }, []);

  const handleChangeCart = useCallback((cart: CartDocument | null) => {
    setCart(cart);

    if (cart) {
      setLocalStorageCart(cart);
    } else {
      deleteLocalStorageCart();
    }
  }, []);

  const handleAddCartItem = useCallback(
    (cartItem: CartItemDocument) => {
      const newCart = cart
        ? ({
            ...cart,
            items: [cartItem, ...(cart?.items ? cart.items : [])]
          } as CartDocument)
        : ({
            items: [cartItem]
          } as CartDocument);

      setCart(newCart);

      setLocalStorageCart(newCart);
    },
    [cart]
  );

  const handleDeleteCartItem = useCallback(
    (cartItemId: string) => {
      const newCart = {
        ...cart,
        items: cart!.items.filter(({ _id }) => _id !== cartItemId)
      } as CartDocument;

      setCart(newCart);

      setLocalStorageCart(newCart);
    },
    [cart]
  );

  // event handlers: reset cart
  const handleResetCart = useCallback(() => {
    if (isOrdered) {
      setCart(null);
      deleteLocalStorageCart();

      setTimeout(() => {
        setIsOrdered(false);
      }, 5000);
    }
  }, [isOrdered]);

  // event handlers: sort by
  const handleLoadSortBy = useCallback(() => {
    const sortBy = getLocalStorageSortBy();

    if (sortBy) {
      setSortBy(sortBy);
    }
  }, []);

  const handleChangeSortBy = useCallback(
    ({ slug, sortBy }: { slug: string; sortBy: CategoryPageSort }) => {
      if (
        sortBy === "latest" ||
        sortBy === "high-to-low" ||
        sortBy === "low-to-high"
      ) {
        setSortBy(`${slug}:${sortBy}`);

        setLocalStorageSortBy(`${slug}:${sortBy}`);
      } else {
        setSortBy(null);

        deleteLocalStorageSortBy();
      }
    },
    []
  );

  // event handlers
  const handleLoadLocalStorage = useCallback(() => {
    handleLoadCity();
    handleLoadAuth();
    handleLoadProfile();
    handleLoadCart();
    handleLoadSortBy();
    setIsReady(true);
  }, [
    handleLoadAuth,
    handleLoadCart,
    handleLoadCity,
    handleLoadProfile,
    handleLoadSortBy
  ]);

  // side effects
  useEffect(() => {
    handleLoadLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleResetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrdered]);

  return (
    <AppStates.Provider
      value={{
        isReady,
        isMobile,
        isTablet,
        isOrdered,
        onOrder: handleOrder,
        location: {
          data: {
            selectedCity
          },
          methods: {
            onChangeCity: handleChangeCity
          }
        },
        auth: {
          data: {
            showAuth,
            isAuthenticated,
            customerId,
            userName
          },
          method: {
            onChangeShowAuth: setShowAuth,
            onLogin: handleLogin,
            onChangeUserName: handleChangeUserName,
            onLogout: handleLogout
          }
        },
        profile: {
          data: {
            customer,
            detail: customerDetail,
            password: customerPassword,
            addresses: customerAddresses,
            orders: customerOrders,
            reminders: customerReminders,
            cartId: customerCartId
          },
          methods: {
            onChangeCustomer: handleChangeProfile
          }
        },
        cart: {
          data: {
            cart,
            itemsCount: cart?.items?.length || 0
          },
          method: {
            onChangeCart: handleChangeCart,
            onAddItem: handleAddCartItem,
            onDeleteItem: handleDeleteCartItem
          }
        },
        sort: {
          data: {
            sortBy
          },
          method: {
            onChangeSortBy: handleChangeSortBy
          }
        }
      }}
    >
      {children}
      <Suspense>
        <LazyToaster />
      </Suspense>
    </AppStates.Provider>
  );
}

// hook
export const useAppStates = (): AppStates => {
  const context = useContext(AppStates);

  if (!context) {
    throw new Error("useAppStates must be used within a AppStatesProvider");
  }

  return context;
};
