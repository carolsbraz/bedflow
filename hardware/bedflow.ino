#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#include <IOXhop_FirebaseESP32.h>
#include <IOXhop_FirebaseStream.h>

#include <WiFi.h>
#include <WiFiAP.h>
#include <WiFiClient.h>
#include <WiFiGeneric.h>
#include <WiFiMulti.h>
#include <WiFiSTA.h>
#include <WiFiScan.h>
#include <WiFiServer.h>
#include <WiFiType.h>
#include <WiFiUdp.h>

#define WIFI_SSID "Oi casa 2.4G"
#define WIFI_PASSWORD "***"
#define FIREBASE_HOST "hexacore-56fcf-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "ywyncOjcOPcptVaqRdKLuosikWa8E7k48eWMi2Uv"

const String senha = "1234"; // Senha de autenticação

const int pinR = 16;
const int pinG = 17;
const int pinB = 18;

// Função para conectar ao WiFi
void conectarWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando ao WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }

  Serial.println();
  Serial.print("Conectado! IP: ");
  Serial.println(WiFi.localIP());
}

// Função para atualizar os valores no Firebase
void atualizarFirebase(const char* status) {
  Firebase.setString("/DISP1/IP/", WiFi.localIP().toString());
  Firebase.setString("/DISP1/MAC/", WiFi.macAddress());
  Firebase.setString("/DISP1/SSID/", WIFI_SSID);
  Firebase.setString("/DISP1/SALA/", "UTI_NEONATAL");
  Firebase.setString("/DISP1/LEITO/", "01");
  Firebase.setString("/DISP1/STATUS/", status);
}

// Funções para os diferentes casos
void caso1() {
  digitalWrite(pinR, HIGH);
  digitalWrite(pinG, LOW);
  digitalWrite(pinB, LOW);
  atualizarFirebase("LEITO OCUPADO");
}

void caso2() {
  digitalWrite(pinR, LOW);
  digitalWrite(pinG, HIGH);
  digitalWrite(pinB, LOW);
  atualizarFirebase("LEITO LIVRE");
}

void caso3() {
  digitalWrite(pinR, LOW);
  digitalWrite(pinG, LOW);
  digitalWrite(pinB, HIGH);
  atualizarFirebase("LEITO RESERVADO");
}

void executarComando(String comando) {
  if (comando == "1") {
    caso1();
  } else if (comando == "2") {
    caso2();
  } else if (comando == "3") {
    caso3();
  } else {
    Serial.println("Comando inválido. Digite 1, 2 ou 3:");
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println();

  conectarWiFi();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.println("Digite um comando (1, 2 ou 3):");

  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);
}

void loop() {
  static String comando = "";
  static unsigned long authStartTime = 0;
  static bool esperandoAutenticacao = false;

  if (Serial.available() > 0) {
    // Lê o comando digitado
    comando = Serial.readStringUntil('\n');
    comando.trim(); // Remove espaços em branco extras

    if (comando == "1" || comando == "2" || comando == "3") {
      // Pede autenticação se o comando for válido
      Serial.println("Digite a senha para autenticar:");
      esperandoAutenticacao = true;
      authStartTime = millis();

      // Espera a senha do usuário
      while (esperandoAutenticacao && (millis() - authStartTime < 60000)) {
        if (Serial.available() > 0) {
          String entradaSenha = Serial.readStringUntil('\n');
          entradaSenha.trim(); // Remove espaços em branco extras

          if (entradaSenha == senha) {
            // Autenticação bem-sucedida
            esperandoAutenticacao = false;
            Serial.println("Autenticado com sucesso!");
            executarComando(comando);
            Serial.println("Digite um comando (1, 2 ou 3):");
          } else {
            // Autenticação falhou
            Serial.println("Senha incorreta. Tente novamente.");
            esperandoAutenticacao = false;
          }
        }
      }

      if (esperandoAutenticacao) {
        Serial.println("Autenticação não realizada! Você não tem permissão para alterar o estado do leito.");
        esperandoAutenticacao = false;
        Serial.println("Digite um comando (1, 2 ou 3):");
      }
    } else {
      Serial.println("Comando inválido. Digite 1, 2 ou 3:");
    }
  }
}