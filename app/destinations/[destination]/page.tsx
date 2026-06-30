import DestinationDetailPage from "@/components/sections/DestinationDetailPage";

interface PageProps {
  params: Promise<{
    destination: string;
  }>;
}

export default function DestinationPage({ params }: PageProps) {
  return <DestinationDetailPage params={params} />;
}
