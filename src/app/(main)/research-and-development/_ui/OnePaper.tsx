import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOneRndSection } from "@/api/api-hooks";
import { Download, ExternalLink } from "lucide-react";

interface OnePaperProps {
  active: string | null;
  setActive: (active: string | null) => void;
}

const OnePaper: React.FC<OnePaperProps> = ({ active, setActive }) => {
  const { data: oneRndSection } = useOneRndSection({
    id: active as string,
    page: 1,
    limit: 1000,
    flow: "PAPER",
    search: "",
  });

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setActive(null)}
        // variant="de"
        className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary"
      >
        Back
      </Button>
      {oneRndSection?.all?.map((item: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{item?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold">Department:</span>
                <span>{item?.department?.dName}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Published By:</span>
                <span>
                  {item?.staff?.staffFirstName} {item?.staff?.staffMiddleName}{" "}
                  {item?.staff?.staffLastName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Collaboration:</span>
                <span>{item?.collaboration}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Funded By:</span>
                <span>{item?.funding_agency}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              asChild
              className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary"
            >
              <Link href={`/pdf-viewer/${item?.attach}`} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Link>
            </Button>
            <Button
              asChild
              className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary"
            >
              <Link href={item?.link}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OnePaper;
