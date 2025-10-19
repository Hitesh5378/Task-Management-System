import React from "react";

interface ButtonProps {
  dis?: boolean;
  click?: React.MouseEventHandler<HTMLButtonElement>;
  txt?: string;
  type?: "button" | "submit";
  className?: string;
  onKey?: (event: React.KeyboardEvent<HTMLButtonElement>) => void; 
}

export const Button: React.FC<ButtonProps> = ({className,type,dis,click,onKey,txt}) => {
  return (
    <div>
      <button
        className={className}
        type={type}
        disabled={dis}
        onClick={click}
        onKeyDown={onKey} 
      >     
        {txt}
      </button>
    </div>
  );
};
