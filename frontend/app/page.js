import RequirementForm from "../components/RequirementForm";

export const metadata = {
  title: "EventHire - Connect with Event Professionals",
  description: "Post your event requirements and hire professional event planners, performers, and crew",
};

export default function Home() {
  return (
    <main>
      <RequirementForm />
    </main>
  );
}
