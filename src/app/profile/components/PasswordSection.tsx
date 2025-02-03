// / src/components/profile/PasswordSection.tsx

import { useState } from 'react';
import { PasswordSectionProps, PasswordChangeData } from "@/commons/types/profile";

export const PasswordSection: React.FC<PasswordSectionProps> = ({ onPasswordChange }) => {
    const [formData, setFormData] = useState<PasswordChangeData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPasswordChange(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    return (
        <form onSubmit={handleSubmit} className="">
            <div className="space-y-6 bg-white ">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="text"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" >
                        Confirm New Password
                    </label>
                    <input
                        type="text"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Update Password
                </button>
            </div>
        </form>
    );
};