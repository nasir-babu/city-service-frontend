"use client";

import Image from "next/image";
import {
  MapPin,
  Calendar,
  AlertCircle,
  User,
  XCircle,
  ImageIcon,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  IServiceRequestUI,
  RequestStatus,
} from "@/types/services-request.type";
import { useGetMe } from "@/hooks/auth.hook";

interface ComplaintCardProps {
  complaint: IServiceRequestUI;
  onClick?: () => void;
  showActions?: boolean;
  onEdit?: (e: React.MouseEvent, id: string) => void;
  onDelete?: (e: React.MouseEvent, id: string) => void;
  isDeleting?: boolean;
}

export function ComplaintCard({
  complaint,
  onClick,
  showActions = false,
  onEdit,
  onDelete,
  isDeleting,
}: ComplaintCardProps) {
  const { data: userResponse } = useGetMe();
  const user = userResponse?.data;

  const hasImages = complaint.images && complaint.images.length > 0;
  const isEditable = complaint.status === "PENDING";

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "RESOLVED":
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white font-semibold text-xs shadow-md backdrop-blur-md">
            <span className="size-2 rounded-full bg-white animate-pulse" />
            {status === "RESOLVED" ? "Resolved" : "Accepted"}
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/90 text-white font-semibold text-xs shadow-md backdrop-blur-md">
            <span className="size-2 rounded-full bg-white" />
            In Progress
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 text-white font-semibold text-xs shadow-md backdrop-blur-md">
            <span className="size-2 rounded-full bg-white" />
            Pending
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/90 text-white font-semibold text-xs shadow-md backdrop-blur-md">
            <XCircle className="size-3.5" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-700/90 text-white font-semibold text-xs shadow-md backdrop-blur-md">
            <AlertCircle className="size-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-2.5  transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 cursor-pointer overflow-hidden dark:bg-card dark:border-border"
    >
      <div>
        {/* Image Container */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100 dark:bg-muted">
          <Image
            src={hasImages ? complaint.images[0] : "/logo.jpg"}
            alt={complaint.title}
            fill
            className={
              hasImages
                ? "object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                : "object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
            }
          />

          <div className="absolute top-3 left-3 z-10">
            {getStatusBadge(complaint.status)}
          </div>

          {/* Priority Tag */}
          {complaint.priority && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase">
                {complaint.priority}
              </span>
            </div>
          )}

          {hasImages && complaint.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/20">
              <ImageIcon className="size-3.5 text-emerald-400" />
              <span>+{complaint.images.length - 1}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="pt-3 space-y-2">
          <div className="flex items-center justify-between">
            {complaint.category?.name && (
              <span className="font-bold tracking-wider uppercase py-1 text-[11px] text-emerald-600">
                {complaint.category.name}
              </span>
            )}

            {complaint.category?.type === "PAID" && (
              <span
                className={`font-extrabold text-xs px-2.5 py-1 rounded-md ${
                  complaint.isPaid
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {complaint.totalAmount}
              </span>
            )}
          </div>

          <h3 className="font-semibold group-hover:text-emerald-600 transition-colors line-clamp-1 max-w-[300px]">
            {complaint.title}
          </h3>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5 dark:border-border">
        {/* Address */}
        <div className="flex items-center justify-between text-xs">
          {complaint.address ? (
            <div
              className="flex items-center gap-1.5 truncate max-w-[300px]"
              title={complaint.address}
            >
              <MapPin className="size-4 text-rose-500 shrink-0" />
              <span className="truncate text-slate-700 dark:text-slate-300">
                {complaint.address}
              </span>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 font-semibold text-slate-500 dark:text-slate-400">
          <Calendar className="size-4 text-slate-400" />
          <span>
            {new Date(complaint.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Posted By Box - Made Pure White with Clean Border */}
        {complaint.citizen?.name && (
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-2xs dark:bg-card dark:border-border">
            <span className="text-[11px] font-semibold  pl-1">Posted by</span>
            <div className="flex items-center gap-1.5">
              <div className="size-6 rounded-full flex items-center justify-center">
                <User className="size-3.5 text-emerald-700" />
              </div>
              {user?.name === complaint.citizen.name ? (
                <span className="font-bold text-blue-600 text-xs pr-1">
                  You
                </span>
              ) : (
                <span className="font-bold text-xs pr-1 truncate max-w-[120px] dark:text-slate-200">
                  {complaint.citizen.name}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-end gap-2 pt-2">
            {isEditable ? (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(e, complaint.id);
                }}
              >
                <Edit2 className="size-3.5" /> Edit
              </Button>
            ) : (
              <span className="text-[10px] text-slate-400 italic mr-auto">
                Read-only
              </span>
            )}

            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting || !isEditable}
              className="gap-1.5 h-8 text-xs rounded-lg hover:bg-rose-700 shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(e, complaint.id);
              }}
            >
              <Trash2 className="size-3.5" /> Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
