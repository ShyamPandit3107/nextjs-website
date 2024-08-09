import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageViewer from "@/components/ui/image-viewer";
import { imageShowUrl } from "@/lib/BaseUrl";
import { Heading } from "lucide-react";
import Image from "next/image";
import React from "react";

const About = ({
  about,
  image,
}: {
  about: string | undefined;
  image: string | undefined;
}) => {
  return (
    <Card className="bg-background shadow-none">
      <CardHeader>
        <CardTitle className="underline text-primary">About</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
          <div className="md:w-4/5 w-full">{about}</div>
          <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
            {image && (
              <ImageViewer
                src={`${imageShowUrl}/${image}`}
                alt="founder image"
                width={250}
                height={250}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
