import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useFirebaseContext } from "@/context/firebase-context";
import { useInstructorContext } from "@/context/instructor-context";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const filterOptions = {
  Category: [
    { id: "category-1", label: "Category 1" },
    { id: "category-2", label: "Category 2" },
  ],
  Level: [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
  ],
};

const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
];

function SelectCourses() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const { getAllCourses } = useFirebaseContext();
  const { initialCourse } = useInstructorContext();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    if (!cpyFilters[getSectionId]) {
      cpyFilters[getSectionId] = [getCurrentOption.id];
    } else {
      const index = cpyFilters[getSectionId].indexOf(getCurrentOption.id);
      if (index === -1) cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(index, 1);
    }
    setFilters(cpyFilters);
  }

  return (
    <div className="container  p-4 mt-[70px]">
      <h1 className="text-3xl font-bold mb-4">Select Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {Object.keys(filterOptions).map((filterKey) => (
              <div key={filterKey} className="p-4 border-b">
                <h3 className="font-bold mb-3">{filterKey.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[filterKey].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-3"
                    >
                      <Checkbox
                        checked={
                          filters[filterKey]?.includes(option.id) || false
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(filterKey, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {courses.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {courses.length > 0 ? (
              courses.map((courseItem, index) => (
                <Card
                  key={courseItem.id}
                  className="cursor-pointer"
                  onClick={() => {
                    initialCourse(courses[index]);
                    const id = courses[index].id;
                    navigate("/student/course-details?id=" + id);
                  }}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem.banner}
                        className="w-full h-full object-cover"
                        alt="course"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By <span className="font-bold"> Jayshree</span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {courseItem.curriculum.length}{" "}
                        {courseItem.curriculum.length === 1
                          ? "Lecture"
                          : "Lectures"}{" "}
                        - {courseItem.level.toUpperCase()} Level
                      </p>
                      <p className="font-bold text-lg">${courseItem.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SelectCourses;
