import {cn} from "../utils.ts";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
                className
            )}
            {...props}
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};
