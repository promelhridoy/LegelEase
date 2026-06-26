import LawyerDetails from "@/components/shared/LawyerDetails";


const LawyerDetailsPage =async  ({ params }) => {
    const { id } = await params;
    
  return (
    <div className="mt-[-20]">
      <LawyerDetails id={id} />
    </div>
  );

};

export default LawyerDetailsPage;