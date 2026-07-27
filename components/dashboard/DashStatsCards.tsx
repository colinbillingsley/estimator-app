"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DashStatsCard = ({
  title,
  description,
  content,
  footer,
}: {
  title: string;
  description?: string;
  content: string | number;
  footer?: string;
}) => {
  return (
    <Card className={cn(`hover:cursor-default`)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className={cn(`text-2xl font-bold`)}>{content}</p>
      </CardContent>
      {footer && (
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashStatsCard;
