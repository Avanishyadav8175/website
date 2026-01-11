
"use client";

// libraries
import mongoose from "mongoose";

// constants
import { CONTENT_POPULATE } from "@/request/content/contents";

// utils
import { createContext } from "react";

// hooks
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppStates } from "./useAppState/useAppState";

// requests
import { fetchCustomer, updateCustomer } from "@/request/customer/customers";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";
import { type CustomerDetail } from "./useAppState/types/profile";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type CustomerPointTransactionDocument } from "@/common/types/documentation/nestedDocuments/customerPointTransaction";
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type ReactNode } from "react";

type CustomerProfile = {
  isReady: boolean;
  detail: {
    onChange: (newDetail: CustomerDetail) => void;
  };
  password: {
    onChange: (updatedPassword: string, callback: () => void) => void;
  };
  address: {
    onAdd: (newAddress: CustomerAddressDocument) => void;
    onUpdate: (updatedAddress: CustomerAddressDocument) => void;
    onSetDefault: (addressId: string) => void;
    onDelete: (addressId: string) => void;
  };
  order: {
    onChange: () => void;
  };
  reminder: {
    onAdd: (newReminder: CustomerReminderDocument) => void;
    onUpdate: (updatedReminder: CustomerReminderDocument) => void;
    onDelete: (reminderId: string) => void;
  };
  point: {
    onAdd: (newTransaction: CustomerPointTransactionDocument) => void;
  };
  coupon: {
    onAvail: (couponId: string) => void;
  };
  cart: {
    onAdd: (newCartId: string) => void;
    onDelete: () => void;
  };
};

const CustomerProfile = createContext<CustomerProfile | undefined>(undefined);

export function CustomerProfileProvider({ children }: { children: ReactNode }) {
  // hooks
  const {
    isReady: isStatesReady,
    auth: {
      data: { isAuthenticated, customerId },
      method: { onChangeUserName }
    },
    profile: {
      data: { customer },
      methods: { onChangeCustomer }
    }
  } = useAppStates();
  const { toast } = useToast();

  // states
  const [isReady, setIsReady] = useState<boolean>(false);

  // variables
  const customerDetail = customer
    ? ({
        name: customer?.name || "User",
        mobileNumber: customer?.mobileNumber || undefined,
        mail: customer?.mail || undefined,
        gender: customer?.gender || undefined,
        dateOfBirth: customer?.dateOfBirth || undefined,
        registeredAt: customer?.createdAt || undefined
      } as CustomerDetail)
    : null;
  const customerPassword = customer?.password || undefined;
  const customerAddresses = customer?.addresses || [];
  const customerOrders = (customer?.orders as OrderDocument[]) || [];
  const customerAvailedCoupons = customer?.availedCoupons || [];
  const customerPoints = customer?.points || null;
  const customerReminders = customer?.reminders || [];
  const customerCartId = (customer?.cart as string) || null;

  // useEffect(() => {
    // console.log({ customerCartId });
  // }, [customerCartId]);

  // handlers
  // detail
  const handleUpdateDetail = (updatedDetail: CustomerDetail) => {
    const prevDetail = { ...customerDetail };
    const newDetail = {
      ...(updatedDetail.name !== customerDetail?.name
        ? { name: updatedDetail.name }
        : {}),
      ...(updatedDetail.mobileNumber !== customerDetail?.mobileNumber
        ? { mobileNumber: updatedDetail.mobileNumber }
        : {}),
      ...(updatedDetail.mail !== customerDetail?.mail
        ? { mail: updatedDetail.mail }
        : {}),
      ...(updatedDetail.gender !== customerDetail?.gender
        ? { gender: updatedDetail.gender }
        : {}),
      ...(updatedDetail.dateOfBirth !== customerDetail?.dateOfBirth
        ? { dateOfBirth: updatedDetail.dateOfBirth }
        : {})
    } as CustomerDocument;

    if (newDetail.name) {
      onChangeUserName(newDetail?.name || "User");
    }

    onChangeCustomer(
      {
        // ...customer,
        ...newDetail
      } as CustomerDocument,
      "handleUpdateDetail"
    );

    if (customer)
      updateCustomer({
        customerId: customer?._id as string,
        query: {
          select: ["name", "mobileNumber", "mail", "gender", "dateOfBirth"]
        },
        data: newDetail
      })
        .then(({ data: updatedDetail }) => {
          if (updatedDetail) {
            onChangeCustomer(
              {
                // ...customer,
                ...(updatedDetail as CustomerDocument)
              } as CustomerDocument,
              "handleUpdateDetail"
            );

            toast({
              title: "Success",
              description: "Profile Updated",
              variant: "success"
            });
          }
        })
        .catch((error) => {
          console.error({ error });

          onChangeUserName(prevDetail?.name || "User");
          onChangeCustomer(
            {
              // ...customer,
              ...prevDetail
            } as CustomerDocument,
            "handleUpdateDetail"
          );

          toast({
            title: "Failed",
            description: "Couldn't Update Profile",
            variant: "destructive"
          });
        });
  };

  // order
  const handleChangeOrders = () => {
    fetchCustomer({
      customerId: customerId as string,
      query: {
        select: ["orders"],
        populate: [
          {
            path: "orders",
            populate: [
              {
                path: "cart",
                populate: [
                  {
                    path: "items.content",
                    populate: CONTENT_POPULATE
                  },
                  {
                    path: "items.delivery.type",
                    select: ["timeSlots"],
                    strict: false
                  },
                  {
                    path: "items.addons.addon",
                    populate: [
                      {
                        path: "image",
                        select: ["alt", "defaultAlt", "url"]
                      },
                      {
                        path: "category",
                        select: ["name"]
                      }
                    ]
                  },
                  {
                    path: "items.customization.enhancement.items.enhancement",
                    select: ["label"]
                  },
                  {
                    path: "items.customization.flavour.flavour",
                    select: ["name"]
                  },
                  {
                    path: "items.customization.upgrade.upgrade",
                    select: ["label"]
                  }
                ]
              }
            ]
          }
        ]
      }
    })
      .then(({ data: responseCustomer }) => {
        onChangeCustomer(
          {
            // ...customer,
            orders: (responseCustomer as CustomerDocument).orders
          } as CustomerDocument,
          "handleChangeOrders"
        );
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  // address
  const handleAddAddress = (newAddress: CustomerAddressDocument) => {
    const prevAddresses = [...customerAddresses];

    onChangeCustomer(
      {
        // ...customer,
        addresses: [...customerAddresses, newAddress]
      } as CustomerDocument,
      "handleAddAddress"
    );

    const validNewAddress: CustomerAddressDocument = {
      ...newAddress
    } as CustomerAddressDocument;

    if (!mongoose.Types.ObjectId.isValid(validNewAddress._id as string)) {
      delete validNewAddress._id;
    }

    if (customer)
      updateCustomer({
        customerId: customer._id as string,
        query: {
          select: ["addresses"]
        },
        data: { addresses: [...customerAddresses, validNewAddress] }
      })
        .then(({ data: responseCustomer }) => {
          if (responseCustomer) {
            onChangeCustomer(
              {
                // ...customer,
                addresses: responseCustomer.addresses
              } as CustomerDocument,
              "handleAddAddress"
            );
          }
        })
        .catch((error) => {
          console.error({ error });

          onChangeCustomer(
            {
              // ...customer,
              addresses: prevAddresses
            } as CustomerDocument,
            "handleAddAddress"
          );

          toast({
            title: "Failed",
            description: "Couldn't Add Address",
            variant: "destructive"
          });
        });
  };

  const handleUpdateAddress = (updatedAddress: CustomerAddressDocument) => {
    const prevAddresses = [...customerAddresses];

    onChangeCustomer(
      {
        // ...customer,
        addresses: [...customerAddresses].map((customerAddress) =>
          customerAddress._id === updatedAddress._id
            ? updatedAddress
            : customerAddress
        )
      } as CustomerDocument,
      "handleUpdateAddress"
    );

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["addresses"]
      },
      data: {
        addresses: [...customerAddresses].map((customerAddress) =>
          customerAddress._id === updatedAddress._id
            ? updatedAddress
            : customerAddress
        )
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              addresses: responseCustomer.addresses
            } as CustomerDocument,
            "handleUpdateAddress"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            addresses: prevAddresses
          } as CustomerDocument,
          "handleUpdateAddress"
        );

        toast({
          title: "Failed",
          description: "Couldn't update address",
          variant: "destructive"
        });
      });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    if (customerAddresses.find(({ _id }) => _id === addressId)?.isDefault) {
      return;
    }

    const prevAddresses = [...customerAddresses];
    const updatedAddresses = [...customerAddresses].map(
      (customerAddress) =>
        ({
          ...customerAddress,
          isDefault: customerAddress._id === addressId
        }) as CustomerAddressDocument
    );

    onChangeCustomer(
      {
        // ...customer,
        addresses: updatedAddresses
      } as CustomerDocument,
      "handleSetDefaultAddress"
    );

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["addresses"]
      },
      data: {
        addresses: updatedAddresses
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              addresses: responseCustomer.addresses
            } as CustomerDocument,
            "handleSetDefaultAddress"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            addresses: prevAddresses
          } as CustomerDocument,
          "handleSetDefaultAddress"
        );

        toast({
          title: "Failed",
          description: "Couldn't Set Address as Default",
          variant: "destructive"
        });
      });
  };

  const handleDeleteAddress = (addressId: string) => {
    if (customerAddresses.find(({ _id }) => _id === addressId)?.isDefault) {
      toast({
        title: "Warning",
        description: "Couldn't Delete Default Address",
        variant: "warning"
      });

      return;
    }

    const prevAddresses = [...customerAddresses];

    onChangeCustomer(
      {
        // ...customer,
        addresses: [...customerAddresses].filter(({ _id }) => _id !== addressId)
      } as CustomerDocument,
      "handleDeleteAddress"
    );

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["addresses"]
      },
      data: {
        addresses: [...customerAddresses].filter(({ _id }) => _id !== addressId)
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              addresses: responseCustomer.addresses
            } as CustomerDocument,
            "handleDeleteAddress"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            addresses: prevAddresses
          } as CustomerDocument,
          "handleDeleteAddress"
        );

        toast({
          title: "Failed",
          description: "Couldn't Delete address",
          variant: "destructive"
        });
      });
  };

  // reminders
  const handleAddReminder = (newReminder: CustomerReminderDocument) => {
    const prevReminders = [...customerReminders];

    onChangeCustomer(
      {
        // ...customer,
        reminders: [...customerReminders, newReminder]
      } as CustomerDocument,
      "handleAddReminder"
    );

    const validNewReminder: CustomerReminderDocument = {
      ...newReminder
    } as CustomerReminderDocument;

    if (!mongoose.Types.ObjectId.isValid(validNewReminder._id as string)) {
      delete validNewReminder._id;
    }

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["reminders"]
      },
      data: { reminders: [...customerReminders, validNewReminder] }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              reminders: responseCustomer.reminders
            } as CustomerDocument,
            "handleAddReminder"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            reminders: prevReminders
          } as CustomerDocument,
          "handleAddReminder"
        );

        toast({
          title: "Failed",
          description: "Couldn't Add Reminder",
          variant: "destructive"
        });
      });
  };

  const handleUpdateReminder = (updatedReminder: CustomerReminderDocument) => {
    const prevReminders = [...customerReminders];

    onChangeCustomer(
      {
        // ...customer,
        reminders: [...customerReminders].map((customerReminder) =>
          customerReminder._id === updatedReminder._id
            ? updatedReminder
            : customerReminder
        )
      } as CustomerDocument,
      "handleUpdateReminder"
    );

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["reminders"]
      },
      data: {
        reminders: [...customerReminders].map((customerReminder) =>
          customerReminder._id === updatedReminder._id
            ? updatedReminder
            : customerReminder
        )
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              reminders: responseCustomer.reminders
            } as CustomerDocument,
            "handleUpdateReminder"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            reminders: prevReminders
          } as CustomerDocument,
          "handleUpdateReminder"
        );

        toast({
          title: "Failed",
          description: "Couldn't Update Reminder",
          variant: "destructive"
        });
      });
  };

  const handleDeleteReminder = (reminderId: string) => {
    const prevReminders = [...customerReminders];

    onChangeCustomer(
      {
        // ...customer,
        reminders: [...customerReminders].filter(
          ({ _id }) => _id !== reminderId
        )
      } as CustomerDocument,
      "handleDeleteReminder"
    );

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["reminders"]
      },
      data: {
        reminders: [...customerReminders].filter(
          ({ _id }) => _id !== reminderId
        )
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              reminders: responseCustomer.reminders
            } as CustomerDocument,
            "handleDeleteReminder"
          );
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            reminders: prevReminders
          } as CustomerDocument,
          "handleDeleteReminder"
        );

        toast({
          title: "Failed",
          description: "Couldn't Delete Reminder",
          variant: "destructive"
        });
      });
  };

  // password
  const handleUpdatePassword = (
    updatedPassword: string,
    callback: () => void
  ) => {
    const prevPassword = customerPassword;

    updateCustomer({
      customerId: customer?._id as string,
      query: {
        select: ["password"]
      },
      data: {
        password: updatedPassword
      }
    })
      .then(({ data: responseCustomer }) => {
        if (responseCustomer) {
          onChangeCustomer(
            {
              // ...customer,
              password: responseCustomer.password
            } as CustomerDocument,
            "handleUpdatePassword"
          );

          callback();
        }
      })
      .catch((error) => {
        console.error({ error });

        onChangeCustomer(
          {
            // ...customer,
            password: prevPassword
          } as CustomerDocument,
          "handleUpdatePassword"
        );

        toast({
          title: "Failed",
          description: "Couldn't Update Password",
          variant: "destructive"
        });
      });
  };

  // cart
  const handleUpdateCartId = (cartId?: string) => {
    const prevCartId = customerCartId || undefined;

    onChangeCustomer(
      {
        // ...customer,
        cart: cartId
      } as CustomerDocument,
      "handleUpdateCartId"
    );

    if (customer)
      updateCustomer({
        customerId: customer._id as string,
        query: {
          select: ["cart"]
        },
        data: {
          ...(cartId ? { cart: cartId } : { $unset: { cart: "" } })
        } as Partial<CustomerDocument>
      })
        .then(({ data: responseCustomer }) => {
          if (responseCustomer) {
            onChangeCustomer(
              {
                // ...customer,
                cart: responseCustomer.cart
              } as CustomerDocument,
              "handleUpdateCartId"
            );
          }
        })
        .catch((error) => {
          console.error({ error });

          onChangeCustomer(
            {
              // ...customer,
              cart: prevCartId
            } as CustomerDocument,
            "handleUpdateCartId"
          );

          toast({
            title: "Failed",
            description: "Couldn't Update Cart",
            variant: "destructive"
          });
        });
  };

  const handleAddCart = (newCartId: string) => {
    handleUpdateCartId(newCartId);
  };

  const handleDeleteCart = () => {
    handleUpdateCartId();
  };

  // side effects
  useEffect(() => {
    if (isStatesReady) {
      if (isAuthenticated && customerId) {
        // if (!customer) {
        fetchCustomer({
          customerId,
          query: {
            populate: [
              {
                path: "orders",
                populate: [
                  {
                    path: "cart",
                    populate: [
                      {
                        path: "items.content",
                        populate: CONTENT_POPULATE
                      },
                      {
                        path: "items.delivery.type",
                        select: ["timeSlots"],
                        strict: false
                      },
                      {
                        path: "items.addons.addon",
                        populate: [
                          {
                            path: "image",
                            select: ["alt", "defaultAlt", "url"]
                          },
                          {
                            path: "category",
                            select: ["name"]
                          }
                        ]
                      },
                      {
                        path: "items.customization.enhancement.items.enhancement",
                        select: ["label"]
                      },
                      {
                        path: "items.customization.flavour.flavour",
                        select: ["name"]
                      },
                      {
                        path: "items.customization.upgrade.upgrade",
                        select: ["label"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        })
          .then(({ data: responseCustomer }) => {
            if (JSON.stringify(responseCustomer) !== JSON.stringify(customer)) {
              onChangeCustomer(
                responseCustomer as CustomerDocument,
                "fetchCustomer"
              );
            }

            if (!isReady) {
              setIsReady(true);
            }
          })
          .catch((error) => {
            console.error({ error });
          });
        // } else {
        //   setIsReady(true);
        // }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatesReady, isAuthenticated, customerId]);

  return (
    <CustomerProfile.Provider
      value={{
        isReady,
        detail: {
          onChange: handleUpdateDetail
        },
        password: {
          onChange: handleUpdatePassword
        },
        address: {
          onAdd: handleAddAddress,
          onUpdate: handleUpdateAddress,
          onSetDefault: handleSetDefaultAddress,
          onDelete: handleDeleteAddress
        },
        order: {
          onChange: handleChangeOrders
        },
        reminder: {
          onAdd: handleAddReminder,
          onUpdate: handleUpdateReminder,
          onDelete: handleDeleteReminder
        },
        point: {
          onAdd: (newTransaction: CustomerPointTransactionDocument) => {}
        },
        coupon: {
          onAvail: (couponId: string) => {}
        },
        cart: {
          onAdd: handleAddCart,
          onDelete: handleDeleteCart
        }
      }}
    >
      {children}
    </CustomerProfile.Provider>
  );
}

export const useCustomerProfile = (): CustomerProfile => {
  const customerProfile = useContext(CustomerProfile);

  if (!customerProfile) {
    throw new Error(
      "useCustomerProfile must be used within a CustomerProfileProvider"
    );
  }

  return customerProfile;
};
