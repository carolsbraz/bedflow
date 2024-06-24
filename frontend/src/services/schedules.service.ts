import { instance } from "../utils/http";

export interface Schedule {
  id?: string;
  resourceId: string;
  resourceType: string;
  userId: string;
  description: string;
  day: string;
  hour: string;
  endHour: string;
  userName?: string;
}

export async function CreateSchedule(schedule: Schedule) {
  try {
    const result = await instance.http.post("/schedule", schedule);

    if (result.status !== 201) {
      throw new Error("Falha na criação do agendamento. Verifique seus dados.");
    }
  } catch (error) {
    console.error("Erro na criação do agendamento:", error);
    throw new Error(
      "Falha na criação do agendamento. Por favor, tente novamente."
    );
  }
}

export async function GetSchedulesEnvironment(): Promise<Schedule[]> {
  try {
    const result = await instance.http.get("/schedulesEnvironment");

    if (result.status !== 200) {
      throw new Error("Falha ao obter agendamentos.");
    }

    return result.data as Schedule[];
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    throw new Error("Falha ao obter agendamentos. Por favor, tente novamente.");
  }
}

export async function GetSchedulesStation(): Promise<Schedule[]> {
  try {
    const result = await instance.http.get("/schedulesStation");

    if (result.status !== 200) {
      throw new Error("Falha ao obter agendamentos.");
    }

    return result.data as Schedule[];
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    throw new Error("Falha ao obter agendamentos. Por favor, tente novamente.");
  }
}

export async function DeleteSchedule(scheduleId: string): Promise<void> {
  try {
    const result = await instance.http.delete(`/schedule/${scheduleId}`);

    if (result.status !== 204) {
      throw new Error(
        `Falha ao excluir o agendamento. Status: ${result.status}`
      );
    }
  } catch (error) {
    console.error("Erro ao excluir o agendamento:", error);
    throw new Error(
      "Falha ao excluir o agendamento. Por favor, tente novamente."
    );
  }
}
