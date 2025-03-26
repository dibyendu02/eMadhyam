import { Collection } from "@/commons/types/collection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
// import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchProductsByCategoryId } from "@/store/slices/productSlice";
import {
  fetchColors,
  fetchPlantTypes,
  fetchProductTypes,
} from "@/store/slices/commonSlice";

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const onCollectionCardClick = (collection: Collection) => {
    dispatch(fetchColors());
    dispatch(fetchProductTypes());
    dispatch(fetchPlantTypes());
    dispatch(fetchProductsByCategoryId(collection.id));

    navigate.push(`/collections/${collection.slug}`);
  };

  return (
    <div className="block " onClick={() => onCollectionCardClick(collection)}>
      <div className="group relative flex flex-col">
        {/* Image Container */}
        <div className="relative mb-3 overflow-hidden rounded-full sm:rounded-lg bg-gray-50">
          {/* Use proper aspect ratio container */}
          <div className="h-[100px] w-[100px] md:h-[250px] md:w-[250px] relative">
            <Image
              src={collection.imageUrl}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-300 scale-50 group-hover:scale-75"
              sizes="(max-width: 640px) 100px, 250px"
              priority
            />
          </div>
        </div>
        {/* Title */}
        <div className="text-center w-[100px] sm:w-full">
          <h3 className="text-sm font-medium text-gray-900 sm:text-base">
            {collection.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

interface CollectionsGridProps {
  featured?: boolean;
}

const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  featured = false,
}) => {
  const { items: collections, loading } = useAppSelector(
    (state) => state.categories
  );

  const filteredCollections = featured
    ? collections.filter((c) => c.featured)
    : collections;

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-12 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-12 md:gap-12 overflow-x-auto px-4 md:px-0 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-x-visible">
          {new Array(3).fill(0).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 sm:w-full flex justify-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative mb-3 overflow-hidden rounded-full sm:rounded-lg bg-gray-50">
                  <div className="h-[100px] w-[100px] sm:h-[250px] sm:w-[250px]">
                    <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center w-[100px] sm:w-full">
                  <div className="h-4 w-24 mx-auto bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-3  md:py-12 ">
      {/* Header */}
      <div className=" hidden md:flex items-center justify-between mb-8">
        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl">
          Collections
        </h2>
        {/* <Link
          href="/collections"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          View all
        </Link> */}
      </div>

      {/* Collection Grid */}
      <div className="relative">
        {/* Mobile Scrollable Container */}
        <div className="no-scrollbar -mx-4 flex gap-12 md:gap-12 overflow-x-auto px-4 md:px-0 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-x-visible">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="flex-shrink-0 sm:w-full">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
