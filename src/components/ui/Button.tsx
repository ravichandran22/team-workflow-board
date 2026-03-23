type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;