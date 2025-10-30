export type ButtonType = {
    colorPalette?: string;
    variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain";
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    icon?: React.ElementType;
    value?: string;
};

export type User = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
};

export type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    role?: string;
};
export interface AlertType {
    status: "info" | "warning" | "success" | "error" | "neutral" | undefined;
    message: string;
}

export type ResetForm = {
    resetForm: () => void;
};
