import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AddressSectionProps, IAddress } from "@/commons/types/profile";
import { ProfileService } from "@/services/api/profileService";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/userSlice";

export const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  user,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingAddress, setEditingAddress] = useState<{
    index: number;
    address: IAddress;
  } | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      const addressData: Partial<IAddress> = {
        addressLine: formData.get("addressLine") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        pinCode: formData.get("pinCode") as string,
      };

      let updatedAddresses;
      if (editingAddress !== null) {
        // Update existing address
        updatedAddresses = addresses.map((addr, index) =>
          index === editingAddress.index ? { ...addr, ...addressData } : addr
        );
      } else {
        // Add new address
        updatedAddresses = [...addresses, addressData];
      }

      const apiFormData = new FormData();
      apiFormData.append("address", JSON.stringify(updatedAddresses));

      const response = await ProfileService.updateProfile(
        user._id,
        apiFormData
      );
      dispatch(updateUser(response.user));

      setShowForm(false);
      setEditingAddress(null);
      formElement.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address: IAddress, index: number) => {
    setEditingAddress({ address, index });
    setShowForm(true);
  };

  const handleDelete = async (index: number) => {
    setIsLoading(true);
    setError("");

    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      const apiFormData = new FormData();
      apiFormData.append("address", JSON.stringify(updatedAddresses));

      const response = await ProfileService.updateProfile(
        user._id,
        apiFormData
      );
      dispatch(updateUser(response.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setError("");
  };

  if (showForm) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-md">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line
            </label>
            <textarea
              name="addressLine"
              required
              disabled={isLoading}
              defaultValue={editingAddress?.address.addressLine}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 min-h-[100px] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                disabled={isLoading}
                defaultValue={editingAddress?.address.city}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                required
                disabled={isLoading}
                defaultValue={editingAddress?.address.state}
                className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pin Code
            </label>
            <input
              type="text"
              name="pinCode"
              required
              disabled={isLoading}
              maxLength={6}
              defaultValue={editingAddress?.address.pinCode}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Saving..."
              : editingAddress
              ? "Update Address"
              : "Save Address"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 border border-gray-600 text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        className="w-full p-8 border-2 border-dashed border-gray-300 text-gray-900 rounded-lg flex items-center justify-center hover:text-green-600 hover:border-green-600"
      >
        <Plus className="mr-2" /> Add New Address
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="group relative p-4 border rounded-lg hover:border-gray-500 transition-colors"
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button
                onClick={() => handleEdit(address, index)}
                className="p-1 text-gray-600 hover:text-green-600 rounded-full bg-gray-200 hover:bg-green-50"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="p-1 text-gray-600 hover:text-red-600 rounded-full bg-gray-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600">{address.addressLine}</p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} {address.pinCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
