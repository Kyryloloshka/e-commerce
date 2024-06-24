import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";

const Breadcrumbs = ({
  items,
}: {
  items: { label: string; href: string }[];
}) => {
  if (items.length === 0) {
    return null;
  }
  const lastItemLabel = items[items.length - 1].label;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <i className="_icon-home text-lg text-dark-5"></i>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items
          .slice(0, items.length - 1)
          .map((item: { label: string; href: string }, index: number) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href} className="text-dark-5">
                  {capitalizeFirstLetter(item.label)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-dark-5">
            {capitalizeFirstLetter(lastItemLabel)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
