## Otimização de Alocação de Leitos Hospitalares com IA

### Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Proposta Geral](#proposta-geral)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Requisitos do Sistema](#requisitos-do-sistema)
5. [Configuração Inicial](#configuração-inicial)
6. [Execução do Projeto](#execução-do-projeto)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [Detalhes dos Dados](#detalhes-dos-dados)
9. [Integração com Firebase](#integração-com-firebase)

---

## Descrição do Projeto

Este projeto consiste em uma aplicação React que utiliza Firebase para gerenciar dados de leitos hospitalares. O principal objetivo é otimizar a alocação de leitos utilizando Inteligência Artificial, garantindo um atendimento mais rápido e eficiente aos pacientes. 

O sistema também incorpora um componente de Internet das Coisas (IoT), onde cada leito está equipado com RFID para monitoramento e liberação de leitos.

## Proposta Geral

- **Otimização com IA**: Implementar um sistema que utiliza Inteligência Artificial para otimizar a alocação de leitos hospitalares, priorizando a urgência e necessidade de cada paciente.
- **Verificação de Especialidades**: O sistema verifica se o hospital possui a especialidade e os recursos necessários para atender o paciente, garantindo um cuidado adequado.
- **Monitoramento de Leitos**: Cada leito está equipado com um sistema de RFID. Quando o leito é liberado, o enfermeiro utiliza seu cartão RFID para confirmar a liberação.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Firebase**: Plataforma que fornece serviços como banco de dados em tempo real e autenticação.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida e eficiente.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática opcional ao código.
- **Inteligência Artificial**: Algoritmos de IA para otimização da alocação de leitos.
- **IoT com RFID**: Utilização de RFID para monitoramento de leitos.

## Requisitos do Sistema

- Node.js versão 14 ou superior
- npm (Node Package Manager)
- Conta no Firebase para configuração do banco de dados

## Configuração Inicial

1. **Clone o repositório**

   ```bash
   git clone https://github.com/carolsbraz/bedflow.git
   cd bedflow
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase**

   - Crie um projeto no Firebase.
   - Habilite o Firestore Database.
   - Copie as credenciais do projeto.

   Crie um arquivo `firebaseConfig.js` na pasta `src` e adicione as credenciais do Firebase:

   ```javascript
   // src/firebaseConfig.js
   const firebaseConfig = {
     apiKey: "sua-api-key",
     authDomain: "seu-projeto.firebaseapp.com",
     projectId: "seu-projeto",
     storageBucket: "seu-projeto.appspot.com",
     messagingSenderId: "seu-messaging-sender-id",
     appId: "seu-app-id"
   };

   export default firebaseConfig;
   ```

4. **Configure o Firebase no Projeto**

   - Crie o arquivo `firebase.js` na pasta `src` para inicializar o Firebase:

   ```javascript
   // src/firebase.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import firebaseConfig from "./firebaseConfig";

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

## Execução do Projeto

Para executar o projeto em ambiente de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
```

O projeto estará disponível no navegador no endereço `http://localhost:5173/`.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
bedflow/
├── public/                 # Arquivos públicos (HTML, favicon, etc)
├── src/                    # Código fonte do projeto
│   ├── components/         # Componentes React
│   ├── firebase.js         # Inicialização do Firebase
│   ├── firebaseConfig.js   # Configurações do Firebase
│   ├── App.tsx             # Componente principal
│   └── index.tsx           # Arquivo de entrada do React
├── .gitignore              # Arquivos a serem ignorados pelo Git
├── package.json            # Dependências do projeto e scripts
```

## Detalhes dos Dados

Os dados armazenados no Firebase são referentes aos dispositivos monitorados e incluem as seguintes informações:

- **IP**: Endereço IP do dispositivo.
- **LEITO**: Identificação do leito onde o dispositivo está localizado.
- **MAC**: Endereço MAC do dispositivo.
- **SALA**: Nome da sala onde o dispositivo está.
- **SSID**: Nome da rede Wi-Fi à qual o dispositivo está conectado.
- **STATUS**: Status atual do leito (e.g., "LEITO_OCUPADO", "LEITO_LIVRE").

Exemplo de estrutura de dados:

```json
{
  "IP": "192.168.100.155",
  "LEITO": "01",
  "MAC": "84:CC:A8:2C:1B:94",
  "SALA": "UTI_NEONATAL",
  "SSID": "Oi casa 2.4G",
  "STATUS": "LEITO_OCUPADO"
}
```

## Integração com Firebase

A integração com o Firebase é feita através do Firestore Database, onde os dados dos dispositivos são armazenados. Abaixo está um resumo das principais funções utilizadas:

- **Conexão com Firestore**: Inicializa o Firebase e conecta ao Firestore.

  ```javascript
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import firebaseConfig from "./firebaseConfig";

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };
  ```

- **Busca de Dados**: Utiliza o `getDocs` do Firestore para buscar os documentos da coleção "devices".

  ```javascript
  import { collection, getDocs } from "firebase/firestore";

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "devices"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
    setLoading(false);
  };
  ```

---

**Desenvolvido com ❤️ pela equipe HexaCore.** 

Se você tiver qualquer dúvida ou sugestão, sinta-se à vontade para nos contatar!
