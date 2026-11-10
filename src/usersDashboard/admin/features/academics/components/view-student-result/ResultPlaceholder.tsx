import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Search } from "lucide-react";

interface Props { state: "idle" | "loading" | "error"; message?: string }

const COPY = {
  idle: { title: "No results loaded yet", body: "Select a student, term, and session above then click Load Search Results" },
  loading: { title: "Loading result…", body: "Fetching the academic record" },
  error: { title: "Could not load this result", body: "" },
};

const ResultPlaceholder: React.FC<Props> = ({ state, message }) => {
  const Icon = state === "loading" ? Loader2 : state === "error" ? AlertTriangle : Search;
  const tone = state === "error" ? "bg-danger/10 text-danger" : "bg-blue-50 text-brand-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
    >
      <div className={`w-20 h-20 rounded-full flex-center mb-4 ${tone}`}>
        <Icon className={`w-9 h-9 ${state === "loading" ? "animate-spin" : ""}`} />
      </div>
      <h3 className="text-lg font-semibold text-text-nav mb-2">{COPY[state].title}</h3>
      <p className="text-sm text-text-muted max-w-md break-words">{message || COPY[state].body}</p>
    </motion.div>
  );
};

export default ResultPlaceholder;