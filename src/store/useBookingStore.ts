import { create } from 'zustand';
import { BookingFormState, CarWithDetails } from '@/types';

interface BookingStore extends BookingFormState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedCar: (car: CarWithDetails) => void;
  setDates: (pickupDate: string, dropoffDate: string) => void;
  setLocations: (pickupLocation: string, dropoffLocation: string) => void;
  setInsuranceTier: (insuranceTier: BookingFormState['insuranceTier']) => void;
  toggleExtra: (extraTitle: string) => void;
  setCustomerInfo: (name: string, email: string, phone: string) => void;
  setPaymentMethod: (method: string) => void;
  resetBooking: () => void;
}

const initialBookingState: BookingFormState = {
  currentStep: 1,
  carId: null,
  selectedCar: null,
  pickupDate: new Date().toISOString().split('T')[0],
  dropoffDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  pickupLocation: 'Monaco VIP Heliport Hub',
  dropoffLocation: 'Monaco VIP Heliport Hub',
  insuranceTier: 'Standard',
  selectedExtras: [],
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  paymentMethod: 'Credit Card (Stripe)',
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialBookingState,
  setStep: (currentStep) => set({ currentStep }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setSelectedCar: (car) => set({ selectedCar: car, carId: car.id }),
  setDates: (pickupDate, dropoffDate) => set({ pickupDate, dropoffDate }),
  setLocations: (pickupLocation, dropoffLocation) => set({ pickupLocation, dropoffLocation }),
  setInsuranceTier: (insuranceTier) => set({ insuranceTier }),
  toggleExtra: (extraTitle) =>
    set((state) => ({
      selectedExtras: state.selectedExtras.includes(extraTitle)
        ? state.selectedExtras.filter((e) => e !== extraTitle)
        : [...state.selectedExtras, extraTitle],
    })),
  setCustomerInfo: (customerName, customerEmail, customerPhone) =>
    set({ customerName, customerEmail, customerPhone }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  resetBooking: () => set(initialBookingState),
}));
