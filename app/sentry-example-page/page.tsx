"use client";

import * as Sentry from "@sentry/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  const [, setHasSentError] = useState(false);
  const [, setIsConnected] = useState(true);

  useEffect(() => {
    async function checkConnectivity() {
      const result = await Sentry.diagnoseSdkConnectivity();
      setIsConnected(result !== "sentry-unreachable");
    }
    checkConnectivity();
  }, []);

  const handleButtonClick = async () => {
    try {
      await Sentry.startSpan(
        {
          name: "Example Frontend Span",
          op: "test",
        },
        async () => {
          const res = await fetch("/api/sentry-example-api");

          if (!res.ok) {
            // Primero capturamos el error de la API
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
              `API Error: ${res.status} - ${errorData.error || "Unknown error"}`
            );
          }

          // Si quieres forzar un error de frontend incluso cuando la API tiene éxito,
          // puedes descomentar la siguiente línea
          // throw new SentryExampleFrontendError("This error is raised on the frontend of the example page.");
        }
      );
    } catch (error) {
      setHasSentError(true);
      // Capturamos el error en Sentry
      Sentry.captureException(error);

      // Mostramos el error en la consola para debugging
      console.error("Error:", error);

      // Si quieres mostrar el error al usuario, podrías usar un estado para el mensaje de error
      // setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {/* ... (el resto de tu JSX permanece igual) ... */}

      <button type="button" onClick={handleButtonClick}>
        <span>Throw Sample Error</span>
      </button>

      {/* ... (el resto de tu JSX permanece igual) ... */}
    </div>
  );
}
