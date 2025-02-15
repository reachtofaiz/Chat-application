'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            const data = await response.json();

            if (data.success) {
                // Clear any stored tokens/user data from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to home page
                router.push('/');
            }
            return Response.json({
                success: true,
                message: "Logged out successfully"
            });
        } catch (error) {
            console.error('Logout failed:', error);
            return Response.json({
                success: false,
                message: "Logged out is failed"
            });
        }
    };
    return handleLogout;
}