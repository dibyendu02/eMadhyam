import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import HtmlContent from "./HTMLContent"; // Import the HtmlContent component

interface TabContentProps {
  content: React.ReactNode;
  isActive: boolean;
}

interface ProductSpec {
  label: string;
  value: string;
}

const TabContent: React.FC<TabContentProps> = ({ content, isActive }) => {
  if (!isActive) return null;
  return <div className="p-6 bg-white rounded-b-lg ">{content}</div>;
};

const TabbedInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("description");
  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional Information" },
    // { id: "review", label: "Review" },
    { id: "faq", label: "FAQ" },
  ] as const;

  const getProductSpecs = () => {
    const tempProductSpecs: ProductSpec[] = [];
    if (currentProduct?.weight != undefined && currentProduct?.weight != null) {
      tempProductSpecs.push({ label: "Weight", value: currentProduct?.weight });
    }
    if (
      currentProduct?.dimensions != undefined &&
      currentProduct?.dimensions != null
    ) {
      tempProductSpecs.push({
        label: "Dimension",
        value: currentProduct?.dimensions,
      });
    }
    if (
      currentProduct?.inStock != undefined &&
      currentProduct?.inStock != null
    ) {
      tempProductSpecs.push({
        label: "Availability",
        value: currentProduct?.inStock ? "In stock" : "Out of stock",
      });
    }
    if (currentProduct?.color != undefined && currentProduct?.color != null) {
      tempProductSpecs.push({
        label: "Color",
        value: currentProduct?.color.name,
      });
    }
    if (
      currentProduct?.waterRequirement != undefined &&
      currentProduct?.waterRequirement != null
    ) {
      tempProductSpecs.push({
        label: "Watering Requirement",
        value: currentProduct?.waterRequirement,
      });
    }
    if (
      currentProduct?.sunlightRequirement != undefined &&
      currentProduct?.sunlightRequirement != null
    ) {
      tempProductSpecs.push({
        label: "Sunlight Requirements",
        value: currentProduct?.sunlightRequirement,
      });
    }
    if (currentProduct?.season != undefined && currentProduct?.season != null) {
      tempProductSpecs.push({ label: "Season", value: currentProduct?.season });
    }
    // if (
    //   currentProduct?.sizeRanges != undefined &&
    //   currentProduct?.sizeRanges != null
    // ) {
    //   tempProductSpecs.push({
    //     label: "Pot Size",
    //     value: currentProduct?.sizeRanges[0],
    //   });
    // }
    return tempProductSpecs;
  };

  const productSpecs: ProductSpec[] = getProductSpecs();

  const content: Record<string, React.ReactNode> = {
    description: (
      <div className="text-gray-900">
        {/* Display rich text content if available */}
        {currentProduct?.description && (
          <div className="mb-4">
            <HtmlContent content={currentProduct.description} />
          </div>
        )}
      </div>
    ),
    additional: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {productSpecs.map((spec, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span className="text-gray-600">{spec.label}</span>
              <span className="text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    // review: (
    //   <div className="space-y-8 text-gray-900">{/* Review content */}</div>
    // ),
    faq: (
      <div className="text-gray-900">
        {!loading &&
        !error &&
        currentProduct?.faqs &&
        currentProduct.faqs.length > 0 ? (
          <h3 className="font-bold mb-2">Frequently Asked Questions</h3>
        ) : null}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))
          ) : currentProduct?.faqs && currentProduct.faqs.length > 0 ? (
            // Render FAQs if available
            currentProduct.faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-semibold text-gray-900 mb-2">
                  Q: {faq.question}
                </p>
                <p className="text-gray-600">A: {faq.answer}</p>
              </div>
            ))
          ) : (
            // Show message if no FAQs available
            <div className="text-center py-8 text-gray-500">
              <p>No FAQs available for this product.</p>
            </div>
          )}
        </div>
      </div>
    ),
  };

  return !currentProduct || error ? (
    <></>
  ) : (
    <div className="w-full max-w-7xl mx-auto">
      <div>
        <nav className="flex justify-center -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {tabs.map((tab) => (
        <TabContent
          key={tab.id}
          content={content[tab.id]}
          isActive={activeTab === tab.id}
        />
      ))}
    </div>
  );
};

export default TabbedInterface;
