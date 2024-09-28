import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};
export const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href =
      "/" +
      pathSegments
        .slice(0, index + 1)
        .map((seg) => {
          const isDynamic = seg.startsWith("[") && seg.endsWith("]");
          const dynamicPartKey = seg.slice(1, -1);
          return isDynamic && query[dynamicPartKey]
            ? query[dynamicPartKey]
            : seg;
        })
        .join("/");

    const getCorrectSegment = () => {
      if (segment === "[noteId]") {
        return "Note";
      }

      if (segment === "[quizId]") {
        return "Quiz";
      }

      const formattedSegment = segment.replace(/-/g, " ");

      return (
        formattedSegment.charAt(0).toUpperCase() + formattedSegment.slice(1)
      );
    };

    const isLast = index === pathSegments.length - 1;

    return (
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage className="text-foreground">
            {getCorrectSegment()}
          </BreadcrumbPage>
        ) : (
          <>
            <Link href={href}>
              <BreadcrumbLink>{getCorrectSegment()}</BreadcrumbLink>
            </Link>
            <BreadcrumbSeparator />
          </>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <div className="max-w-4xl m-auto p-10">
      <div className="my-10">
        <h1 className="text-2xl font-bold">GPT Teacher</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            {pathSegments.length > 0 && <BreadcrumbSeparator />}
            {breadcrumbs}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="my-10">{children}</div>
    </div>
  );
};
