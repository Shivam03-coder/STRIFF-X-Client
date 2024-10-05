"use client";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/redux/endpoints";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { ProjectCard, TaskCard, UserCard } from "./cards";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>("M");

  const {
    data: searchedResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });
  console.log("🚀 ~ Page ~ searchedResults:", searchedResults);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 500);

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <Input
          type="text"
          placeholder="Search..."
          className="w-1/3 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchedResults && (
          <div>
            {searchedResults.Tasks && searchedResults.Tasks.length > 0 && (
              <h2 className="px-3 py-2 text-xl">Tasks</h2>
            )}
            {searchedResults.Tasks?.map((task) => (
              <TaskCard key={task.id} Tasks={task} />
            ))}

            {searchedResults.Projects &&
              searchedResults.Projects.length > 0 && (
                <h2 className="px-3 py-2 text-xl">Projects</h2>
              )}
            {searchedResults.Projects?.map((project) => (
              <ProjectCard key={project.id} Projects={project} />
            ))}

            {searchedResults.Users && searchedResults.Users.length > 0 && (
              <h2 className="px-3 py-2 text-xl">Users</h2>
            )}
            {searchedResults.Users?.map((user) => (
              <UserCard key={user.userId} Users={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
