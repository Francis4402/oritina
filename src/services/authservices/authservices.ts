"use server"

import { ForgotPasswordType, registerType, ResetPasswordType } from "@/app/types/Types";

const baseUrl = process.env.BASE_URL;


export const register = async (data: registerType) => {
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.error || 'Registration failed',
                error: result.error || 'Registration failed'
            };
        }

        return {
            success: true,
            message: result.message || 'Registration successful',
            user: result.user
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error',
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
};

export const forgotPassword = async (data: ForgotPasswordType) => {
    try {
        const res = await fetch(`${baseUrl}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        if (!res.ok) {
            return {
                success: false,
                message: result.error || 'failed to send email',
                error: result.error || 'failed to send email'
            };
        }
  
        return {
            success: true,
            message: result.message || 'email send successfully',
            user: result.user
        };
            
    } catch (error) {
        console.error('error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error',
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
};

export const resetPassword = async (data: ResetPasswordType & { token: string }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        return {
          success: false,
          message: result.error || "Password reset failed",
        };
      }

      return {
        success: true,
        message: result.message || "Password reset successful",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    }
};