
// src/components/profile/ProfileForm.tsx


import { ProfileFormProps } from "@/commons/types/profile";

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSubmit }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            gender: formData.get('gender') as 'male' | 'female' | 'other',
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            defaultValue={user.firstName}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-900  rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            defaultValue={user.lastName}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex gap-4">
                        {['Male', 'Female', 'Others'].map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={option.toLowerCase()}
                                    defaultChecked={user.gender === option.toLowerCase()}
                                    className="text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Save Changes
                </button>
            </div>
        </form>
    );
};