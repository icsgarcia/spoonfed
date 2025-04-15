import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { Recipe } from "../types/recipeTypes";
import useMessageRecipes from "../hooks/useMessageRecipes";

interface Message {
    id: number;
    text: string;
    sender: string;
    hasRecipes?: boolean;
    recipes?: Recipe[];
}

interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    openChat: boolean;
    userInput: string;
    setOpenChat: Dispatch<SetStateAction<boolean>>;
    setUserInput: Dispatch<SetStateAction<string>>;
    sendMessage: (userInput: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [openChat, setOpenChat] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! Ask me about recipes or ingredients, and I'll find something delicious for you!",
            sender: "bot",
        },
    ]);
    const { data: messageRecipesData, isLoading } =
        useMessageRecipes(userInput);

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (error) {
                console.error(
                    "Error parsing chat messages from localStorage:",
                    error
                );
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const sendMessage = async (userInput: string) => {
        if (!userInput.trim() || isLoading) return;

        const newMessages = [
            ...messages,
            { id: messages.length + 1, text: userInput, sender: "user" },
        ];
        setMessages(newMessages);
        setUserInput("");

        try {
            let botMessage = "";
            if (!messageRecipesData || messageRecipesData.length === 0) {
                botMessage = `No recipes found matching "${userInput}". Try different keywords or phrases.`;
            } else {
                botMessage = `Found ${messageRecipesData.length} recipe${
                    messageRecipesData.length > 1 ? "s" : ""
                } matching "${userInput}"`;
            }

            const newBotMessage = [
                ...newMessages,
                {
                    id: messages.length + 2,
                    text: botMessage,
                    sender: "bot",
                    hasRecipes:
                        messageRecipesData && messageRecipesData.length > 0,
                    recipes: messageRecipesData,
                },
            ];
            setMessages(newBotMessage);
        } catch (error) {
            console.error(error);
            setMessages([
                ...newMessages,
                {
                    id: messages.length + 2,
                    text: "Sorry, I couldn't find any recipes at the moment. Please try again later.",
                    sender: "bot",
                },
            ]);
        }
    };

    const value = {
        messages,
        isLoading,
        openChat,
        userInput,
        setOpenChat,
        setUserInput,
        sendMessage,
    };
    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

export default ChatProvider;
