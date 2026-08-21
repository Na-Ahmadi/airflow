'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import QuoteModal from '@/components/shared/QuoteModal/QuoteModal';

export interface QuoteProductContext {
  id?: string;
  name?: string;
  category?: string;
  model?: string;
}

interface QuoteModalContextValue {
  openQuoteModal: (product?: QuoteProductContext) => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  openQuoteModal: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<QuoteProductContext | undefined>(undefined);

  const openQuoteModal = useCallback((next?: QuoteProductContext) => {
    setProduct(next);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ openQuoteModal }), [openQuoteModal]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={handleClose}
        productId={product?.id}
        productName={product?.name}
        productCategory={product?.category}
        productModel={product?.model}
      />
    </QuoteModalContext.Provider>
  );
}
