import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if(!message) return null;
  return (
    <div className='bg-destructive/15 p-3 flex items-center space-x-2 text-sm text-destructive'>
      <ExclamationTriangleIcon />
      <span>{message}</span>
    </div>
  );
};