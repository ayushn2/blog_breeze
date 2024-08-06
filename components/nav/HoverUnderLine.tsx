import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function HoverUnderLine({
	children,
	className = "bg-primary",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className="group">
			{children}
			<div
				className={cn(
					"h-1 w-0 group-hover:w-[60%]  transition-all",
					className
				)}
			></div>
		</div>
	);
}
