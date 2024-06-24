import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Interface para os dados dos dispositivos
interface DeviceData {
  IP: string;
  LEITO: string;
  MAC: string;
  SALA: string;
  SSID: string;
  STATUS: string;
}

export function BedManagement() {
  const [data, setData] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "devices"));
      const data = querySnapshot.docs.map((doc) => doc.data() as DeviceData);
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-300 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="data-container space-y-4">
          {data.map((device, index) => (
            <div
              key={index}
              className="device-card relative rounded-md p-6 w-full mx-auto bg-white shadow-md"
            >
              <p>
                <strong>LEITO:</strong> {device.LEITO}
              </p>
              <p>
                <strong>IP:</strong> {device.IP}
              </p>

              <p>
                <strong>MAC:</strong> {device.MAC}
              </p>
              <p>
                <strong>SALA:</strong> {device.SALA}
              </p>
              <p>
                <strong>SSID:</strong> {device.SSID}
              </p>
              <p className="flex justify-between items-start">
                <span className="absolute top-6 right-6 bg-white px-2 py-1 rounded text-sm font-semibolD">
                  <span className="relative flex h-2 w-2 ml-1">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        device.STATUS === "LEITO LIVRE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        device.STATUS === "LEITO LIVRE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                  </span>
                </span>
                {device.STATUS === "LEITO LIVRE" ? (
                  <span className="absolute bottom-6 right-6 text-white bg-green-500 px-2 py-1 rounded text-sm font-semibolD hover:bg-green-600 hover:cursor-pointer">
                    Alocar
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
