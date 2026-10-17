import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  XCircle,
  UserCheck,
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
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "RESOLVED":
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-blue-400 text-white font-bold text-xs ">
            {status === "RESOLVED" ? "Resolved" : "Accepted"}
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-bold bg-blue-500/10 text-blue-700 border border-blue-500/20">
            In Progress
          </span>
        );
      case "ASSIGNED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs bg-secondary">
            <UserCheck className="size-3 text-purple-600" /> Assigned
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs bg-primary">
            <Clock className="size-3 text-amber-600" /> Pending
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 border border-rose-500/20">
            <XCircle className="size-3 text-rose-600" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-700 border border-gray-500/20">
            <AlertCircle className="size-3" /> {status}
          </span>
        );
    }
  };

  const { data: userResponse } = useGetMe();
  const user = userResponse?.data;

  const hasImages = complaint.images && complaint.images.length > 0;
  const isEditable = complaint.status === "PENDING";

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      <div className="space-y-4">
        {/* Top Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {complaint.category?.name && (
              <span className="text-sm font-bold py-1">
                {complaint.category.name}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {complaint.priority && (
              <span className=" text-xs font-bold text-black  px-2.5 py-1 bg-primary rounded-sm uppercase ">
                {complaint.priority}
              </span>
            )}
            {getStatusBadge(complaint.status)}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-emerald-600 transition-colors tracking-tight">
            {complaint.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {complaint.description}
          </p>
        </div>

        {/* Image Section with Premium Gradient Overlay */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border/60 bg-muted/30 shadow-inner">
          <Image
            src={hasImages ? complaint.images[0] : "/logo.jpg"}
            alt={complaint.title}
            fill
            className={
              hasImages
                ? "object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                : "object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            }
          />
          {hasImages && complaint.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md border border-white/10">
              <ImageIcon className="size-3 text-emerald-400" />
              <span>+{complaint.images.length - 1} more</span>
            </div>
          )}
        </div>

        {/* Citizen & Payment Info */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
          {complaint.citizen?.name && (
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <User className="size-3 text-emerald-600" />
              </div>
              {user?.name === complaint.citizen.name ? (
                <span className="font-bold text-blue-700 bg-blue-500/10 px-2.5 py-0.5 rounded-full text-[11px] border border-blue-500/20">
                  You
                </span>
              ) : (
                <span className="font-medium text-foreground truncate max-w-[120px]">
                  {complaint.citizen.name}
                </span>
              )}
            </div>
          )}

          {complaint.category?.type === "PAID" && (
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                complaint.isPaid
                  ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-700 border-rose-500/20"
              }`}
            >
              {complaint.isPaid ? "Paid" : "Unpaid"} (৳{complaint.totalAmount})
            </span>
          )}
        </div>
      </div>

      {/* Footer Info: Address & Date */}
      <div className="mt-4 pt-3 border-t border-border/60 flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          {complaint.address && (
            <div className="flex items-center gap-1.5 truncate max-w-[170px]">
              <MapPin className="size-3.5 text-rose-500 shrink-0" />
              <span
                className="truncate font-medium text-foreground/80"
                title={complaint.address}
              >
                {complaint.address}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 shrink-0 ml-auto font-medium">
            <Calendar className="size-3.5 text-emerald-600" />
            <span>
              {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
            {isEditable ? (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-7 text-xs rounded-lg border-border/80 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(e, complaint.id);
                }}
              >
                <Edit2 className="size-3" /> Edit
              </Button>
            ) : (
              <span className="text-[10px] text-muted-foreground italic mr-auto">
                Read-only
              </span>
            )}

            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting || !isEditable}
              className="gap-1.5 h-7 text-xs rounded-lg bg-rose-600/90 hover:bg-rose-700 shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(e, complaint.id);
              }}
            >
              <Trash2 className="size-3" /> Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
