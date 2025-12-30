import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserIdPaginated } from "@/data/queries/links";
import { LinksList } from "@/components/links-list";
import { Pagination } from "@/components/pagination";

interface DashboardPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));

  const { links, pagination } = await getLinksByUserIdPaginated(
    userId,
    currentPage,
    5
  );

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <p className="text-muted-foreground">
          {pagination.totalCount} link{pagination.totalCount !== 1 ? "s" : ""}{" "}
          total
        </p>
      </div>

      <LinksList links={links} />

      <div className="mt-6">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
        />
      </div>
    </div>
  );
}
