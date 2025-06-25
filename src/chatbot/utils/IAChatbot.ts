
export const manejarConsultaIA = async (pregunta: string): Promise<string> => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/iaOpenAI`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    { role: "user", content: pregunta }
                ]
            }),
        });

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}`);
        }

        const { message } = await resp.json();
        return message.content;

    } catch (error) {
        console.error("Error al conectar con la API de IA:", error);
        return "Disculpa, parece que todavia no me terminaron de ajustar del todo. ¿Quieres que te conecte con un asesor humano?";
    }
};
