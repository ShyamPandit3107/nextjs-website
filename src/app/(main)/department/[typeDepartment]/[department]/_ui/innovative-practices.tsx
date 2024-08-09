import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Content from "@/components/ui/content";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";
import SubHeading from "@/components/ui/sub-heading";
import { imageShowUrl } from "@/lib/BaseUrl";
import Image from "next/image";
import React from "react";

const InnovativePractices = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col">
      <Heading>Innovative Practices</Heading>
      {data?.map((item: any) => (
        <Card className="bg-background shadow-none" key={item._id}>
          <CardHeader>
            <CardTitle className="underline text-xl text-primary font-semibold">
              {item?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
              <div className="sm:w-4/5 w-full">
                {item?.description && <Content>{item?.description}</Content>}
              </div>
              <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
                <ImageViewer
                  src={`${imageShowUrl}/${item?.image}`}
                  alt="not found"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InnovativePractices;
