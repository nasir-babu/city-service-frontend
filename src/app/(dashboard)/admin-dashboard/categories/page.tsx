"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Tag,
  Layers,
  Banknote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import {
  useGetAllCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/category.hook";
import { ICategory } from "@/types/category.type";
import {
  createCategorySchema,
  ICreateCategoryFormValues,
} from "@/validation/category.validation";
import { CategoryCardSkeleton } from "@/components/dashboard/category-skeleton";
import SectionHeader from "@/components/shared/section-header";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categoriesResponse, isLoading } = useGetAllCategories({
    name: searchTerm || undefined,
  });

  const categories: ICategory[] = categoriesResponse?.data || [];

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [viewingCategory, setViewingCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<ICreateCategoryFormValues>({
    name: "",
    description: "",
    type: "",
    unitName: "",
    basePrice: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      unitName: "",
      basePrice: 0,
    });
    setErrors({});
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (category: ICategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || "",
      description: category.description || "",
      type: category.type || "",
      unitName: category.unitName || "",
      basePrice: category.basePrice || 0,
    });
    setErrors({});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = createCategorySchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (editingCategory) {
      updateCategory(
        { id: editingCategory.id, payload: formData },
        {
          onSuccess: (res: any) => {
            if (!res?.success) {
              toast.error("Update failed", { description: res?.message });
              return;
            }
            toast.success("Category updated successfully!");
            setEditingCategory(null);
          },
          onError: (err: any) => {
            toast.error("Update failed", { description: err?.message });
          },
        },
      );
    } else {
      createCategory(formData, {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error("Creation failed", { description: res?.message });
            return;
          }
          toast.success("Category created successfully!");
          setIsCreateOpen(false);
        },
        onError: (err: any) => {
          toast.error("Creation failed", { description: err?.message });
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory(id, {
      onSuccess: (res: any) => {
        if (!res?.success) {
          toast.error("Delete failed", { description: res?.message });
          return;
        }
        toast.success("Category deleted successfully!");
        setDeletingId(null);
      },
      onError: (err: any) => {
        toast.error("Delete failed", { description: err?.message });
      },
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <SectionHeader
        title={
          <>
            Categories<span className="text-blue-400"> Management</span>
          </>
        }
        description="Create, update, and manage civic service categories. "
      />

      {/* Search Bar ‍and Add Button */}
      <Card className="shadow-sm mt-10">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="relative w-full max-w-xs md:w-80 lg:w-96">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search category by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs h-9 w-full"
            />
          </div>

          <Button
            onClick={handleOpenCreate}
            className="gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs whitespace-nowrap"
          >
            <Plus className="size-4" /> Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Categories Grid / Table */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
          <CategoryCardSkeleton />
        </div>
      ) : categories.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-2">
            <Tag className="size-8 mx-auto text-slate-400" />
            <p className="text-sm font-semibold text-slate-700">
              No categories found
            </p>
            <p className="text-xs text-slate-500">
              Add a new category to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-md transition-shadow border"
            >
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-primary ">
                    {category.name}
                  </CardTitle>
                  {category.type && (
                    <Badge
                      variant="outline"
                      className="mt-1 text-[10px] bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Type: {category.type}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 text-slate-500 hover:text-slate-800"
                    onClick={() => setViewingCategory(category)}
                  >
                    <Eye className="size-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 text-indigo-600 hover:text-indigo-800"
                    onClick={() => handleOpenEdit(category)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 text-rose-600 hover:text-rose-800"
                    onClick={() => setDeletingId(category.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600">
                <p className="line-clamp-2 leading-relaxed text-slate-500">
                  {category.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between pt-2 border-t text-[11px] font-medium text-slate-700">
                  <span>Unit: {category.unitName || "N/A"}</span>
                  <span className="text-emerald-600 font-bold">
                    {category.basePrice ? `$${category.basePrice}` : "Free"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Category Modal */}
      <Dialog
        open={isCreateOpen || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingCategory(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Category Name *</Label>
              <Input
                placeholder="e.g. Tree Cutting Service"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-9 text-xs"
              />
              {errors.name && (
                <p className="text-[11px] text-rose-500">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Type (Optional)</Label>
                <Input
                  placeholder="e.g. 500 or PAID"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Unit Name</Label>
                <Input
                  placeholder="e.g. Per Tree"
                  value={formData.unitName}
                  onChange={(e) =>
                    setFormData({ ...formData, unitName: e.target.value })
                  }
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Base Price ($)</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basePrice: Number(e.target.value),
                  })
                }
                className="h-9 text-xs"
              />
              {errors.basePrice && (
                <p className="text-[11px] text-rose-500">{errors.basePrice}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                placeholder="Enter category description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="text-xs resize-none"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingCategory(null);
                }}
                className="text-xs h-9"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-9"
              >
                {isCreating || isUpdating ? (
                  <Spinner />
                ) : editingCategory ? (
                  "Update Category"
                ) : (
                  "Create Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog
        open={!!viewingCategory}
        onOpenChange={() => setViewingCategory(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          {viewingCategory && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {viewingCategory.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ID: {viewingCategory.id}
                  </p>
                </div>
                <Badge className="bg-amber-500 text-white">
                  {viewingCategory.type || "N/A"}
                </Badge>
              </div>

              <div className="space-y-2 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">
                    Description:
                  </span>{" "}
                  {viewingCategory.description || "No description provided."}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <div>
                    <span className="text-slate-500 block">Unit Name</span>
                    <span className="font-semibold text-slate-800">
                      {viewingCategory.unitName || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Base Price</span>
                    <span className="font-semibold text-emerald-600">
                      {viewingCategory.basePrice
                        ? `$${viewingCategory.basePrice}`
                        : "Free"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-600">
            This action cannot be undone. This will permanently delete the
            category.
          </p>
          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeletingId(null)}
              className="text-xs h-9"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => deletingId && handleDelete(deletingId)}
              className="text-xs h-9"
            >
              {isDeleting ? <Spinner /> : "Delete Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
