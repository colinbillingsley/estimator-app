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
import { Bid } from "@/types";

import dayjs from "dayjs";

const DeadlinesCard = ({
  title,
  description,
  content,
  footer,
}: {
  title: string;
  description?: string;
  content?: Bid;
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
              <li
                key={index}
                className={cn(
                  `flex items-center justify-between bg-muted/50 p-2 hover:bg-muted transition-all duration-200`,
                )}
              >
                <div className={cn(`flex flex-col gap-1 `)}>
                  <span className={cn(`text-sm`)}>{item.name}</span>
                  {item.generalContractors.length > 0 ? (
                    <ul>
                      {item.generalContractors.map((gc, index) => (
                        <li
                          key={`${item.name.toLowerCase()}-${gc.toLowerCase}-${index}`}
                        >
                          <span className={cn(`text-xs text-gray-600`)}>
                            {gc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <span>{`Due ${dayjs(item.dateDue).format("MM/DD [at] hh:mm A")}`}</span>
                </div>
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
