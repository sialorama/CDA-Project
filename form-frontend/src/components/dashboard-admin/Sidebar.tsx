import React from 'react';
import {Button} from '@/components/ui/button.tsx';
import Logo from "@/components/logo.tsx";
import {LucideProps} from "lucide-react";

interface MenuItem {
    id: string;
    label: string;
    icon:  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface SidebarProps {
    menuItems: MenuItem[];
    activeTab?:  string;
    setActiveTab: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {

    if (!activeTab) {
        activeTab = menuItems[0].id;
    }

    return (
        <aside className="w-64 bg-white shadow-md">
            <Logo />
            <nav className="mt-6">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-left font-normal mx-2 mb-1"
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
