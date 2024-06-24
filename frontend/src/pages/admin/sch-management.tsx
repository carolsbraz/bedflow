import { useEffect, useState } from "react";
import GenericTable, { TableColumn } from "../../components/generic-table.tsx";
import {
  GetSchedulesEnvironment,
  GetSchedulesStation,
  Schedule,
} from "../../services/schedules.service.ts";
import { getUserById } from "../../services/users.service.ts";
import { DeleteschDialog } from "../../components/admin/schedule/delete-sch.tsx";
import { CreateScheduleDialog } from "../../components/admin/schedule/create-sch.tsx";

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleSuccess = () => {
    console.log("Ação bem-sucedida na tela principal!");
    const fetchData = async () => {
      try {
        const schedulesEnvResult = await GetSchedulesEnvironment();
        const schedulesStationResult = await GetSchedulesStation();

        const combinedSchedules = [
          ...schedulesEnvResult,
          ...schedulesStationResult,
        ];

        const schedulesWithUserNames = await Promise.all(
          combinedSchedules.map(async (schedule) => {
            const user = await getUserById(schedule.userId);
            return { ...schedule, userName: user.name };
          })
        );

        setSchedules(schedulesWithUserNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesEnvResult = await GetSchedulesEnvironment();
        const schedulesStationResult = await GetSchedulesStation();

        const combinedSchedules = [
          ...schedulesEnvResult,
          ...schedulesStationResult,
        ];

        const schedulesWithUserNames = await Promise.all(
          combinedSchedules.map(async (schedule) => {
            const user = await getUserById(schedule.userId);
            return { ...schedule, userName: user.name };
          })
        );

        setSchedules(schedulesWithUserNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    console.log(schedules);
  }, []);

  // Função para formatar a data no formato "dd/mm/aaaa"
  function formatDate(date?: string) {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
    return "";
  }

  // Definindo as colunas da tabela
  const columns: TableColumn[] = [
    {
      key: "description",
      label: "Descrição",
      renderCell: (rowData: Schedule) => <span>{rowData.description}</span>,
    },
    {
      key: "user",
      label: "Responsável",
      renderCell: (rowData: Schedule) => <span>{rowData.userName}</span>, // Exibe o nome do usuário
    },
    {
      key: "tipo",
      label: "Tipo",
      renderCell: (rowData: Schedule) => (
        <span>
          {rowData.hasOwnProperty("environmentId") ? "Ambiente" : "Estação"}
        </span>
      ),
    },
    {
      key: "day",
      label: "Dia",
      renderCell: (rowData: Schedule) => <span>{formatDate(rowData.day)}</span>,
    },
    {
      key: "hour",
      label: "Hora de Início",
      renderCell: (rowData: Schedule) => <span>{rowData.hour}</span>,
    },
    {
      key: "endHour",
      label: "Hora de Término",
      renderCell: (rowData: Schedule) => <span>{rowData.endHour}</span>,
    },
    {
      key: "actions",
      label: "Ações",
      renderCell: (rowData: Schedule) => (
        <>
          <span>
            <DeleteschDialog onSucess={handleSuccess} sch={rowData} />
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-5 gap-4">
        <CreateScheduleDialog onSuccess={handleSuccess} />
      </div>
      <div className="bg-white rounded-sm p-6">
        <GenericTable columns={columns} data={schedules} />
      </div>
    </>
  );
}
