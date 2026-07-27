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

const DeadlinesCard = ({
  title,
  description,
  content,
  footer,
}: {
  title: string;
  description?: string;
  content?: string[];
  footer?: string;
}) => {
  return (
    <Card className={cn(`hover:cursor-default`)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {content && content.length > 0 ? (
          <ul className={cn(`space-y-2`)}>
            {content.map((item, index) => (
              <li key={index} className={cn(`text-lg`)}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className={cn(`text-2xl font-bold`)}>No items</p>
        )}
      </CardContent>
      {footer && (
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DeadlinesCard;
