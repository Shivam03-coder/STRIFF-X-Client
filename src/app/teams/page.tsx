"use client";

import { useGetTeamsQuery } from "@/redux/endpoints";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamPage = () => {
  const { data: Teams, isError, isLoading } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred while fetching users.</div>;

  return (
    <div className="px-4 xl:px-6">
      <Table className="p-7">
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow className="bg-secondary-100">
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Team ID</TableHead>
            <TableHead>Team-Name</TableHead>
            <TableHead>Manager Id</TableHead>
            <TableHead>Owner Id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Teams?.map((team) => (
            <TableRow key={team.teamId}>
              <TableCell className="font-medium">{team.teamId}</TableCell>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.projectManagerUserId}</TableCell>
              <TableCell>{team.productOwnerUserId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamPage;
