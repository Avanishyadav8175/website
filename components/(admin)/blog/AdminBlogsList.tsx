"use client";
import { useEffect, useState } from "react";
import { AdminPanelHeading } from "../_ui/AdminTypography";
import AdminBlogsForm from "./AdminBlogsForm";
import { useDispatch, useSelector } from "@/store/withType";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";

export default function AdminBlogsList() {
  const [showBlogForm, setShowBlogForm] = useState<boolean>(false);

  const dispatch = useDispatch();

  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector(selectContent.documentList);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  return (
    <div className="flex flex-col justify-start">
      <AdminPanelHeading title="Blogs" />

      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="rounded-2xl shadow-md bg-ivory-1 p-7 grid place-items-center gap-2.5 border"
            key={index}
          >
            <div
              onClick={() => setShowBlogForm((prev) => true)}
              className="rounded-full p-3.5 bg-ash/40 transition-all duration-300 cursor-pointer hover:bg-ash/60"
            >
              Add Blog
            </div>
          </div>
        ))}
      </div>

      <AdminBlogsForm
        open={showBlogForm}
        images={[]}
        contents={contents}
        toggleEditing={() => {}}
        onOpenChange={() => setShowBlogForm((prev) => !prev)}
        isEditing={false}
      />
    </div>
  );
}
