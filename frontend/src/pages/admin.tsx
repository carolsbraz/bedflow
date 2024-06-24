import { useEffect, useState } from "react";

import { UserManagement } from "./admin/user-management";

import DashboardRounded from "@mui/icons-material/DashboardRounded";
import EventRounded from "@mui/icons-material/EventRounded";
import PeopleRounded from "@mui/icons-material/PeopleRounded";
import LocalMallRounded from "@mui/icons-material/LocalMallRounded";
import FilePresentRounded from "@mui/icons-material/FilePresentRounded";
import { CalendarMonthRounded, WorkspacesRounded } from "@mui/icons-material";
import { EnvironmentManagement } from "./admin/env-management.tsx";
import { ScheduleManagement } from "./admin/sch-management.tsx";
import { getCurrentUser } from "../services/users.service.ts";
import { RequestManagement } from "./admin/request-management.tsx";

interface Component {
  title: string;
  content: JSX.Element;
}

const components: Record<string, Component> = {
  dashboard: {
    title: "Dashboard",
    content: <h2>Dashboard</h2>,
  },
  users: {
    title: "Gerenciamento de usuários",
    content: <UserManagement />,
  },
  environment: {
    title: "Gerenciamento de ambientes",
    content: <EnvironmentManagement />,
  },
  schedule: {
    title: "Gerenciamento de agendamentos",
    content: <ScheduleManagement />,
  },
  requests: {
    title: "Gerenciamento de solicitações de agendamento",
    content: <RequestManagement />,
  },
  lending: {
    title: "Gerenciamento de empréstimos",
    content: <h2>Empréstimos</h2>,
  },
  manuals: {
    title: "Gerenciamento de manuais",
    content: <h2>Manuais</h2>,
  },
};

const links = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardRounded /> },
  { key: "users", label: "Usuários", icon: <PeopleRounded /> },
  { key: "environment", label: "Ambientes", icon: <WorkspacesRounded /> },
  { key: "schedule", label: "Agendamentos", icon: <EventRounded /> },
  { key: "requests", label: "Solicitações", icon: <CalendarMonthRounded /> },
  { key: "lending", label: "Empréstimos", icon: <LocalMallRounded /> },
  { key: "manuals", label: "Manuais", icon: <FilePresentRounded /> },
];

export function Admin() {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [adminName, setAdminName] = useState("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const currentUser = await getCurrentUser();
        const adminFirstName = currentUser.name
          ? currentUser.name.split(" ")
          : "";
        setAdminName(adminFirstName[0]);
      } catch (error) {
        console.error("Erro ao obter o ID do usuário logado:", error);
      }
    };

    fetchLoggedInUserId();
  }, []);

  return (
    <div className="flex">
      <div className="md:w-1/6 bg-white p-4 space-y-6 h-lvh min-w-[200px]">
        <div>
          <h2 className="text-l font-semibold text-slate-700">Administração</h2>
          <h3 className="text-xl font-semibold text-blue-900">{adminName}</h3>
        </div>
        <div className="space-y-1">
          {links.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => handleLinkClick(key)}
              className={`w-full flex gap-2 p-2 rounded-sm transition-colors ${activeLink === key
                ? "bg-blue-900 text-white cursor-auto"
                : "bg-white text-slate-500 hover:text-slate-600 hover:bg-slate-50"
                } `}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex-grow">
        {activeLink in components && (
          <div className="flex flex-col w-full h-full">
            <h3 className="bg-blue-900 text-white text-2xl font-semibold px-6 py-6">
              {components[activeLink].title}
            </h3>

            <div className="px-6 py-4 w-full h-full overflow-auto max-h-[calc(100vh-80px)]">
              {components[activeLink].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
