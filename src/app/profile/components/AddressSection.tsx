import { Plus } from "lucide-react";
import { AddressSectionProps, IAddress } from "@/commons/types/profile";
import { useState } from "react";

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  alternativeAddress?: string;
  alternativeContact?: string;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  onAddAddress,
  //   onUpdateAddress,
  //   onDeleteAddress,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    alternativeAddress: "",
    alternativeContact: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: IAddress = {
      type: "Home",
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      country: formData.country,
    };
    onAddAddress(newAddress);
    setShowForm(false);
    setFormData({
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      alternativeAddress: "",
      alternativeContact: "",
    });
  };

  if (showForm) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 min-h-[100px]"
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City/District/Town
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">-- Select State --</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                {/* Add more states as needed */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">-- Select Country --</option>
                <option value="India">India</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternative Address (Optional)
            </label>
            <input
              type="text"
              name="alternativeAddress"
              value={formData.alternativeAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternative Contact (Optional)
            </label>
            <input
              type="text"
              name="alternativeContact"
              value={formData.alternativeContact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-start">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Address
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-600 text-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowForm(true)}
        className="w-full p-8 border-2 border-dashed border-gray-300 text-gray-900 rounded-lg flex items-center justify-center  hover:text-green-600 hover:border-green-600"
      >
        <Plus className="mr-2" /> Add New Address
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div key={index} className="p-4 border rounded-lg relative">
            <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-sm rounded-bl">
              {address.type}
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">
              {address.type} Address
            </h3>
            <p className="text-sm text-gray-600">{address.street}</p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} {address.pinCode}
            </p>
            <p className="text-sm text-gray-600">{address.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
