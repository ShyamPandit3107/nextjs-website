import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { imageShowUrl } from "@/lib/BaseUrl";
import Content from "../ui/content";

const FounderMessage = ({ data }: { data: any }) => {
  return (
    <div className="w-[95%] m-auto">
      <Card className="w-full text-center rounded-sm text-primary-foreground bg-primary">
        <CardHeader>
          <CardTitle>Founder&apos;s Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Image
              src={`${imageShowUrl}/${data.founder_message_image}`}
              alt="Founder"
              width={250}
              height={250}
              className=" mb-4"
            />
            <h3 className="text-xl font-semibold">
              {data.founder_message_name}
            </h3>
            <p className="text-sm">{data.founder_message_designation}</p>
          </div>
          <p className="mb-6">{data.founder_message_message}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className=" text-primary-foreground bg-primary border-none">
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <Content className="text-center">{data.vision}</Content>
              </CardContent>
            </Card>
            <Card className="text-primary-foreground bg-primary border-none">
              <CardHeader>
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <Content>{data.mission}</Content>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FounderMessage;
