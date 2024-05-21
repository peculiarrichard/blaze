function handleResponse(response: any) {
  const data = response.json();

  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    const error = new Error(response.statusText);
    console.error(error);
    throw error;
  }
  return data;
}

export const fetchWrapper = async (
  url: string,
  method: string,
  data?: null | any
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: headers,
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    const responseData = await handleResponse(response);
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
