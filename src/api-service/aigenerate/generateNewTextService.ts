export const generateNewTextService = async (
  prompt: string,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  onOpen: () => void,
  setTextMessage: (value: string) => void
) => {
  if (!prompt) {
    setErrMsg("Please enter a prompt");
    return;
  }
  setLoading(true);
  try {
    const response = await fetch("/api/generate/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      onOpen();
      setTextMessage(data.newGeneratedText.generatedText);
    } else {
      setErrMsg(data.error);
    }
    return response;
  } catch (error: any) {
    setErrMsg(error.message || "Something went wrong");
    console.error(error);
  } finally {
    setLoading(false);
  }
};
