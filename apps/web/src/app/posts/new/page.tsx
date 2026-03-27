import NavbarMain from "@/app/components/navbarMain";
import CreatePostForm from "@/app/components/CreatePostForm";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-[#FFF8EC]">
      <NavbarMain />
      <CreatePostForm />
    </main>
  );
}
