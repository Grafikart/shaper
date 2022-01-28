export function urlSearchParams() {
  const url = new URL(window.location.href);
  return url.searchParams;
}

export function replaceQueryParams(
  params: Record<string, string> | null = null
) {
  const url = new URL(window.location.href);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.set(key, params[key])
    );
  } else {
    url.searchParams.forEach((_, k) => url.searchParams.delete(k));
  }
  history.replaceState(null, "", url);
  window.dispatchEvent(new CustomEvent("replacestate"));
}
