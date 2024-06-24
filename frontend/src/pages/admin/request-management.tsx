import { useEffect, useState } from "react";
import GenericTable, { TableColumn } from "../../components/generic-table.tsx";
import {
  GetRequests,
  RequestSchedule,
} from "../../services/request-environment.service.ts";
import { getUserById } from "../../services/users.service.ts";
import { DeclineRequestDialog } from "../../components/admin/request/decline-request.tsx";
import { AcceptRequestDialog } from "../../components/admin/request/accept-request.tsx";

export function RequestManagement() {
  const [requests, setRequests] = useState<RequestSchedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestSchedule = await GetRequests();

        const schedulesWithUserNames = await Promise.all(
          requestSchedule.map(async (schedule) => {
            const user = await getUserById(schedule.userId);
            return { ...schedule, userName: user.name };
          })
        );

        console.log(schedulesWithUserNames);

        setRequests(schedulesWithUserNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSuccess = () => {
    console.log("Ação bem-sucedida na tela principal!");
    const fetchData = async () => {
      try {
        const requestSchedule = await GetRequests();

        const schedulesWithUserNames = await Promise.all(
          requestSchedule.map(async (schedule) => {
            const user = await getUserById(schedule.userId);
            return { ...schedule, userName: user.name };
          })
        );

        console.log(schedulesWithUserNames);

        setRequests(schedulesWithUserNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return {};
  };

  // Função para formatar a data no formato "dd/mm/aaaa"
  function formatDate(date?: string) {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
    return "";
  }

  const columns: TableColumn[] = [
    {
      key: "description",
      label: "Descrição",
      renderCell: (rowData: RequestSchedule) => (
        <span>{rowData.description}</span>
      ),
    },
    {
      key: "user",
      label: "Responsável",
      renderCell: (rowData: RequestSchedule) => <span>{rowData.userName}</span>,
    },
    {
      key: "tipo",
      label: "Tipo",
      renderCell: (rowData: RequestSchedule) => (
        <span>
          {rowData.hasOwnProperty("environmentId") ? "Ambiente" : "Estação"}
        </span>
      ),
    },
    {
      key: "day",
      label: "Período",
      renderCell: (rowData: RequestSchedule) => (
        <>
          <span>
            <>{formatDate(rowData.startDay)}</>
            {rowData.recurrent ? ` à ${formatDate(rowData.endDay)}` : ""}
          </span>
        </>
      ),
    },
    {
      key: "hour",
      label: "Hora de Início",
      renderCell: (rowData: RequestSchedule) => (
        <span>
          {rowData.startHour} - {rowData.endHour}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      renderCell: (rowData: RequestSchedule) => (
        <>
          <span
            className={`${
              rowData.status == 0
                ? "bg-slate-500"
                : rowData.status == 1
                ? "bg-green-500"
                : "bg-red-500"
            } rounded-sm p-2 text-white w-full text-sm`}
          >
            {rowData.status == 0
              ? "Pendente"
              : rowData.status == 1
              ? "Confirmado"
              : "Recusado"}
          </span>
        </>
      ),
    },
    {
      key: "actions",
      label: "Ações",
      renderCell: (rowData: RequestSchedule) => (
        <>
          {rowData.status == 0 ? (
            <>
              <span>
                <DeclineRequestDialog onSucess={handleSuccess} sch={rowData} />
              </span>
              <span>
                <AcceptRequestDialog onSucess={handleSuccess} sch={rowData} />
              </span>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-sm p-6">
        <GenericTable columns={columns} data={requests} />
      </div>
    </>
  );
}
