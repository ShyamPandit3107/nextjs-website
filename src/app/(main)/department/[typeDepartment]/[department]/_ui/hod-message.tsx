import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Content from "@/components/ui/content";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";
import { imageShowUrl } from "@/lib/BaseUrl";
import Image from "next/image";
import React from "react";

const HodMessage = ({
  message,
  hodDetails,
}: {
  message: any;
  hodDetails: any;
}) => {
  return (
    <Card className="bg-background shadow-none">
      <CardHeader>
        <CardTitle>
          <Heading>HOD Message</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
          <div className="sm:w-4/5 w-full">
            {message && <Content>{message}</Content>}
          </div>
          <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
            <ImageViewer
              src={`${imageShowUrl}/${hodDetails?.dHead?.staffProfilePhoto}`}
              alt="founder image"
              width={250}
              height={250}
            />

            <h3 className="text-lg font-semibold mt-2 text-primary">{`${hodDetails?.dHead?.staffFirstName} ${hodDetails?.dHead?.staffMiddleName} ${hodDetails?.dHead?.staffLastName}`}</h3>
            <p className="text-sm text-muted-foreground">
              {hodDetails?.dTitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HodMessage;
