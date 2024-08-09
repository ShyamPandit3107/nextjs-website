import Heading from "@/components/ui/heading";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { imageShowUrl } from "@/lib/BaseUrl";
import { useIqacComposition } from "@/api/api-hooks";
import { useStore } from "@/store";
import ImageViewer from "@/components/ui/image-viewer";
const Composition = () => {
  const qid = useStore((state) => state.qid);
  const { data: compostion } = useIqacComposition({
    qcid: qid,
    page: 1,
    limit: 1000,
  });
  console.log(compostion);
  return (
    <div>
      <Heading className="mb-2">Compositon</Heading>
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
          {compostion?.all_com?.map((item: any, index: number) => {
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

export default Composition;
