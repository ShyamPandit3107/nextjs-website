import { useAllMergedDepartments } from "@/api/api-hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { useStore } from "@/store";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Projects = () => {
  const id = useStore((state) => state.id);
  const { data: allDepartments } = useAllMergedDepartments({
    id: id as string,
    page: 1,
    limit: 1000,
    search: "",
  });
  return (
    <div>
      <Heading className="mb-2">Projects</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {allDepartments?.all_depart?.map((item: any) => (
          <Card className="w-full" key={item?._id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="font-medium">{item?.dName}</p>
                </div>
              </div>
              <Button
                // onClick={() => setViewPdf(item?.attach)}
                className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary "
              >
                <Link
                  href={`/department/redirect/${item?._id}?tab=mou-collaboration`}
                >
                  View
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
