import { Link as LinkType } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, MousePointerClick } from "lucide-react";
import { EditLinkDialog } from "@/app/dashboard/components/edit-link-dialog";
import { DeleteLinkDialog } from "@/app/dashboard/components/delete-link-dialog";
import { CopyLinkButton } from "@/components/copy-link-button";
import { formatRelativeDate } from "@/lib/utils";

interface LinksListProps {
  links: LinkType[];
}

export function LinksList({ links }: LinksListProps) {
  if (links.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No links yet</p>
          <p className="text-sm text-muted-foreground">
            Create your first shortened link to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <Card key={link.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base">
                  {link.title || link.shortCode}
                </CardTitle>
                <CardDescription className="mt-1 truncate">
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {link.originalUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MousePointerClick className="h-4 w-4" />
                <span>{link.clicks}</span>
              </div>
              <div className="flex items-center">
                <EditLinkDialog link={link} />
                <DeleteLinkDialog link={link} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <code className="rounded bg-muted px-2 py-1">
                  /l/{link.shortCode}
                </code>
                <CopyLinkButton shortCode={link.shortCode} />
              </div>
              <span className="text-muted-foreground">
                {formatRelativeDate(new Date(link.createdAt))}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
