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
