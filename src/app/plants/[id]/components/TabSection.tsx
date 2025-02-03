import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readonly?: boolean;
}

interface ReviewFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

interface TabContentProps {
  content: React.ReactNode;
  isActive: boolean;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

interface ProductSpec {
  label: string;
  value: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  readonly = false,
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && setRating && setRating(star)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"}`}
          type="button"
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating ? "fill-green-500 text-green-500" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const filters: string[] = [
    "All Reviews",
    "With Photo & Video",
    "With Description",
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded ${
            activeFilter === filter
              ? "bg-green-500 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const TabContent: React.FC<TabContentProps> = ({ content, isActive }) => {
  if (!isActive) return null;
  return (
    <div className="p-6 bg-white rounded-b-lg ">{content}</div>
  );
};

const TabbedInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("description");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewFilter, setReviewFilter] = useState<string>("All Reviews");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional Information" },
    { id: "review", label: "Review" },
    { id: "faq", label: "FAQ" },
  ] as const;

  const productSpecs: ProductSpec[] = [
    { label: "Weight", value: "85g" },
    { label: "Dimension", value: "3 x 13 cm" },
    { label: "Availability", value: "In stock" },
    { label: "Color", value: "Dark Green" },
    { label: "Watering Requirement", value: "Once a week" },
    { label: "Sunlight Requirements", value: "Bright Indirect Light" },
    { label: "Season", value: "All season Plants" },
    { label: "Pot Size", value: "Small" },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      author: "Darrell Steward",
      rating: 5,
      date: "July 2, 2020 03:29 PM",
      content: "This is amazing product I have.",
      likes: 128,
    },
    {
      id: 2,
      author: "Darlene Robertson",
      rating: 5,
      date: "July 2, 2020 1:04 PM",
      content: "This is amazing product I have.",
      likes: 82,
    },
  ];

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ reviewRating, reviewTitle, reviewContent });
    // Handle review submission here
  };

  const content: Record<string, React.ReactNode> = {
    description: (
      <div className="text-gray-900">
        <p className="mb-4">
          The Lucky Bamboo plant is the perfect gift for a houseplant. It's
          considered auspicious in Feng Shui and Vastu Shastra.
        </p>

        <h3 className="font-bold mb-2">SAPLING DESCRIPTION</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li>Number of saplings in a net pot - 3</li>
          <li>Number of saplings in a net pot - 3</li>
          <li>Sapling Height - 2 inches</li>
          <li>Watering - moderate watering</li>
          <li>Sunlight - moderate or indirect light</li>
        </ul>

        <h3 className="font-bold mb-2">PLANT DESCRIPTION</h3>
        <ul className="list-decimal pl-6 space-y-2">
          <li>Full Plant height - 100centimeters</li>
          <li>Type - Indoor</li>
          <li>
            Feed - vermicompost for nutrients every week, Seaweed once a month
            for greener leaves
          </li>
          <li>
            Watering - moderate watering according to the dryness of the soil
          </li>
          <li>Soil - Water or moist but well - drained soil</li>
        </ul>
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
    review: (
      <div className="space-y-8 text-gray-900">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold">4.5</div>
            <div>
              <StarRating rating={4.5} readonly />
              <div className="text-sm text-gray-500">from 1,25k reviews</div>
            </div>
          </div>

          <ReviewFilters
            activeFilter={reviewFilter}
            setActiveFilter={setReviewFilter}
          />

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <StarRating rating={review.rating} readonly />
                <p className="my-2">{review.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <span className="font-medium">{review.author}</span>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    <button type="button">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-bold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">What is it like Product?</label>
              <StarRating rating={reviewRating} setRating={setReviewRating} />
            </div>

            <div>
              <label className="block mb-2">Review Title</label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Great Products"
              />
            </div>

            <div>
              <label className="block mb-2">Review Content</label>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="w-full p-2 border rounded h-32"
                placeholder="Write your review here..."
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    ),
    faq: (
      <div className="text-gray-900">
        <h3 className="font-bold mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">
              Q: How often should I water my Lucky Bamboo?
            </p>
            <p>A: Water moderately when the top soil feels dry</p>
          </div>
          <div>
            <p className="font-semibold">Q: Can it survive in low light?</p>
            <p>
              A: Yes, Lucky Bamboo adapts well to moderate or indirect light
              conditions
            </p>
          </div>
        </div>
      </div>
    ),
  };

  return (
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
