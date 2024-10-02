import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogBox from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import { DateData } from "@/utils";
import { useCreateProjectsMutation } from "@/redux/endpoints";

type ModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialValues = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};

const MoadalNewProject = ({ isOpen, onClose }: ModelProps) => {
  const date = DateData();
  const [CreateNewProject, { isLoading }] = useCreateProjectsMutation();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const resp = await CreateNewProject(values);
      console.log("🚀 ~ onSubmit:async ~ resp:", resp);
      toast("Project has been created", {
        description: `${date.formattedDate} at ${date.formattedTime}`,
      });
      onClose();
    },
  });

  return (
    <DialogBox isOpen={isOpen} onClose={onClose}>
      <DialogContent className="bg-secondary-200">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            {/* PROJECT FORM */}
            <form onSubmit={formik.handleSubmit} className="space-y-6 py-4">
              {/* Project Title */}
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border bg-secondary-100 px-3 py-2 text-lg placeholder:text-lg placeholder:text-dark-bg"
                placeholder="Project Title....."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {/* Project Description */}
              <Textarea
                id="description"
                name="description"
                placeholder="Project Description....."
                className="w-full rounded-md border bg-secondary-100 px-3 py-2 text-lg placeholder:text-lg placeholder:text-dark-bg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {/* Project Dates */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="rounded-md border bg-secondary-100 px-3 py-2 text-lg placeholder:text-lg placeholder:text-dark-bg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="rounded-md border bg-secondary-100 px-3 py-2 text-lg placeholder:text-lg placeholder:text-dark-bg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue !p-6 text-xl text-white"
                disabled={formik.isSubmitting}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </DialogBox>
  );
};

export default MoadalNewProject;
