'use client';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-6 w-16 h-16 bg-lime-400 hover:bg-lime-500 text-zinc-950 rounded-full shadow-xl shadow-lime-300/40 dark:shadow-none flex items-center justify-center transition-all active:scale-95 z-40"
            aria-label="Add habit"
        >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    );
}
