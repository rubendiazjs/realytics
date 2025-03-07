"use client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const ContentBlock = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-2 text-center",
        className
      )}
    >
      {children}
    </div>
  );
};

const ContentBlockHeader = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn(
        "text-3xl font-bold tracking-tighter md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
};

const ContentBlockDescription = ({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn("max-w-[900px] text-gray-500 md:text-xl", className)}>
      {children}
    </p>
  );
};

export default Object.assign(ContentBlock, {
  Badge: Badge,
  Header: ContentBlockHeader,
  Description: ContentBlockDescription,
});
