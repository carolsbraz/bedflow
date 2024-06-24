import { instance } from "../utils/http";

export interface User {
  id?: string;
  name?: string;
  institucional_id?: string;
  email?: string;
  role?: string;
  authenticated?: boolean;
  is_admin?: boolean;
  start_admin: string | null;
  end_admin: string | null;
}

export interface UpdateUserParams {
  adminId: string;
  adminPassword: string;
  user: User;
}

export async function DoLoginUser(
  email: string,
  password: string
): Promise<User> {
  try {
    const result = await instance.http.post("/login", { email, password });

    if (result.status !== 200) {
      throw new Error("Falha no login. Verifique suas credenciais.");
    }

    return result.data as User;
  } catch (error) {
    console.error("Erro no login:", error);
    throw new Error("Falha no login. Por favor, tente novamente.");
  }
}

export async function CreateUser(
  name: string,
  institucional_id: string,
  email: string,
  password: string,
  role: string,
  is_admin: boolean,
  start_admin: string,
  end_admin: string
) {
  try {
    const result = await instance.http.post("/user", {
      name,
      institucional_id,
      email,
      password,
      role,
      is_admin,
      start_admin,
      end_admin,
    });

    if (result.status !== 201) {
      throw new Error("Falha na criação do usuário. Verifique seus dados.");
    }
  } catch (error) {
    console.error("Erro na criação do usuário:", error);
    throw new Error("Falha na criação do usuário. Por favor, tente novamente.");
  }
}

export async function GetUsers(): Promise<User[]> {
  try {
    const result = await instance.http.get("/users");

    if (result.status !== 200) {
      throw new Error("Falha ao obter usuários. Verifique suas credenciais.");
    }

    return result.data as User[];
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    throw new Error("Falha ao obter usuários. Por favor, tente novamente.");
  }
}

export async function updateUser(params: UpdateUserParams): Promise<void> {
  const update = {
    adminId: params.adminId,
    adminPassword: params.adminPassword,
    name: params.user.name,
    institucional_id: params.user.institucional_id,
    email: params.user.email,
    role: params.user.role,
    is_admin: params.user.is_admin,
    start_admin: params.user.start_admin,
    end_admin: params.user.end_admin,
  };

  try {
    const result = await instance.http.put(`/users/${params.user.id}`, update);

    if (result.status !== 204) {
      if (result.status === 401) {
        throw new Error("Senha de administrador incorreta");
      }
      throw new Error("Falha ao atualizar o usuário.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    throw new Error(
      "Falha ao atualizar o usuário. Por favor, tente novamente."
    );
  }
}

export async function getUserById(userId: string): Promise<User> {
  try {
    const result = await instance.http.get(`/user/${userId}`);

    if (result.status !== 200) {
      throw new Error("Falha ao obter detalhes do usuário.");
    }

    return result.data as User;
  } catch (error) {
    console.error("Erro ao obter o usuário:", error);
    throw new Error(
      "Falha ao obter detalhes do usuário. Por favor, tente novamente."
    );
  }
}

export async function deleteUser(
  adminId: string,
  adminPassword: string,
  userId: string
): Promise<void> {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      adminId,
      adminPassword,
    },
  };

  try {
    const result = await instance.http.delete(`/users/${userId}`, config);

    if (result.status !== 204) {
      throw new Error(`Falha ao excluir o usuário. Status: ${result.status}`);
    }
  } catch (error: any) {
    console.error("Erro ao excluir o usuário:", error);

    if (error.response && error.response.status === 401) {
      throw new Error("Senha de administrador incorreta");
    }

    throw new Error("Falha ao excluir o usuário. Por favor, tente novamente.");
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const result = await instance.http.get("/logged");

    if (result.status !== 200) {
      throw new Error("Falha ao obter detalhes do usuário.");
    }

    return result.data as User;
  } catch (error) {
    console.error("Erro ao obter detalhes do usuário:", error);
    throw new Error(
      "Falha ao obter detalhes do usuário. Por favor, tente novamente."
    );
  }
}
