import {create} from "zustand";
import {Role} from "@/types/Role.ts";

interface Store {
    token: string | null;
    id: number | null;
    role: Role | string | null;
    isConnected: boolean;
    setToken: (token: string) => void;
    setRole: (role: Role | string) => void;
    setId: (id: number) => void;
    logout: () => void;
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

export const useStore = create<Store>((set) => {
    const storedTab = localStorage.getItem('activeTab') || 'candidates';

    return {
        token: null,
        id: null,
        isConnected: false,
        role: null,
        setRole: (role: Role | string) => set({role}),
        setToken: (token: string) => set({token, isConnected: true}),
        setId: (id: number) => set({id}),
        logout: () => set({token: null, isConnected: false}),
        activeTab: storedTab,
        setActiveTab: (tabId) => {
            localStorage.setItem('activeTab', tabId);
            set({activeTab: tabId});
            }
    }
});





