import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OneActivities from "../../department/[typeDepartment]/[department]/_ui/one-activities";
import { useQualityInitiatives } from "@/api/api-hooks";
import { useStore } from "@/store";
import Heading from "@/components/ui/heading";
const TABS = [
  "Training Program",
  "Orientation Program",
  "Seminar",
  "Webinar",
  "Workshop",
  "Certificate Course",
  "Credit Course",
  "Expert Guest Lecture",
  "Field/Study Tour Visits",
  "Hands On Training Program",
  "State Level Conference",
  "National Level Conference",
  "International Level Conference",
  "Days Celebration",
  "Outreach Program",
  "Social Program",
  "Extension Activities",
  "Exhibitions",
  "Quiz Competitions",
  "Any Other",
];

const QualityInitiatives = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const id = useStore((state) => state.id);
  const tabsToShow = 4;
  const { data: qualityInitiatives } = useQualityInitiatives({
    id: id as string,
    type: activeTab,
  });
  console.log(qualityInitiatives);

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(TABS.length - tabsToShow, startIndex + 1));
  };
  console.log(selectedItem);
  return (
    <div className="space-y-4">
      <Heading>Quality Initiatives</Heading>

      <nav className="bg-primary text-primary-foreground p-2 rounded-md">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-2 overflow-x-auto">
            {TABS.slice(startIndex, startIndex + tabsToShow).map(
              (tab, index) => (
                <Button
                  key={index}
                  variant={activeTab === tab ? "secondary" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              )
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      <div>
        {selectedItem ? (
          <OneActivities id={selectedItem} setActive={setSelectedItem} />
        ) : (
          <Table className="border-black/80 border-[1px]">
            <TableHeader className="bg-primary text-primary-foreground">
              <TableRow>
                <TableHead className="text-primary-foreground">
                  Sr. No.
                </TableHead>
                <TableHead className="text-primary-foreground">Name</TableHead>
                <TableHead className="text-primary-foreground">
                  Batch{" "}
                </TableHead>
                <TableHead className="text-primary-foreground">
                  Department
                </TableHead>
                <TableHead className="text-primary-foreground">Staff</TableHead>
                <TableHead className="text-primary-foreground">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityInitiatives?.all_act?.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  className={` ${index & 1 ? "bg-gray-100" : ""}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.activity_name}</TableCell>
                  <TableCell>{item?.activity_batch?.batchName}</TableCell>
                  <TableCell>{item?.activity_department?.dName}</TableCell>
                  <TableCell>
                    {item?.activity_staff?.staffFirstName}{" "}
                    {item?.activity_staff?.staffMiddleName}{" "}
                    {item?.activity_staff?.staffLastName}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => setSelectedItem(item._id)}>
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default QualityInitiatives;
