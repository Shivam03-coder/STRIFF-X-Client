"use client";

import { useUsersQuery } from "@/redux/endpoints";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const UsersPage = () => {
  const { data: results, isError, isLoading } = useUsersQuery();
  console.log("🚀 ~ UsersPage ~ results:", results);

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
            <TableHead>CognitoId</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>Profile Picture</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results?.Users?.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.teamId}</TableCell>
              <TableCell>{user.cognitoId}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>
                <Image
                  src={`/${user.profilePictureUrl}`} // Adjust the path as per your setup
                  alt={`${user.username}'s profile`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
