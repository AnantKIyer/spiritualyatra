import PackageDetailPage from "@/components/sections/PackageDetailPage";

interface PageProps {
  params: Promise<{
    package: string;
  }>;
}

export default function PackagePage({ params }: PageProps) {
  return <PackageDetailPage params={params} />;
}
