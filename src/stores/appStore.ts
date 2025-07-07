import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  timeout?: number;
}

interface ModalState {
  open: boolean;
  content: React.ReactNode | null;
}

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  // UI state
  modal: ModalState;
  notifications: Notification[];
  loading: boolean;

  // Client state
  searchQuery: string;
  filterKey: string;

  // Actions
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;

  // Modal actions
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // Notification actions
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;

  // Search and filter
  setSearchQuery: (query: string) => void;
  setFilterKey: (key: string) => void;

  // Auth actions
  signOut: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      authLoading: true,
      modal: { open: false, content: null },
      notifications: [],
      loading: false,
      searchQuery: "",
      filterKey: "",

      // Auth actions
      setUser: user =>
        set({
          user,
          isAuthenticated: !!user,
          authLoading: false,
        }),

      setAuthLoading: loading => set({ authLoading: loading }),

      signOut: () =>
        set({
          user: null,
          isAuthenticated: false,
          authLoading: false,
        }),

      // Loading state
      setLoading: loading => set({ loading }),

      // Modal actions
      openModal: content =>
        set({
          modal: { open: true, content },
        }),

      closeModal: () =>
        set({
          modal: { open: false, content: null },
        }),

      // Notification actions
      addNotification: notification => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };

        set(state => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after timeout
        if (notification.timeout !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.timeout || 5000);
        }
      },

      removeNotification: id =>
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        })),

      // Search and filter
      setSearchQuery: query => set({ searchQuery: query }),
      setFilterKey: key => set({ filterKey: key }),
    }),
    {
      name: "bookman-store",
    }
  )
);
