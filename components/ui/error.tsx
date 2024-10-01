import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { FC } from "react";

export const Error: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <Card className="p-0">
      <CardHeader className="pb-2 text-center">
        <AlertTriangle className="size-16 shrink-0 self-center pb-6 text-secondary-foreground" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-secondary-foreground">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};
