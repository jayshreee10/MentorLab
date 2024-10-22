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
import { useApiContext } from "@/context/firebase-context";
import { useInstructorContext } from "@/context/instructor-context";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortOptions, filterOptions } from "@/config";

function SelectCourses() {
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    primaryLanguage: [],
  });
  const navigate = useNavigate();
  const { getAllCourses } = useApiContext();
  const { initialCourse } = useInstructorContext();

  const [courses, setCourses] = useState([]);
  const [sortedCourses, setSortedCourses] = useState([]);
  const [sortOption, setSortOption] = useState(sortOptions[0].id);

  useEffect(() => {
    getAllCourses().then((courses) => {
      setCourses(courses);
      setSortedCourses(courses); // Initialize sortedCourses with fetched data
    });
  }, [getAllCourses]);

  useEffect(() => {
    const sorted = [...courses]; // Create a copy of the original array

    if (sortOption === "price-lowtohigh") {
      sorted.sort((a, b) => a.pricing - b.pricing); // Sort from low to high
    } else if (sortOption === "price-hightolow") {
      sorted.sort((a, b) => b.pricing - a.pricing); // Sort from high to low
    }

    setSortedCourses(sorted); // Update the state with sorted courses
  }, [sortOption, courses]);

  const handleFilterOnChange = (filterKey, option) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterKey] || [];
      if (currentFilters.includes(option.id)) {
        return {
          ...prevFilters,
          [filterKey]: currentFilters.filter((id) => id !== option.id),
        };
      } else {
        return {
          ...prevFilters,
          [filterKey]: [...currentFilters, option.id],
        };
      }
    });
  };

  const getFilteredCourses = () => {
    return sortedCourses.filter((course) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(course.category);
      const levelMatch =
        filters.level.length === 0 || filters.level.includes(course.level);
      const languageMatch =
        filters.primaryLanguage.length === 0 ||
        filters.primaryLanguage.includes(course.primaryLanguage);

      return categoryMatch && levelMatch && languageMatch;
    });
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="container  p-6 mt-[70px] bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Select Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-1/4">
          <h2 className="font-bold mb-3">Filters</h2>
          {Object.keys(filterOptions).map((filterKey) => (
            <div key={filterKey} className="p-4 border-b">
              <h3 className="font-semibold mb-2">{filterKey.toUpperCase()}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[filterKey].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2"
                  >
                    <Checkbox
                      checked={filters[filterKey]?.includes(option.id) || false}
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
        </aside>
        <div className="flex-grow">
          <div className="flex  items-center justify-end mb-4">
            <div className="flex items-center justify-end gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span className="text-[16px] font-medium">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuRadioGroup
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
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
                {filteredCourses.length} Results
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((courseItem) => (
                <Card
                  key={courseItem.courseId}
                  className="cursor-pointer  hover:shadow-xl transition-shadow"
                  onClick={() => {
                    initialCourse(courseItem);
                    const id = courseItem.courseId;
                    navigate("/student/course-details?id=" + id);
                  }}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem.banner}
                        className="w-full h-full object-cover rounded-md"
                        alt="course"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By <span className="font-bold">Jayshree</span>
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
        </div>
      </div>
    </div>
  );
}

export default SelectCourses;
