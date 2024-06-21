"use client";
import { useParams } from "next/navigation";
import React from "react";

const Category = () => {
  const { category } = useParams();
  return <div>Category</div>;
};

export default Category;
