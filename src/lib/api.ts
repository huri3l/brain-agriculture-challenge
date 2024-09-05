const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface FetchOptions extends RequestInit {
  body?: any;
}

export const request = async <T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = `${baseUrl}${path}`;

  if (options.body && typeof options.body === "object") {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};