import { useIqacComposition } from "@/api/api-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Content from "@/components/ui/content";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { imageShowUrl } from "@/lib/BaseUrl";
import { useStore } from "@/store";
import Image from "next/image";
import React from "react";

const About = ({ about }: { about: any }) => {
  console.log(about);
  const rndId = useStore((state) => state.rndId);
  console.log(rndId);
  const { data: iqacComposition } = useIqacComposition({
    qcid: rndId,
    page: 1,
    limit: 1000,
  });
  console.log(iqacComposition);
  return (
    <div>
      <Heading>About</Heading>
      {about?.map((item: any) => (
        <Card className="bg-background shadow-none" key={item._id}>
          <CardHeader>
            <CardTitle className="underline text-xl text-primary font-semibold">
              {item?.sub_head_title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
              <div className="sm:w-4/5 w-full">
                {item?.sub_head_body && (
                  <Content>{item?.sub_head_body}</Content>
                )}
              </div>
              <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
                <ImageViewer
                  src={`${imageShowUrl}/${item?.sub_heading_image}`}
                  alt="founder image"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Heading className="mb-2">Composition</Heading>
      <Table className="border-black/80 border-[1px]">
        <TableHeader className="bg-primary text-primary-foreground">
          <TableRow>
            <TableHead className="text-primary-foreground">Sr. No.</TableHead>
            <TableHead className="text-primary-foreground">Photo</TableHead>
            <TableHead className="text-primary-foreground">
              Staff Name
            </TableHead>
            <TableHead className="text-primary-foreground">
              Designation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {iqacComposition?.all_com?.map((item: any, index: number) => {
            if (item.student) {
              return (
                <TableRow
                  key={index}
                  className={` pointer-events-none ${
                    index & 1 ? "bg-gray-100" : ""
                  }`}
                >
                  <TableHead>{index + 1}</TableHead>
                  <TableHead>
                    {item?.student?.studentProfilePhoto && (
                      <ImageViewer
                        src={`${imageShowUrl}/${item?.student?.studentProfilePhoto}`}
                        alt="profile photo"
                        width={50}
                        height={50}
                      />
                    )}
                  </TableHead>
                  <TableHead>{`${item?.student?.studentFirstName} ${item?.student?.studentMiddleName} ${item?.student?.studentLastName}`}</TableHead>
                  <TableHead>{item?.designation}</TableHead>
                </TableRow>
              );
            } else {
              return (
                <TableRow
                  key={index}
                  className={` pointer-events-none ${
                    index & 1 ? "bg-gray-100" : ""
                  }`}
                >
                  <TableHead>{index + 1}</TableHead>
                  <TableHead>
                    {item?.staff?.staffProfilePhoto && (
                      <ImageViewer
                        src={`${imageShowUrl}/${item?.staff?.staffProfilePhoto}`}
                        alt="profile photo"
                        width={50}
                        height={50}
                      />
                    )}
                  </TableHead>
                  <TableHead>{`${item?.staff?.staffFirstName} ${item?.staff?.staffMiddleName} ${item?.staff?.staffLastName}`}</TableHead>
                  <TableHead>{item?.designation}</TableHead>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default About;
