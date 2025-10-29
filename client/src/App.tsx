import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import PageNotFound from "./pages/PageNotFound";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import SavedRecipePage from "./pages/SavedRecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import UpdateRecipePage from "./pages/UpdateRecipePage";
import ProfilePage from "./pages/ProfilePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import ChatProvider from "./context/ChatContext";
import RecipesPage from "./pages/RecipesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <ToastContainer />

            <BrowserRouter>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        <ChatProvider>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/signup"
                                    element={<SignupPage />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<ForgotPasswordPage />}
                                />
                                <Route
                                    path="/reset-password"
                                    element={<ResetPasswordPage />}
                                />
                                <Route
                                    path="/recipe/:id"
                                    element={<RecipeDetailsPage />}
                                />

                                <Route
                                    path="/profile/personal-info"
                                    element={
                                        <ProtectedRoute>
                                            <ProfilePage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/profile/account-settings"
                                    element={
                                        <ProtectedRoute>
                                            <AccountSettingsPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/home"
                                    element={
                                        <ProtectedRoute>
                                            <HomePage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/about"
                                    element={
                                        <ProtectedRoute>
                                            <AboutPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/recipes"
                                    element={
                                        <ProtectedRoute>
                                            <RecipesPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/saved-recipes"
                                    element={
                                        <ProtectedRoute>
                                            <SavedRecipePage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/my-recipes"
                                    element={
                                        <ProtectedRoute>
                                            <MyRecipesPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/recipe/:id/edit"
                                    element={
                                        <ProtectedRoute>
                                            <UpdateRecipePage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/create-recipe"
                                    element={
                                        <ProtectedRoute>
                                            <CreateRecipePage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </ChatProvider>
                    </QueryClientProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
