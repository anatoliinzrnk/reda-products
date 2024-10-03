const MagicIcon = (props) => {
  const { stroke = "black", strokeWidth = "2" } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 4V2M15 16V14M8 9H10M20 9H22M17.8 11.8L19 13M17.8 6.2L19 5M3 21L12 12M12.2 6.2L11 5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MagicIcon;
