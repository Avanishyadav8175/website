"use client";

import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to prevent duplicate API calls and infinite loops
 * Provides guards and debouncing for cart operations
 */
export const useCartGuard = () => {
  const operationRef = useRef<Set<string>>(new Set());
  const timeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const abortControllerRef = useRef<Map<string, AbortController>>(new Map());

  // Guard against duplicate operations
  const guardOperation = useCallback((operationId: string): boolean => {
    if (operationRef.current.has(operationId)) {
      return false; // Operation already in progress
    }
    operationRef.current.add(operationId);
    return true;
  }, []);

  // Release operation guard
  const releaseOperation = useCallback((operationId: string) => {
    operationRef.current.delete(operationId);
  }, []);

  // Debounced operation execution
  const debounceOperation = useCallback((
    operationId: string,
    operation: () => void | Promise<void>,
    delay: number = 300
  ) => {
    // Clear existing timeout
    const existingTimeout = timeoutRef.current.get(operationId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout
    const timeoutId = setTimeout(async () => {
      if (guardOperation(operationId)) {
        try {
          await operation();
        } finally {
          releaseOperation(operationId);
        }
      }
      timeoutRef.current.delete(operationId);
    }, delay);

    timeoutRef.current.set(operationId, timeoutId);
  }, [guardOperation, releaseOperation]);

  // Abort previous API call and start new one
  const abortAndExecute = useCallback(async (
    operationId: string,
    apiCall: (signal: AbortSignal) => Promise<any>
  ) => {
    // Abort previous call
    const existingController = abortControllerRef.current.get(operationId);
    if (existingController) {
      existingController.abort();
    }

    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current.set(operationId, controller);

    try {
      const result = await apiCall(controller.signal);
      abortControllerRef.current.delete(operationId);
      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, ignore
        return null;
      }
      abortControllerRef.current.delete(operationId);
      throw error;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRef.current.clear();

      // Abort all ongoing requests
      abortControllerRef.current.forEach(controller => controller.abort());
      abortControllerRef.current.clear();

      // Clear operation guards
      operationRef.current.clear();
    };
  }, []);

  return {
    guardOperation,
    releaseOperation,
    debounceOperation,
    abortAndExecute
  };
};