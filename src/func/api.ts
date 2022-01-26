export type FetchOptions = RequestInit & {
  json?: object;
  headers?: Record<string, string>;
  query?: Record<string, any>;
};

export function fetchApi<Response>(
  path: string,
  options?: FetchOptions
): Promise<Response> {
  const o = {
    headers: {},
    credentials: "include",
    ...options,
  } as FetchOptions & { headers: Record<string, string> };
  const query = o.query;
  o.headers["X-Requested-With"] = "XMLHttpRequest";
  o.headers["Accept"] = "application/json";
  // Si on a une clef json, alors la requête aura un body json
  if (o.json) {
    o.body = JSON.stringify(o.json);
    o.headers["Content-Type"] = "application/json";
  }
  // On ajoute les query parameters à l'URL
  if (query) {
    const params = new URLSearchParams();
    Object.keys(query).forEach((k: string) => {
      if (query[k] !== undefined) {
        params.set(k, query[k]);
      }
    });
    path += `?${params.toString()}`;
  }
  return fetch(path, o)
    .then(async (r) => {
      if (r.status === 204) {
        return null;
      }
      if (r.ok) {
        return r.json();
      }
      throw new ApiError(
        r,
        r.headers.get("Content-Type") === "application/json"
          ? await r.json()
          : {}
      );
    })
    .catch((e) => {
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(new Response(), {
        message: "Impossible de contacter le serveur",
      });
    });
}

type ErrorResponse = {
  errors?: Record<string, string[]>;
  message?: string;
};

export class ApiError {
  response: Response;
  body: ErrorResponse;

  constructor(response: Response, body: ErrorResponse) {
    this.response = response;
    this.body = body;
  }

  get isJson(): boolean {
    return this.response.headers.get("Content-Type") === "application/json";
  }

  get status(): number {
    return this.response.status;
  }

  get errors() {
    return this.body.errors;
  }
}
