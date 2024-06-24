import { instance } from "../utils/http";

export interface Station {
  id?: string;
  name?: string;
}

export interface Environment {
  id?: string;
  name?: string;
  abbreviation?: string;
  numberOfStations?: number;
  Station?: Station[];
}

export interface UpdateEnvParams {
  id?: string;
  name?: string;
  abbreviation?: string;
  numberOfStations?: number;
}

export async function CreateEnvironment(
  name: string,
  abbreviation: string,
  numberOfStations: number,
) {
  try {
    const result = await instance.http.post("/environment", {
      name,
      abbreviation,
      numberOfStations,
    });

    if (result.status !== 201) {
      throw new Error("Falha na criação do ambiente. Verifique seus dados.");
    }
  } catch (error) {
    console.error("Erro na criação do ambiente:", error);
    throw new Error("Falha na criação do ambiente. Por favor, tente novamente.");
  }
}

export async function GetEnvironments(): Promise<Environment[]> {
  try {
    const result = await instance.http.get("/environments");

    if (result.status !== 200) {
      throw new Error("Falha ao obter ambientes.");
    }

    return result.data as Environment[];
  } catch (error) {
    console.error("Erro ao obter ambientes:", error);
    throw new Error("Falha ao obter ambientes. Por favor, tente novamente.");
  }
}

export async function updateEnv(params: UpdateEnvParams): Promise<void> {
  const update = {
    name: params.name,
    abbreviation: params.abbreviation,
    numberOfStations: params.numberOfStations,
  };

  try {
    console.log(params.id)
    console.log(update)
    const result = await instance.http.put(`/environments/${params.id}`, update);

    if (result.status !== 204) {
      if (result.status === 401) {
        throw new Error("Senha de administrador incorreta.");
      }
      throw new Error("Falha ao atualizar o ambiente.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o ambiente:", error);
    throw new Error(
      "Falha ao atualizar o ambiente. Por favor, tente novamente."
    );
  }
}

export async function deleteEnv(
  envId: string
): Promise<void> {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await instance.http.delete(`/environments/${envId}`, config);

    if (result.status !== 204) {
      throw new Error(`Falha ao excluir o ambiente. Status: ${result.status}`);
    }
  } catch (error: any) {
    console.error("Erro ao excluir o ambiente:", error);

    if (error.response && error.response.status === 401) {
      throw new Error("Senha de administrador incorreta");
    }

    throw new Error("Falha ao excluir o ambiente. Por favor, tente novamente.");
  }
}