"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createId } from "@/lib/id";
import { savePost, type PostType } from "@/lib/post-store";

type FormState = {
  title: string;
  detail: string;
  location: string;
  deadline: string;
  budget: string;
  category: string;
  contact: string;
};

const contentByType: Record<
  PostType,
  {
    heading: string;
    description: string;
    budgetLabel: string;
    detailPlaceholder: string;
  }
> = {
  carry: {
    heading: "สร้างโพสต์รับหิ้ว",
    description:
      "ลงรายละเอียดการเดินทางหรือพื้นที่ที่คุณรับหิ้ว เพื่อให้คนอื่นฝากซื้อของได้ง่ายขึ้น",
    budgetLabel: "ค่าหิ้ว / เรทราคา",
    detailPlaceholder:
      "เช่น เดินทางไปญี่ปุ่นวันที่ 15 เม.ย. รับหิ้วเครื่องสำอาง ขนม และของฝากน้ำหนักไม่มาก",
  },
  request: {
    heading: "สร้างโพสต์ฝากหิ้ว",
    description:
      "บอกของที่อยากฝากหิ้วให้ชัดเจน เพื่อให้คนรับหิ้วติดต่อกลับได้เร็ว",
    budgetLabel: "งบประมาณ",
    detailPlaceholder:
      "เช่น อยากฝากซื้อสกินแคร์จากเกาหลี ขอของแท้จากช็อปและพร้อมจ่ายค่าหิ้วเพิ่ม",
  },
};

const initialState: FormState = {
  title: "",
  detail: "",
  location: "",
  deadline: "",
  budget: "",
  category: "",
  contact: "",
};

export default function CreatePostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const postType: PostType = requestedType === "request" ? "request" : "carry";
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const content = useMemo(() => contentByType[postType], [postType]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = window.localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const hasEmptyField = Object.values(form).some((value) => !value.trim());
    if (hasEmptyField) {
      setError("กรอกข้อมูลให้ครบก่อนสร้างโพสต์");
      return;
    }

    savePost({
      id: createId(),
      type: postType,
      authorName: form.contact.trim().split(/[ @]/)[0] || "ผู้ใช้",
      title: form.title.trim(),
      detail: form.detail.trim(),
      location: form.location.trim(),
      deadline: form.deadline.trim(),
      budget: form.budget.trim(),
      category: form.category.trim(),
      contact: form.contact.trim(),
      createdAt: new Date().toISOString(),
    });

    router.push("/");
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <div className="mb-6">
          <Link href="/" className="font-thainohead text-[#2F4363]">
            กลับหน้าแรก
          </Link>
          <h1 className="mt-3 font-thainohead text-4xl text-black">
            {content.heading}
          </h1>
          <p className="mt-2 font-thainohead text-lg text-[#5F5243]">
            {content.description}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-thainohead text-lg text-black">
              หัวข้อโพสต์
            </label>
            <input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
              placeholder="ตั้งชื่อโพสต์สั้น ๆ ให้เข้าใจง่าย"
            />
          </div>

          <div>
            <label className="mb-2 block font-thainohead text-lg text-black">
              รายละเอียด
            </label>
            <textarea
              value={form.detail}
              onChange={(event) =>
                setForm((current) => ({ ...current, detail: event.target.value }))
              }
              className="min-h-32 w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
              placeholder={content.detailPlaceholder}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-thainohead text-lg text-black">
                สถานที่ / ปลายทาง
              </label>
              <input
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({ ...current, location: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
                placeholder="เช่น ญี่ปุ่น, MBK, สยาม"
              />
            </div>

            <div>
              <label className="mb-2 block font-thainohead text-lg text-black">
                วันเดินทาง / วันต้องการของ
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(event) =>
                  setForm((current) => ({ ...current, deadline: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-thainohead text-lg text-black">
                {content.budgetLabel}
              </label>
              <input
                value={form.budget}
                onChange={(event) =>
                  setForm((current) => ({ ...current, budget: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
                placeholder="เช่น 200 บาท หรือไม่เกิน 3,000 บาท"
              />
            </div>

            <div>
              <label className="mb-2 block font-thainohead text-lg text-black">
                หมวดหมู่
              </label>
              <input
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
                placeholder="เช่น เครื่องสำอาง, ของสะสม, อาหาร"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-thainohead text-lg text-black">
              ช่องทางติดต่อ
            </label>
            <input
              value={form.contact}
              onChange={(event) =>
                setForm((current) => ({ ...current, contact: event.target.value }))
              }
              className="w-full rounded-2xl border border-[#D7C39D] px-4 py-3 text-black outline-none"
              placeholder="เช่น Line ID, เบอร์โทร, IG"
            />
          </div>

          {error && <p className="font-thainohead text-red-600">{error}</p>}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-[#2F4363] px-6 py-3 font-thainohead text-lg text-white"
            >
              สร้างโพสต์
            </button>
            <Link
              href="/"
              className="rounded-full bg-[#D7C39D] px-6 py-3 text-center font-thainohead text-lg text-black"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
