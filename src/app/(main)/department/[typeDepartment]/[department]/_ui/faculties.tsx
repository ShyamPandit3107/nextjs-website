import { useDepartmentAllStaff } from "@/api/api-hooks";
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
import Image from "next/image";
import React from "react";

const Faculties = ({ did }: { did: string }) => {
  const { data: facultiesData } = useDepartmentAllStaff({
    did: did,
    page: 1,
    limit: 1000,
  });
  console.log(facultiesData);
  return (
    <div>
      <Heading className="mb-2">Faculties</Heading>
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
            <TableHead className="text-primary-foreground">
              Department
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facultiesData?.all_staff?.map((item: any, index: number) => (
            <TableRow
              key={index}
              className={`  ${index & 1 ? "bg-gray-100" : ""}`}
            >
              <TableHead>{index + 1}</TableHead>
              <TableHead>
                {item?.staffProfilePhoto && (
                  <ImageViewer
                    src={`${imageShowUrl}/${item?.staffProfilePhoto}`}
                    alt="profile photo"
                    width={50}
                    height={50}
                  />
                )}
              </TableHead>
              <TableHead>{`${item?.staffFirstName} ${item?.staffMiddleName} ${item?.staffLastName}`}</TableHead>
              <TableHead>{item?.current_designation}</TableHead>
              <TableHead>{item?.staff_department?.dName}</TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Faculties;
