import { useEffect, useRef } from "react";
import {
    FaClock,
    FaMessage,
    FaPaperPlane,
    FaRobot,
    FaUtensils,
    FaWindowMinimize,
} from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router";
import { useChat } from "../context/ChatContext";

const ChatWindow = () => {
    const {
        messages,
        isLoading,
        openChat,
        userInput,
        setOpenChat,
        setUserInput,
        sendMessage,
    } = useChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (openChat) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [openChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {openChat ? (
                    <motion.div
                        className="w-[320px] md:w-[380px] rounded-lg shadow-xl border border-gray-200 bg-white overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="bg-primary-600 py-3 px-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1.5">
                                    <FaRobot className="text-white text-sm" />
                                </div>
                                <h3 className="font-medium text-white">
                                    Recipe Assistant
                                </h3>
                            </div>
                            <button
                                onClick={() => setOpenChat(false)}
                                className="text-white/80 hover:text-white transition-colors hover:cursor-pointer"
                            >
                                <FaWindowMinimize />
                            </button>
                        </div>

                        {/* Messages area */}
                        <div className="bg-gray-50 h-80 py-3 px-3 overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex mb-4 ${
                                        message.sender === "bot"
                                            ? "justify-start"
                                            : "justify-end"
                                    }`}
                                >
                                    {message.sender === "bot" && (
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center mr-2">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                    )}

                                    <div
                                        className={`rounded-xl px-4 py-2.5 max-w-[75%] shadow-sm ${
                                            message.sender === "bot"
                                                ? "bg-white border border-gray-100"
                                                : "bg-primary-500 text-white"
                                        }`}
                                    >
                                        <p className="text-sm">
                                            {message.text}
                                        </p>

                                        {message.hasRecipes &&
                                            message.recipes &&
                                            message.recipes.length > 0 && (
                                                <div className="mt-2 space-y-2">
                                                    {message.recipes
                                                        .slice(0, 3)
                                                        .map((recipe) => (
                                                            <NavLink
                                                                key={recipe._id}
                                                                to={`/recipe/${recipe._id}`}
                                                                className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                                            >
                                                                {/* Recipe card content */}
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                                                                        {recipe.image ? (
                                                                            <img
                                                                                src={
                                                                                    recipe.image
                                                                                }
                                                                                alt={
                                                                                    recipe.name
                                                                                }
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                                                                <FaUtensils className="text-gray-400" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-medium text-gray-800 text-sm truncate">
                                                                            {
                                                                                recipe.name
                                                                            }
                                                                        </h4>
                                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                            <FaClock className="text-[10px]" />
                                                                            <span>
                                                                                {recipe.cookTimeMinutes ||
                                                                                    0}{" "}
                                                                                mins
                                                                            </span>
                                                                            <span>
                                                                                •
                                                                            </span>
                                                                            <span>
                                                                                {recipe.difficulty ||
                                                                                    ""}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        ))}

                                                    {message.recipes.length >
                                                        3 && (
                                                        <div className="text-xs text-center text-primary-600 mt-1 pt-1 border-t border-gray-100">
                                                            <NavLink
                                                                to="/home"
                                                                className="hover:underline"
                                                            >
                                                                See{" "}
                                                                {message.recipes
                                                                    .length -
                                                                    3}{" "}
                                                                more results
                                                            </NavLink>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                    </div>

                                    {message.sender === "user" && (
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
                                            <span className="text-xs text-gray-500 font-medium">
                                                You
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center mr-2">
                                        <FaRobot className="text-white text-xs" />
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                                        <div className="flex space-x-1">
                                            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                                            <div
                                                className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.2s",
                                                }}
                                            ></div>
                                            <div
                                                className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.4s",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef}></div>
                        </div>

                        <div className="bg-white border-t border-gray-100 p-3">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage(userInput);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    value={userInput}
                                    onChange={(e) =>
                                        setUserInput(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Search for recipes..."
                                    className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className={`rounded-full p-2.5 ${
                                        userInput.trim() && !isLoading
                                            ? "bg-primary-500 hover:bg-primary-600 text-white"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    } transition-colors`}
                                    disabled={!userInput.trim() || isLoading}
                                >
                                    <FaPaperPlane className="text-sm" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => setOpenChat(true)}
                        className="p-4 rounded-full bg-primary-500 hover:bg-primary-600 shadow-lg flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <FaMessage className="text-white text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatWindow;
