import ProfileCard from "@/components/shared/ProfileCard";


const ProfilePage = () => {
  return (
    <section className="container mt-[-20] mx-auto px-4 py-10 min-h-screen">
    
      {/* 🚀 Render the client component safely inside server core */}
      <ProfileCard />
    </section>
  );
};

export default ProfilePage;