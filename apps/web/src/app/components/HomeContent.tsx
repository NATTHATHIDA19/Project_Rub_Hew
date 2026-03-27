"use client";

import { useEffect, useState } from "react";
import FilterChipsAndAdd from "./filterChipsAndAdd";
import { getStoredPosts, type PostType, type StoredPost } from "@/lib/post-store";

type FilterType = "all" | PostType;

const cardTheme: Record<
  PostType,
  {
    shell: string;
    tag: string;
    accent: string;
    action: string;
    image: string;
    label: string;
    actionText: string;
    moreButton: string;
  }
> = {
  carry: {
    shell: "bg-[#DDECF9]",
    tag: "bg-[#A6DBD9]",
    accent: "bg-[#82CEC9]",
    action: "bg-[#83D2CE]",
    image: "from-[#DBDFE4] to-[#787C84]",
    label: "รับหิ้ว",
    actionText: "ยืนยันเสนอ",
    moreButton: "bg-[#83D2CE]",
  },
  request: {
    shell: "bg-[#FFE2D4]",
    tag: "bg-[#FFA56F]",
    accent: "bg-[#F88442]",
    action: "bg-[#F4B18B]",
    image: "from-[#DDDDDD] to-[#7E7E7E]",
    label: "ฝากหิ้ว",
    actionText: "ยืนยันเสนอ",
    moreButton: "bg-[#F4B18B]",
  },
};

const formatDeadline = (value: string) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getAuthorName = (post: StoredPost) => {
  if (post.authorName?.trim()) {
    return post.authorName.trim();
  }

  if (post.contact.trim()) {
    return post.contact.trim().split(/[ @]/)[0];
  }

  return "ผู้ใช้";
};

const getDisplayItems = (post: StoredPost, count = 3) => {
  const category = post.category.trim() || "สินค้า";
  const fallbackTitle = post.title.trim() || `${category} ชิ้นหลัก`;
  const items = [fallbackTitle];

  for (let index = 1; index < count; index += 1) {
    items.push(`${category} ชิ้นที่ ${index}`);
  }

  return items;
};

const getCardRating = (post: StoredPost) =>
  post.type === "carry" ? "★★★★☆" : "★★★☆☆";

type PostCardProps = {
  post: StoredPost;
  onOpen: (post: StoredPost) => void;
};

function PostCard({ post, onOpen }: PostCardProps) {
  const theme = cardTheme[post.type];
  const items = getDisplayItems(post);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(post);
        }
      }}
      className={`overflow-hidden rounded-[2rem] ${theme.shell} cursor-pointer shadow-[4px_6px_0_rgba(0,0,0,0.15)] ring-1 ring-[#D1BDA0] transition hover:-translate-y-1`}
    >
      <div className={`h-10 ${theme.accent}`}>
        <div
          className={`ml-3 mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}
        >
          <span>{post.type === "carry" ? "▣" : "◫"}</span>
          <span>{theme.label}</span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div className="min-w-0">
            <p className="truncate font-thainohead text-lg text-black">
              {getAuthorName(post)}
            </p>
            <p className="font-thainohead text-sm text-black">
              {getCardRating(post)}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-thainohead text-xl text-black">{post.title}</h2>
          <p className="mt-2 line-clamp-3 whitespace-pre-line font-thainohead text-sm text-[#4E4C49]">
            {post.detail}
          </p>
        </div>

        <div className={`h-40 rounded-[1.4rem] bg-gradient-to-br ${theme.image}`} />

        <div className="flex flex-wrap items-center gap-2 font-thainohead text-xs text-[#5A5147]">
          <span className="rounded-full bg-white/70 px-3 py-1">{post.location}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">
            {formatDeadline(post.deadline)}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.category}</span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          {items.map((item, index) => (
            <div key={`${post.id}-${item}-${index}`} className="w-[88px]">
              <div className={`h-[88px] rounded-sm bg-gradient-to-b ${theme.image}`} />
              <p className="mt-2 truncate font-thainohead text-sm text-[#4B4742]">
                {item}
              </p>
              <p className="font-thainohead text-xs text-[#70665A]">{post.budget}</p>
            </div>
          ))}

          <button
            type="button"
            className={`ml-auto rounded-full px-4 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.12)] ${theme.moreButton}`}
          >
            เพิ่มเติม...
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="min-w-[146px] rounded-full bg-[#FFF3EE] px-4 py-2 text-left font-thainohead text-sm text-black"
          >
            แสดงความคิดเห็น
          </button>
          <button
            type="button"
            className="rounded-full bg-white/70 px-4 py-2 font-thainohead text-sm text-black"
          >
            แชร์
          </button>
          <button
            type="button"
            className={`ml-auto rounded-full px-5 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}
          >
            {theme.actionText}
          </button>
        </div>
      </div>
    </article>
  );
}

type ExpandedPostProps = {
  post: StoredPost;
  onClose: () => void;
};

function ExpandedPost({ post, onClose }: ExpandedPostProps) {
  const theme = cardTheme[post.type];
  const items = getDisplayItems(post, 6);

  return (
    <article
      className={`overflow-hidden rounded-[2rem] ${theme.shell} shadow-[4px_6px_0_rgba(0,0,0,0.15)] ring-1 ring-[#D1BDA0]`}
    >
      <div className={`flex items-center justify-between px-3 py-3 ${theme.accent}`}>
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}
        >
          <span>{post.type === "carry" ? "▣" : "◫"}</span>
          <span>{theme.label}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full font-thainohead text-3xl leading-none text-black"
          aria-label="ปิดรายละเอียดโพสต์"
        >
          ×
        </button>
      </div>

      <div className="space-y-6 p-5">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div className="min-w-0">
            <p className="truncate font-thainohead text-xl text-black">
              {getAuthorName(post)}
            </p>
            <p className="font-thainohead text-sm text-black">
              {getCardRating(post)}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-thainohead text-2xl text-black">{post.title}</h2>
          <p className="mt-3 whitespace-pre-line font-thainohead text-sm text-[#4E4C49]">
            {post.detail}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-thainohead text-xs text-[#5A5147]">
          <span className="rounded-full bg-white/70 px-3 py-1">{post.location}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">
            {formatDeadline(post.deadline)}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.category}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.contact}</span>
        </div>

        {post.type === "request" ? (
          <div className={`h-56 rounded-sm bg-gradient-to-br ${theme.image}`} />
        ) : null}

        <div className="flex flex-wrap gap-4">
          {(post.type === "carry" ? items : getDisplayItems(post, 1)).map(
            (item, index) => (
              <div
                key={`${post.id}-expanded-${item}-${index}`}
                className={post.type === "carry" ? "w-[72px]" : "hidden"}
              >
                <div className={`h-[84px] rounded-sm bg-gradient-to-b ${theme.image}`} />
                <p className="mt-2 truncate font-thainohead text-sm text-[#4B4742]">
                  {item}
                </p>
                <p className="font-thainohead text-xs text-[#70665A]">{post.budget}</p>
              </div>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="min-w-[170px] rounded-full bg-[#FFF3EE] px-4 py-2 text-left font-thainohead text-sm text-black"
          >
            แสดงความคิดเห็น
          </button>
          <button
            type="button"
            className="rounded-full bg-white/70 px-4 py-2 font-thainohead text-sm text-black"
          >
            แชร์
          </button>
          <button
            type="button"
            className={`ml-auto rounded-full px-5 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}
          >
            {theme.actionText}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomeContent() {
  const [activeChip, setActiveChip] = useState<FilterType>("all");
  const [posts, setPosts] = useState<StoredPost[]>(() => getStoredPosts());
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const syncPosts = () => {
      setPosts(getStoredPosts());
    };

    window.addEventListener("storage", syncPosts);

    return () => {
      window.removeEventListener("storage", syncPosts);
    };
  }, []);

  const filteredPosts =
    activeChip === "all"
      ? posts
      : posts.filter((post) => post.type === activeChip);

  const selectedPost =
    filteredPosts.find((post) => post.id === selectedPostId) ?? null;

  return (
    <div className="flex-1">
      <FilterChipsAndAdd
        activeChip={activeChip}
        onChipChange={(filter) => {
          setActiveChip(filter);
          setSelectedPostId(null);
        }}
      />

      <section className="p-6">
        {filteredPosts.length === 0 ? (
          <div className="rounded-[2rem] border border-[#D8C7AB] bg-[#FFF4E4] p-10 text-center text-black shadow-[4px_6px_0_rgba(0,0,0,0.12)]">
            <h2 className="font-thainohead text-3xl">ยังไม่มีโพสต์ในหมวดนี้</h2>
            <p className="mt-2 font-thainohead text-lg text-[#645748]">
              กดปุ่ม + เพื่อสร้างโพสต์รับหิ้วหรือฝากหิ้ว แล้วโพสต์จะขึ้นเป็นการ์ดรูปแบบนี้ตรงหน้าแรก
            </p>
          </div>
        ) : selectedPost ? (
          <ExpandedPost
            post={selectedPost}
            onClose={() => setSelectedPostId(null)}
          />
        ) : (
          <div className="grid gap-7 xl:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onOpen={(currentPost) => setSelectedPostId(currentPost.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
