"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import {
  UserPlus,
  Mail,
  Phone,
  Building2,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

import { useCreateStaff } from "@/hooks/admin.hook";

import { ICreateStaffResponse } from "@/types/admin.type";
import { createStaffSchema } from "@/validation/admin-validation";
import SectionHeader from "@/components/shared/section-header";

export const DEPARTMENTS = [
  { value: "ROAD_REPAIR", label: "Road Repair" },
  { value: "DRAINAGE_AND_SEWERAGE", label: "Drainage & Sewerage" },
  { value: "WASTE_MANAGEMENT", label: "Waste Management" },
  { value: "PARK_AND_TREE_TRIMMING", label: "Park & Tree Trimming" },
  { value: "STREET_LIGHTING", label: "Street Lighting" },
];

export default function CreateStaffPage() {
  const [createdStaff, setCreatedStaff] = useState<
    ICreateStaffResponse["data"] | null
  >(null);

  const { mutate: createStaff, isPending } = useCreateStaff();

  // TanStack Form Hook Configuration
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      department: "",
      designation: "",
      qualification: "",
    },
    onSubmit: async ({ value }) => {
      // Zod Validation Check
      const result = createStaffSchema.safeParse(value);
      if (!result.success) {
        toast.error("Validation Error", {
          description:
            result.error.issues[0]?.message || "Please check your inputs.",
        });
        return;
      }

      createStaff(value, {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error("Staff Creation Failed", {
              description: res?.message || "Could not register staff member.",
            });
            return;
          }

          toast.success("Staff Account Created!", {
            description:
              res?.message || `${value.name} has been added as official staff.`,
          });

          if (res?.data) {
            setCreatedStaff(res.data);
          }

          form.reset();
        },
        onError: (err: any) => {
          toast.error("Creation Error", {
            description:
              err?.data?.message || err?.message || "Something went wrong.",
          });
        },
      });
    },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <SectionHeader
        title={
          <>
            Create Staff <span className="text-blue-400">Account</span>
          </>
        }
        description=" Register new departmental staff members to handle citizen service requests."
      />

      {/* Main Content */}
      <Card className="shadow-sm border mt-12">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base font-bold text-slate-800">
            {createdStaff ? "Staff Registration Summary" : "Staff Details Form"}
          </CardTitle>
          <CardDescription className="text-xs">
            {createdStaff
              ? "The staff account has been successfully created and a welcome email was dispatched."
              : "Enter the professional details below to onboard a new municipal staff member."}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {createdStaff ? (
            /* Success Summary Card UI */
            <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-5 text-center">
              <div className="size-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="size-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg">
                  Staff Account Created!
                </h3>
                <p className="text-xs text-slate-600">
                  Welcome email with credentials was sent to{" "}
                  <span className="font-semibold">{createdStaff.email}</span>.
                </p>
              </div>

              {/* Response Details Box */}
              <div className="bg-white p-5 rounded-xl border border-emerald-100 text-left space-y-3 text-xs text-slate-700 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Full Name
                    </span>
                    <span className="font-semibold text-slate-900">
                      {createdStaff.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Email Address
                    </span>
                    <span className="font-semibold text-slate-900">
                      {createdStaff.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Role
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {createdStaff.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Department
                    </span>
                    <span className="font-semibold text-amber-700">
                      {createdStaff.staffProfile?.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Designation
                    </span>
                    <span className="font-semibold text-slate-900">
                      {createdStaff.staffProfile?.designation || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      Qualification
                    </span>
                    <span className="font-semibold text-slate-900">
                      {createdStaff.staffProfile?.qualification || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setCreatedStaff(null)}
                variant="outline"
                className="bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 font-medium text-xs px-5 h-9"
              >
                <RotateCcw className="size-3.5 mr-2" /> Add Another Staff
              </Button>
            </div>
          ) : (
            /* Create Staff Form - Integrated with TanStack Form */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Field */}
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      const res = createStaffSchema.shape.name.safeParse(value);
                      return !res.success
                        ? res.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Full Name *
                      </Label>
                      <div className="relative">
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. Nasir"
                          className="h-10 text-xs pl-9"
                        />
                        <ShieldCheck className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[11px] text-rose-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Email Address Field */}
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const res =
                        createStaffSchema.shape.email.safeParse(value);
                      return !res.success
                        ? res.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Official Email *
                      </Label>
                      <div className="relative">
                        <Input
                          type="email"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="nasir2001b+staff2@gmail.com"
                          className="h-10 text-xs pl-9"
                        />
                        <Mail className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[11px] text-rose-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Phone Number Field */}
                <form.Field
                  name="phoneNumber"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return undefined;
                      const res =
                        createStaffSchema.shape.phoneNumber.safeParse(value);
                      return !res.success
                        ? res.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Phone Number (Bangladeshi)
                      </Label>
                      <div className="relative">
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="0132151520"
                          className="h-10 text-xs pl-9"
                        />
                        <Phone className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[11px] text-rose-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Department Field */}
                <form.Field
                  name="department"
                  validators={{
                    onChange: ({ value }) => {
                      const res =
                        createStaffSchema.shape.department.safeParse(value);
                      return !res.success
                        ? res.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Department *
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                      >
                        <SelectTrigger className="h-10 text-xs">
                          <div className="flex items-center gap-2">
                            <Building2 className="size-4 text-slate-400 shrink-0" />
                            <SelectValue placeholder="Select Department" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem
                              key={dept.value}
                              value={dept.value}
                              className="text-xs"
                            >
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[11px] text-rose-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Designation Field */}
                <form.Field name="designation">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Designation
                      </Label>
                      <div className="relative">
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. ST ROAD_REPAIR"
                          className="h-10 text-xs pl-9"
                        />
                        <Briefcase className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}
                </form.Field>

                {/* Qualification Field */}
                <form.Field name="qualification">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-700">
                        Qualification
                      </Label>
                      <div className="relative">
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. BBS"
                          className="h-10 text-xs pl-9"
                        />
                        <GraduationCap className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-10 px-6 font-medium"
                >
                  {isPending ? (
                    <>
                      <Spinner /> Creating Staff...
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4 mr-2" /> Create Staff Member
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
