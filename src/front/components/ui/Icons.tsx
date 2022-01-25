type IconProps = {
  size: number;
};

export function ClockIcon({ size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 23 23"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.86 9.703v3.594l-2.157 1.437m7.188-12.218 3.593 2.875-3.593-2.875Zm-10.782 0L2.516 5.39l3.593-2.875Zm11.5 16.53 1.438 1.438-1.438-1.437Zm-12.218 0-1.438 1.438 1.438-1.437Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.5 20.484a7.547 7.547 0 1 0 0-15.093 7.547 7.547 0 0 0 0 15.093Z"
      />
    </svg>
  );
}

export function SkullIcon({ size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.75 11.25h3v3h6.5v-3h3s1-9.5-6.25-9.5-6.25 9.5-6.25 9.5Z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.25 8.25a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM10.75 8.25a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
      />
    </svg>
  );
}

export function SuccessIcon({ size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M14.25 8.75C13.75 11.25 11.865 13.604 9.21998 14.13C7.92997 14.3869 6.59179 14.2303 5.39598 13.6824C4.20018 13.1345 3.2077 12.2233 2.55988 11.0786C1.91205 9.93384 1.6419 8.61389 1.78789 7.30667C1.93388 5.99946 2.48857 4.77163 3.37298 3.798C5.18698 1.8 8.24998 1.25 10.75 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 7.75L8.25 10.25L14.25 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon({ size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.75 5.75L10.25 10.25M10.25 5.75L5.75 10.25L10.25 5.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
