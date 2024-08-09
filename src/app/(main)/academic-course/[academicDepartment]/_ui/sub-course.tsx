import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Content from "@/components/ui/content";
import ImageViewer from "@/components/ui/image-viewer";
import { imageShowUrl } from "@/lib/BaseUrl";
import Image from "next/image";
import React from "react";

const SubCourse = ({ data }: { data: any }) => {
  return (
    <Card className="bg-background shadow-none">
      <CardHeader>
        <CardTitle className="underline text-primary">
          {data?.sub_head_title_main}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data?.sub_topic?.map((item: any, index: number) => (
          <div
            className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 mb-4"
            key={index}
          >
            <div className="md:w-4/5 w-full flex flex-col">
              <h1 className="text-xl font-bold">{item?.sub_head_title}</h1>
              <Content>{item?.sub_head_body}</Content>
            </div>
            <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
              {item?.sub_heading_image && (
                <ImageViewer
                  src={`${imageShowUrl}/${item?.sub_heading_image}`}
                  alt="founder image"
                  width={250}
                  height={250}
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SubCourse;
