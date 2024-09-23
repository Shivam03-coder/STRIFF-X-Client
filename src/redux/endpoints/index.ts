import { ApiService } from "../middlewares/api";
import { ProjectDataType, TaskDataType } from "./interfaces";
const headers = {
  "content-type": "application/json",
};

const ApiendPoints = ApiService.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<ProjectDataType[], void>({
      query: () => ({
        url: "/projects",
      }),
      providesTags: ["Projects"], // USE TO REFTCH PROJECTS IN OUR APP
    }),
    createProjects: build.mutation<ProjectDataType, Partial<ProjectDataType>>({
      query: (prjectInfo) => ({
        url: "/projects/create",
        method: "POST",
        body: prjectInfo,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTask: build.query<TaskDataType[], { projectId: number }>({
      query: ({ projectId }) => ({
        url: `/taskss?projectId=${projectId}`,
      }),
      // This will make only affected task to get refetch not all task make to optimize the code
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    createTasks: build.mutation<TaskDataType, Partial<TaskDataType>>({
      query: (taskInfo) => ({
        url: "/tasks/create",
        method: "POST",
        body: taskInfo,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTasks: build.mutation<
      TaskDataType,
      { taskId: number; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `/tasks/status/?taskId=${taskId}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectsMutation,
  useCreateTasksMutation,
  useGetTaskQuery,
  useUpdateTasksMutation,
} = ApiendPoints;
