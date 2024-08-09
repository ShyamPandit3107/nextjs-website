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

const FacultyTable = ({ data, name }: { data: any; name: string }) => {
  console.log(data);
  return (
    <Table className="border-black/80 border-[1px]">
      <TableHeader className="bg-primary text-primary-foreground">
        <TableRow>
          <TableHead className="text-primary-foreground">Sr. No.</TableHead>
          <TableHead className="text-primary-foreground">Photo</TableHead>
          <TableHead className="text-primary-foreground">Staff Name</TableHead>
          <TableHead className="text-primary-foreground">Designation</TableHead>
          <TableHead className="text-primary-foreground">Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: any, index: number) => (
          <TableRow
            key={index}
            className={` ${index & 1 ? "bg-gray-100" : ""}`}
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
  );
};

export default FacultyTable;
