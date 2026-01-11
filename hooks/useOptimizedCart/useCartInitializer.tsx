"use client";

import { CartDocument } from '@/common/types/documentation/dynamic/cart';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCartGuard } from '../useCartGuard';

interface UseCartInitializerProps {
  isAuthenticated: boolean;
  customerId: string;
  profileCartId: string;
  isReady: boolean;
  onCartChange: (cart: CartDocument | null) => void;
  onCartIdChange: (cartId: string) => void;
}

/**
 * Handles cart initialization and cloud synchronization
 * Prevents duplicate API calls and race conditions
 */
export const useCartInitializer = ({
  isAuthenticated,
  customerId,
  profileCartId,
  isReady,
  onCartChange,
  onCartIdChange
}: UseCartInitializerProps) => {
  const { guardOperation, releaseOperation, abortAndExecute } = useCartGuard();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastProfileCartIdRef = useRef<string>('');
  const initializationAttemptedRef = useRef(false);

  // Initialize cart for new users
  const initializeNewCart = useCallback(async (cart: CartDocument) => {
    if (!guardOperation('initialize-cart')) return;

    try {
      setIsLoading(true);

      const result = await abortAndExecute('add-cart', async (signal) => {
        const response = await fetch('/api/frontend/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
          },
          body: JSON.stringify(cart),
          signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      });

      if (result?.data) {
        onCartIdChange(cart._id as string);
        onCartChange(result.data);
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Failed to initialize cart:', error);
    } finally {
      setIsLoading(false);
      releaseOperation('initialize-cart');
    }
  }, [guardOperation, releaseOperation, abortAndExecute, onCartChange, onCartIdChange]);

  // Fetch existing cart
  const fetchExistingCart = useCallback(async (cartId: string) => {
    if (!guardOperation('fetch-cart') || cartId === lastProfileCartIdRef.current) return;

    try {
      setIsLoading(true);
      lastProfileCartIdRef.current = cartId;

      const result = await abortAndExecute('fetch-cart', async (signal) => {
        const response = await fetch(`/api/frontend/cart/${cartId}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
          },
          signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      });

      if (result?.data) {
        onCartChange(result.data);
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Reset the ref on error so we can retry
      lastProfileCartIdRef.current = '';
    } finally {
      setIsLoading(false);
      releaseOperation('fetch-cart');
    }
  }, [guardOperation, releaseOperation, abortAndExecute, onCartChange]);

  // Main initialization logic
  const handleCartInitialization = useCallback(async (localCart: CartDocument | null) => {
    if (!isReady || !isAuthenticated || initializationAttemptedRef.current) return;

    initializationAttemptedRef.current = true;

    if (profileCartId) {
      // User has existing cart in profile
      await fetchExistingCart(profileCartId);
    } else if (localCart) {
      // User has local cart but no cloud cart
      await initializeNewCart(localCart);
    }
  }, [isReady, isAuthenticated, profileCartId, fetchExistingCart, initializeNewCart]);

  // Reset initialization when authentication changes
  useEffect(() => {
    if (!isAuthenticated) {
      initializationAttemptedRef.current = false;
      lastProfileCartIdRef.current = '';
      setIsInitialized(false);
    }
  }, [isAuthenticated]);

  // Handle profile cart ID changes
  useEffect(() => {
    if (isAuthenticated && profileCartId && profileCartId !== lastProfileCartIdRef.current) {
      fetchExistingCart(profileCartId);
    }
  }, [isAuthenticated, profileCartId, fetchExistingCart]);

  return {
    isInitialized,
    isLoading,
    initializeCart: handleCartInitialization
  };
};