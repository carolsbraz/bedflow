import { instance } from "../utils/http";

export interface RequestSchedule {
  id?: string;
  resourceId: string;
  resourceType: string;
  userId: string;
  description: string;
  recurrent: boolean;
  startDay: string;
  endDay: string;
  startHour: string;
  endHour: string;
  daysOfWeek: string;
  comment: string;
  status: number;
  userName?: string;
}

export interface UpdateReqParams {
  id?: string;
  resourceId: string;
  resourceType: string;
  userId: string;
  description: string;
  recurrent: boolean;
  startDay: string;
  endDay: string;
  startHour: string;
  endHour: string;
  daysOfWeek: string;
  comment: string;
  status: number;
}

export interface DeclineReqParams {
  id?: string;
  comment: string;
}

export interface AcceptReqParams {
  id?: string;
}

export async function CreateRequest(requestSchedule: RequestSchedule) {
  try {
    const result = await instance.http.post("/requests", requestSchedule);

    if (result.status !== 201) {
      throw new Error("Falha na criação do solicitação. Verifique seus dados.");
    }
  } catch (error) {
    console.error("Erro na criação do solicitação:", error);
    throw new Error(
      "Falha na criação do solicitação. Por favor, tente novamente."
    );
  }
}

export async function GetRequests(): Promise<RequestSchedule[]> {
  try {
    const result = await instance.http.get("/requests");

    if (result.status !== 200) {
      throw new Error("Falha ao obter solicitações.");
    }

    return result.data as RequestSchedule[];
  } catch (error) {
    console.error("Erro ao obter solicitações:", error);
    throw new Error("Falha ao obter solicitações. Por favor, tente novamente.");
  }
}

export async function updateRequestSchedule(
  params: UpdateReqParams
): Promise<void> {
  try {
    const result = await instance.http.put(`/requests/${params.id}`, params);

    if (result.status !== 204) {
      if (result.status === 401) {
        throw new Error("Senha de administrador incorreta");
      }
      throw new Error("Falha ao atualizar solicitação de agendamento.");
    }
  } catch (error) {
    console.error("Erro ao atualizar solicitação de agendamento:", error);
    throw new Error(
      "Falha ao atualizar solicitação de agendamento. Por favor, tente novamente."
    );
  }
}

export async function declineRequestSchedule(
  params: DeclineReqParams
): Promise<void> {
  try {
    console.log("Recusando...", params);
    const result = await instance.http.put(`/requests/${params.id}/reject`, {
      comment: params.comment,
    });

    if (result.status !== 200) {
      if (result.status === 401) {
        throw new Error("Senha de administrador incorreta");
      }
      throw new Error("Falha ao rejeitar solicitação de agendamento.");
    }
  } catch (error) {
    console.error("Erro ao rejeitar solicitação de agendamento:", error);
    throw new Error(
      "Falha ao rejeitar solicitação de agendamento. Por favor, tente novamente."
    );
  }
}

export async function acceptRequestSchedule(
  params: AcceptReqParams
): Promise<void> {
  try {
    console.log("Aceitando...", params);
    const result = await instance.http.put(`/requests/${params.id}/accept`);

    if (result.status !== 200) {
      if (result.status === 401) {
        throw new Error("Senha de administrador incorreta");
      }
      throw new Error("Falha ao rejeitar solicitação de agendamento.");
    }
  } catch (error) {
    console.error("Erro ao rejeitar solicitação de agendamento:", error);
    throw new Error(
      "Falha ao rejeitar solicitação de agendamento. Por favor, tente novamente."
    );
  }
}
