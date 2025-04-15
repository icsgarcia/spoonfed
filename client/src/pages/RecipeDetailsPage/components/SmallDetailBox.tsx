interface SmallDetailBoxProps {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
}

const SmallDetailBox = ({ icon, title, content }: SmallDetailBoxProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-full">{icon}</div>
            <div>
                <div className="text-xs text-white/70">{title}</div>
                <div className="font-medium">{content}</div>
            </div>
        </div>
    );
};

export default SmallDetailBox;
