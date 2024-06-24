import { useEffect, useState } from "react";
import GenericTable, { TableColumn } from "../../components/generic-table.tsx";
import { Environment, GetEnvironments } from "../../services/environment.service.ts";
import * as HoverCard from '@radix-ui/react-hover-card';
import { WorkspacesRounded } from "@mui/icons-material";
import { CreateEnvironmentDialog } from "../../components/admin/environment/create-env.tsx";
import { EditEnvironmentDialog } from "../../components/admin/environment/edit-env.tsx";
import { DeleteEnvDialog } from "../../components/admin/environment/delete-user.tsx";

export function EnvironmentManagement() {
  const [environments, setEnvironments] = useState<Environment[]>([]);

  const handleSuccess = () => {
    console.log("Ação bem-sucedida na tela principal!");
    const fetchData = async () => {
      try {
        const [usersResult] = await Promise.all([
          GetEnvironments(),
        ]);

        setEnvironments(usersResult);
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
        const [envResult] = await Promise.all([
          GetEnvironments(),
        ]);

        setEnvironments(envResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Nome",
      renderCell: (rowData: Environment) => (
        <>
          {rowData.name}
        </>
      ),
    },
    {
      key: "abbreviation",
      label: "Sigla",
      renderCell: (rowData: Environment) => (
        <>
          {rowData.abbreviation}
        </>
      ),
    },
    {
      key: "stations",
      label: "Estações",
      renderCell: (rowData: Environment) => (
        <>
          <HoverCard.Root openDelay={200}>
            <HoverCard.Trigger className="cursor-pointer">
              <WorkspacesRounded /> {rowData.numberOfStations} {"estações"}
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content side="bottom" className="bg-slate-100 px-2 py-1 text-xs rounded-sm mt-3">
                <h4 className="text-sm font-semibold">Estações:</h4>
                {rowData.Station && rowData.Station.map(element => (
                  <div key={element.name}>{`${element.name}`}</div>
                ))}
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </>
      ),
    },
    {
      key: "actions",
      label: "Ações",
      renderCell: (rowData: Environment) => (
        <>
          <span>
            <EditEnvironmentDialog onSucess={handleSuccess} env={rowData} />
          </span>
          <span>
            <DeleteEnvDialog onSucess={handleSuccess} env={rowData} />
          </span>
        </>

      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-5 gap-4">
        <CreateEnvironmentDialog onSucess={handleSuccess} />
      </div>
      <div className="bg-white rounded-sm p-6">
        <GenericTable columns={columns} data={environments} />
      </div>
    </>
  );
}
