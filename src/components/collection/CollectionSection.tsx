import React from "react";
import Link from "next/link";
import { Collection } from "@/commons/types/collection";
import Image from "next/image";

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <Link href={`/collections/${collection.slug}`} className="block">
      <div className="group relative flex flex-col">
        {/* Image Container */}
        <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-50">
          <div className="aspect-[4/5] w-full sm:aspect-square">
            <Image
              src={collection.imageUrl}
              alt={collection.title}
              height={400}
              width={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </div>
        {/* Title */}
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-900 sm:text-base">
            {collection.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

interface CollectionsGridProps {
  collections: Collection[];
  featured?: boolean;
}

const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  featured = false,
}) => {
  const filteredCollections = featured
    ? collections.filter((c) => c.featured)
    : collections;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl">
          Collections
        </h2>
        <Link
          href="/collections"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          View all
        </Link>
      </div>

      {/* Collection Grid */}
      <div className="relative">
        {/* Mobile Scrollable Container */}
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-x-visible">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="w-48 flex-shrink-0 sm:w-full">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
