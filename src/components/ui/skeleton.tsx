import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

// new version: wrap it around something the same size
// as the thing you want it to replace and manipulate loading
// and it'll size itself automatically
// function Skeleton({
//   className,
//   loading = true,
//   children,
//   ...props
// }: SkeletonProps) {
//   if (!loading) return children;
//   return (
//     <div className="relative inline-block">
//       <div
//         className={cn(
//           "absolute inset-0 animate-pulse rounded-md bg-primary/10",
//           className,
//         )}
//         {...props}
//       />
//       <div className="invisible">{children}</div>
//     </div>
//   );
// }

// export { Skeleton };

// old version: you have to size it yourself
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
