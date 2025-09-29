import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface IAboutCardProps {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  Icon: any;
}
const AboutCard = ({
  title,
  description,
  Icon,
  bgColor,
  borderColor,
  textColor,
}: IAboutCardProps) => {
  return (
    <Card className={`${bgColor} ${borderColor} `}>
      <CardHeader className="p-4 pb-2">
        <CardTitle
          className={`text-base flex font-bold items-center gap-2 ${textColor}`}
        >
          <Icon className="w-5 h-5" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground p-4 pt-0">
        {description}
      </CardContent>
    </Card>
  );
};

export default AboutCard;
