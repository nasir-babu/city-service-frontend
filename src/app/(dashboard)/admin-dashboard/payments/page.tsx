"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  CreditCard,
  Search,
  RefreshCw,
  Calendar,
  ArrowUpDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { useGetAllPayments } from "@/hooks/payment.hook";
import { PaymentStatus } from "@/types/payment.type";
import SectionHeader from "@/components/shared/section-header";

export default function AdminPaymentsPage() {
  const { data, isLoading, isError, refetch } = useGetAllPayments();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const payments = data?.data || [];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.transactionId
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.serviceRequest?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200">
            PAID
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200">
            PENDING
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-200">
            FAILED
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200">
            CANCELLED
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <SectionHeader
        title={
          <>
            Payment <span className="text-blue-400">Transactions</span>
          </>
        }
        description="Monitor all citizen payment receipts, transaction IDs, and request fees."
      />

      {/* Main Table Card */}
      <Card className="shadow-sm border mt-12 ">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 ">
            <div>
              <CardTitle className="text-base font-primary font-bold text-slate-800  dark:text-white">
                Payment Logs ({filteredPayments.length})
              </CardTitle>
              <CardDescription className="text-xs">
                Complete overview of payment transactions in the portal.
              </CardDescription>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search txID, user, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-xs pl-8 bg-white"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="text-xs h-9 border-slate-200"
              >
                <RefreshCw className="size-3.5 mr-2" /> Refresh
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
              <Spinner className="size-6 text-indigo-600" />
              <p className="text-xs text-slate-500">Loading payments data...</p>
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-rose-500 text-xs">
              Failed to load payments. Please try again.
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No payment transactions found.
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/80 dark:bg-gray-800">
                <TableRow>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    TRANSACTION ID
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    CITIZEN
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    SERVICE REQUEST
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    AMOUNT
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    STATUS
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 dark:text-white">
                    DATE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono truncate max-w-2 text-xs font-semibold text-indigo-600">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-800 dark:text-white">
                          {payment.user?.name || "N/A"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {payment.user?.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs dark:text-slate-500 text-slate-700">
                      {payment.serviceRequest?.title || "N/A"}
                    </TableCell>
                    <TableCell className="font-semibold text-xs text-slate-900">
                      ৳{payment.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-[11px] text-slate-500">
                      {payment.createdAt
                        ? format(
                            new Date(payment.createdAt),
                            "MMM dd, yyyy - hh:mm a",
                          )
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
