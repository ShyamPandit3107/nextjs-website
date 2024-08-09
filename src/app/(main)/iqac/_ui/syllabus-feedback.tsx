import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PDFViewer from "@/components/ui/PDFViewer";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SyllabusFeedback = ({ data }: { data: any }) => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [viewPdf, setViewPdf] = useState<any>();
  useEffect(() => {
    if (data) {
      const teachersData = data?.filter(
        (item: any) => item.flow === "TEACHERS"
      );
      const studentsData = data?.filter((item: any) => item.flow === "STUDENT");
      setTeachers(teachersData);
      setStudents(studentsData);
    }
  }, [data]);

  const renderFeedbackItems = (items: any) => {
    return items.map((item: any, index: number) => (
      <Card
        key={index}
        className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-lg font-semibold text-primary">
            {item.name || `Feedback ${index + 1}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground mb-2">
            {item.date || "No date provided"}
          </p>
          <p className="text-sm">{item.feedback || "No feedback provided"}</p>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      <Heading className="mb-2">Syllabus Feedbacks</Heading>
      <Tabs defaultValue="teachers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary text-primary-foreground">
          <TabsTrigger value="teachers">
            Teachers ({teachers.length})
          </TabsTrigger>
          <TabsTrigger value="students">
            Students ({students.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="teachers" className="mt-4">
          <div className="space-y-4">
            {viewPdf ? (
              <PDFViewer file={viewPdf} setActive={setViewPdf} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {teachers?.map((item: any) => (
                  <Card className="w-full" key={item?._id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <FileIcon className="h-10 w-10 text-blue-500" />
                        <div>
                          <p className="font-medium">{item?.name}</p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setViewPdf(item?.image)}
                        className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary "
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <div className="space-y-4">
            {viewPdf ? (
              <PDFViewer file={viewPdf} setActive={setViewPdf} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {students?.map((item: any) => (
                  <Card className="w-full" key={item?._id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <FileIcon className="h-10 w-10 text-blue-500" />
                        <div>
                          <p className="font-medium">{item?.name}</p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setViewPdf(item?.image)}
                        className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary "
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SyllabusFeedback;
